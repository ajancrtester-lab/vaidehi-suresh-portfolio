from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from urllib.parse import quote
import hashlib


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Get admin credentials from environment
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'admin123')
ARTIST_WHATSAPP = os.environ.get('ARTIST_WHATSAPP', '+919876543210')


# ============== Models ==============

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


# Booking Models
class BookingCreate(BaseModel):
    name: str
    phone: str
    email: EmailStr
    eventType: str
    eventDate: str
    location: str
    duration: Optional[str] = None
    message: Optional[str] = None

class Booking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: str
    eventType: str
    eventDate: str
    location: str
    duration: Optional[str] = None
    message: Optional[str] = None
    status: str = "pending"
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updatedAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class BookingStatusUpdate(BaseModel):
    status: str
    adminPassword: str

class AdminLogin(BaseModel):
    password: str


# ============== Utility Functions ==============

def generate_artist_whatsapp_message(booking: Booking) -> str:
    """Generate WhatsApp message to send to artist"""
    message = f"""🎵 New Performance Booking Request!

Name: {booking.name}
Phone: {booking.phone}
Email: {booking.email}
Event Type: {booking.eventType}
Date: {booking.eventDate}
Location: {booking.location}
Duration: {booking.duration or 'Not specified'}
Message: {booking.message or 'None'}

To manage this booking, visit your dashboard."""
    
    return f"https://wa.me/{ARTIST_WHATSAPP}?text={quote(message)}"

def generate_booker_whatsapp_message(booking: Booking, status: str) -> str:
    """Generate WhatsApp message to send to booker"""
    if status == "accepted":
        message = f"""✅ Booking Confirmed!

Dear {booking.name},

Your booking request for {booking.eventType} on {booking.eventDate} at {booking.location} has been ACCEPTED by Vaidehi Suresh.

We look forward to performing at your event!

- Vaidehi Suresh Team"""
    else:
        message = f"""❌ Booking Update

Dear {booking.name},

Unfortunately, we are unable to confirm your booking request for {booking.eventType} on {booking.eventDate}.

Please contact us to discuss alternative dates.

- Vaidehi Suresh Team"""
    
    return f"https://wa.me/{booking.phone}?text={quote(message)}"

def verify_admin_password(password: str) -> bool:
    """Verify admin password"""
    return password == ADMIN_PASSWORD


# ============== Routes ==============

@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    status_doc = status_obj.model_dump()
    status_doc['timestamp'] = status_doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(status_doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**{**check, 'id': check.get('id', str(check['_id']))}) for check in status_checks]


# ============== Booking Routes ==============

@api_router.post("/bookings")
async def create_booking(booking_data: BookingCreate):
    """Create a new booking request"""
    try:
        # Create booking object
        booking = Booking(**booking_data.model_dump())
        
        # Prepare document for MongoDB
        booking_doc = booking.model_dump()
        booking_doc['createdAt'] = booking_doc['createdAt'].isoformat()
        booking_doc['updatedAt'] = booking_doc['updatedAt'].isoformat()
        
        # Insert into database
        result = await db.bookings.insert_one(booking_doc)
        
        if not result.inserted_id:
            raise HTTPException(status_code=500, detail="Failed to create booking")
        
        # Generate WhatsApp link for artist
        whatsapp_link = generate_artist_whatsapp_message(booking)
        
        return {
            "success": True,
            "bookingId": booking.id,
            "whatsappLink": whatsapp_link
        }
    
    except Exception as e:
        logging.error(f"Error creating booking: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.get("/bookings")
async def get_bookings(
    month: Optional[int] = Query(None, ge=1, le=12),
    year: Optional[int] = Query(None, ge=2020, le=2100)
):
    """Get all bookings with optional month/year filter"""
    try:
        query = {}
        
        # If month and year are provided, filter by event date
        if month is not None and year is not None:
            # Create date range for the month
            # Note: This is a simple string comparison, works for YYYY-MM-DD format
            start_date = f"{year}-{month:02d}-01"
            # Calculate end date (last day of month)
            if month == 12:
                end_date = f"{year + 1}-01-01"
            else:
                end_date = f"{year}-{month + 1:02d}-01"
            
            query["eventDate"] = {"$gte": start_date, "$lt": end_date}
        
        # Fetch bookings
        bookings_cursor = db.bookings.find(query).sort("createdAt", -1)
        bookings = await bookings_cursor.to_list(length=1000)
        
        # Convert to response format
        bookings_list = []
        for booking in bookings:
            booking_dict = {
                "id": booking.get('id', str(booking['_id'])),
                "name": booking['name'],
                "phone": booking['phone'],
                "email": booking['email'],
                "eventType": booking['eventType'],
                "eventDate": booking['eventDate'],
                "location": booking['location'],
                "duration": booking.get('duration'),
                "message": booking.get('message'),
                "status": booking.get('status', 'pending'),
                "createdAt": booking.get('createdAt')
            }
            bookings_list.append(booking_dict)
        
        return {"bookings": bookings_list}
    
    except Exception as e:
        logging.error(f"Error fetching bookings: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.put("/bookings/{booking_id}/status")
async def update_booking_status(booking_id: str, status_update: BookingStatusUpdate):
    """Update booking status (accept/decline)"""
    try:
        # Verify admin password
        if not verify_admin_password(status_update.adminPassword):
            raise HTTPException(status_code=401, detail="Invalid admin password")
        
        # Validate status
        if status_update.status not in ["accepted", "declined"]:
            raise HTTPException(status_code=400, detail="Invalid status. Must be 'accepted' or 'declined'")
        
        # Find the booking
        booking = await db.bookings.find_one({"id": booking_id})
        
        if not booking:
            raise HTTPException(status_code=404, detail="Booking not found")
        
        # Update status
        update_result = await db.bookings.update_one(
            {"id": booking_id},
            {
                "$set": {
                    "status": status_update.status,
                    "updatedAt": datetime.now(timezone.utc).isoformat()
                }
            }
        )
        
        if update_result.modified_count == 0:
            raise HTTPException(status_code=500, detail="Failed to update booking status")
        
        # Create Booking object for WhatsApp message generation
        booking_obj = Booking(**{
            "id": booking['id'],
            "name": booking['name'],
            "phone": booking['phone'],
            "email": booking['email'],
            "eventType": booking['eventType'],
            "eventDate": booking['eventDate'],
            "location": booking['location'],
            "duration": booking.get('duration'),
            "message": booking.get('message'),
            "status": status_update.status
        })
        
        # Generate WhatsApp link for booker
        whatsapp_link = generate_booker_whatsapp_message(booking_obj, status_update.status)
        
        return {
            "success": True,
            "whatsappLink": whatsapp_link
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error updating booking status: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.post("/admin/login")
async def admin_login(login_data: AdminLogin):
    """Simple admin login"""
    try:
        if verify_admin_password(login_data.password):
            # Generate a simple token (just a hash of password + timestamp for demo)
            token = hashlib.sha256(
                f"{login_data.password}{datetime.now().isoformat()}".encode()
            ).hexdigest()
            
            return {
                "success": True,
                "token": token
            }
        else:
            raise HTTPException(status_code=401, detail="Invalid password")
    
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error during admin login: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# ============== Gallery Routes (Optional) ==============

class GalleryItem(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    thumbnail: str
    linkType: str
    externalLink: str
    title: str
    caption: str

@api_router.get("/gallery")
async def get_gallery():
    """Get all gallery items"""
    try:
        gallery_items = await db.gallery.find().to_list(1000)
        return {"gallery": [GalleryItem(**item).model_dump() for item in gallery_items]}
    except Exception as e:
        logging.error(f"Error fetching gallery: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
