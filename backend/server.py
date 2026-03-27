from fastapi import FastAPI, APIRouter, HTTPException, Query
from fastapi.responses import HTMLResponse
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


# Content Management Models
class ContentUpdate(BaseModel):
    section: str  # 'about', 'stats', 'achievements', 'education', 'gurus', 'services'
    language: str  # 'en' or 'ml'
    data: dict  # The actual content data

class PortfolioContent(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    section: str
    language: str
    data: dict
    updatedAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ============== Utility Functions ==============

def generate_artist_whatsapp_message(booking: Booking, base_url: str) -> str:
    """Generate WhatsApp message to send to artist with action links"""
    accept_link = f"{base_url}/api/bookings/{booking.id}/quick-accept"
    decline_link = f"{base_url}/api/bookings/{booking.id}/quick-decline"
    
    message = f"""🎵 New Performance Booking Request!

Name: {booking.name}
Phone: {booking.phone}
Email: {booking.email}
Event Type: {booking.eventType}
Date: {booking.eventDate}
Location: {booking.location}
Duration: {booking.duration or 'Not specified'}
Message: {booking.message or 'None'}

━━━━━━━━━━━━━━━━━━━━
QUICK ACTIONS:
✅ Accept: {accept_link}
❌ Decline: {decline_link}

Or visit dashboard to manage."""
    
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
        
        # Get base URL from environment or use default
        base_url = os.environ.get('BACKEND_URL', 'http://localhost:8001')
        
        # Generate WhatsApp link for artist with action links
        whatsapp_link = generate_artist_whatsapp_message(booking, base_url)
        
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


@api_router.get("/bookings/{booking_id}/quick-accept", response_class=HTMLResponse)
async def quick_accept_booking(booking_id: str):
    """Quick accept booking from WhatsApp link (no password required)"""
    try:
        # Find the booking
        booking = await db.bookings.find_one({"id": booking_id})
        
        if not booking:
            return HTMLResponse(content=f"""
                <html>
                    <head>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                            body {{ font-family: Arial; text-align: center; padding: 50px; background: #0a0a0a; color: white; }}
                            .error {{ color: #ff6b6b; font-size: 20px; }}
                        </style>
                    </head>
                    <body>
                        <div class="error">❌ Booking not found</div>
                    </body>
                </html>
            """, status_code=404)
        
        # Check if already processed
        if booking.get('status') != 'pending':
            return HTMLResponse(content=f"""
                <html>
                    <head>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                            body {{ font-family: Arial; text-align: center; padding: 50px; background: #0a0a0a; color: white; }}
                            .info {{ color: #ffd700; font-size: 20px; }}
                        </style>
                    </head>
                    <body>
                        <div class="info">ℹ️ Booking already {booking.get('status')}</div>
                    </body>
                </html>
            """)
        
        # Update status to accepted
        update_result = await db.bookings.update_one(
            {"id": booking_id},
            {
                "$set": {
                    "status": "accepted",
                    "updatedAt": datetime.now(timezone.utc).isoformat()
                }
            }
        )
        
        if update_result.modified_count == 0:
            return HTMLResponse(content=f"""
                <html>
                    <head>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                            body {{ font-family: Arial; text-align: center; padding: 50px; background: #0a0a0a; color: white; }}
                            .error {{ color: #ff6b6b; font-size: 20px; }}
                        </style>
                    </head>
                    <body>
                        <div class="error">❌ Failed to update booking</div>
                    </body>
                </html>
            """, status_code=500)
        
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
            "status": "accepted"
        })
        
        # Generate WhatsApp link for booker
        whatsapp_link = generate_booker_whatsapp_message(booking_obj, "accepted")
        
        # Return HTML that auto-opens WhatsApp
        return HTMLResponse(content=f"""
            <html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body {{ 
                            font-family: Arial; 
                            text-align: center; 
                            padding: 50px; 
                            background: linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 100%);
                            color: white; 
                        }}
                        .success {{ 
                            color: #4CAF50; 
                            font-size: 24px; 
                            margin-bottom: 20px;
                            animation: fadeIn 0.5s;
                        }}
                        .info {{ 
                            color: #d4af37; 
                            font-size: 16px; 
                            margin: 20px 0;
                        }}
                        .button {{ 
                            display: inline-block;
                            padding: 15px 30px;
                            background: linear-gradient(135deg, #800020, #9b2335);
                            color: white;
                            text-decoration: none;
                            border-radius: 5px;
                            margin-top: 20px;
                            font-size: 16px;
                        }}
                        @keyframes fadeIn {{
                            from {{ opacity: 0; transform: translateY(-20px); }}
                            to {{ opacity: 1; transform: translateY(0); }}
                        }}
                    </style>
                    <script>
                        setTimeout(function() {{
                            window.location.href = '{whatsapp_link}';
                        }}, 2000);
                    </script>
                </head>
                <body>
                    <div class="success">✅ Booking Accepted Successfully!</div>
                    <div class="info">Opening WhatsApp to notify the customer...</div>
                    <div class="info">Booking for: {booking['name']}</div>
                    <div class="info">Event: {booking['eventType']} on {booking['eventDate']}</div>
                    <a href="{whatsapp_link}" class="button">Click here if WhatsApp doesn't open</a>
                </body>
            </html>
        """)
    
    except Exception as e:
        logging.error(f"Error in quick accept: {str(e)}")
        return HTMLResponse(content=f"""
            <html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body {{ font-family: Arial; text-align: center; padding: 50px; background: #0a0a0a; color: white; }}
                        .error {{ color: #ff6b6b; font-size: 20px; }}
                    </style>
                </head>
                <body>
                    <div class="error">❌ Error: {str(e)}</div>
                </body>
            </html>
        """, status_code=500)


@api_router.get("/bookings/{booking_id}/quick-decline", response_class=HTMLResponse)
async def quick_decline_booking(booking_id: str):
    """Quick decline booking from WhatsApp link (no password required)"""
    try:
        # Find the booking
        booking = await db.bookings.find_one({"id": booking_id})
        
        if not booking:
            return HTMLResponse(content=f"""
                <html>
                    <head>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                            body {{ font-family: Arial; text-align: center; padding: 50px; background: #0a0a0a; color: white; }}
                            .error {{ color: #ff6b6b; font-size: 20px; }}
                        </style>
                    </head>
                    <body>
                        <div class="error">❌ Booking not found</div>
                    </body>
                </html>
            """, status_code=404)
        
        # Check if already processed
        if booking.get('status') != 'pending':
            return HTMLResponse(content=f"""
                <html>
                    <head>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                            body {{ font-family: Arial; text-align: center; padding: 50px; background: #0a0a0a; color: white; }}
                            .info {{ color: #ffd700; font-size: 20px; }}
                        </style>
                    </head>
                    <body>
                        <div class="info">ℹ️ Booking already {booking.get('status')}</div>
                    </body>
                </html>
            """)
        
        # Update status to declined
        update_result = await db.bookings.update_one(
            {"id": booking_id},
            {
                "$set": {
                    "status": "declined",
                    "updatedAt": datetime.now(timezone.utc).isoformat()
                }
            }
        )
        
        if update_result.modified_count == 0:
            return HTMLResponse(content=f"""
                <html>
                    <head>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                            body {{ font-family: Arial; text-align: center; padding: 50px; background: #0a0a0a; color: white; }}
                            .error {{ color: #ff6b6b; font-size: 20px; }}
                        </style>
                    </head>
                    <body>
                        <div class="error">❌ Failed to update booking</div>
                    </body>
                </html>
            """, status_code=500)
        
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
            "status": "declined"
        })
        
        # Generate WhatsApp link for booker
        whatsapp_link = generate_booker_whatsapp_message(booking_obj, "declined")
        
        # Return HTML that auto-opens WhatsApp
        return HTMLResponse(content=f"""
            <html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body {{ 
                            font-family: Arial; 
                            text-align: center; 
                            padding: 50px; 
                            background: linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 100%);
                            color: white; 
                        }}
                        .warning {{ 
                            color: #ff6b6b; 
                            font-size: 24px; 
                            margin-bottom: 20px;
                            animation: fadeIn 0.5s;
                        }}
                        .info {{ 
                            color: #d4af37; 
                            font-size: 16px; 
                            margin: 20px 0;
                        }}
                        .button {{ 
                            display: inline-block;
                            padding: 15px 30px;
                            background: linear-gradient(135deg, #800020, #9b2335);
                            color: white;
                            text-decoration: none;
                            border-radius: 5px;
                            margin-top: 20px;
                            font-size: 16px;
                        }}
                        @keyframes fadeIn {{
                            from {{ opacity: 0; transform: translateY(-20px); }}
                            to {{ opacity: 1; transform: translateY(0); }}
                        }}
                    </style>
                    <script>
                        setTimeout(function() {{
                            window.location.href = '{whatsapp_link}';
                        }}, 2000);
                    </script>
                </head>
                <body>
                    <div class="warning">❌ Booking Declined</div>
                    <div class="info">Opening WhatsApp to notify the customer...</div>
                    <div class="info">Booking for: {booking['name']}</div>
                    <div class="info">Event: {booking['eventType']} on {booking['eventDate']}</div>
                    <a href="{whatsapp_link}" class="button">Click here if WhatsApp doesn't open</a>
                </body>
            </html>
        """)
    
    except Exception as e:
        logging.error(f"Error in quick decline: {str(e)}")
        return HTMLResponse(content=f"""
            <html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body {{ font-family: Arial; text-align: center; padding: 50px; background: #0a0a0a; color: white; }}
                        .error {{ color: #ff6b6b; font-size: 20px; }}
                    </style>
                </head>
                <body>
                    <div class="error">❌ Error: {str(e)}</div>
                </body>
            </html>
        """, status_code=500)


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


# ============== Content Management Routes ==============

@api_router.get("/content")
async def get_content():
    """Get all portfolio content organized by section and language"""
    try:
        content_items = await db.portfolio_content.find({}, {"_id": 0}).to_list(1000)
        
        # Organize content by section and language
        organized_content = {}
        for item in content_items:
            section = item.get("section")
            language = item.get("language")
            
            if section not in organized_content:
                organized_content[section] = {}
            
            organized_content[section][language] = item.get("data")
        
        return {"content": organized_content}
    except Exception as e:
        logging.error(f"Error fetching content: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.put("/content")
async def update_content(content_update: ContentUpdate, admin_password: str = Query(...)):
    """Update portfolio content (admin only)"""
    if not verify_admin_password(admin_password):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    try:
        # Check if content exists for this section and language
        existing = await db.portfolio_content.find_one({
            "section": content_update.section,
            "language": content_update.language
        }, {"_id": 0})
        
        content_obj = PortfolioContent(
            section=content_update.section,
            language=content_update.language,
            data=content_update.data
        )
        
        if existing:
            # Update existing content
            await db.portfolio_content.update_one(
                {
                    "section": content_update.section,
                    "language": content_update.language
                },
                {"$set": content_obj.model_dump()}
            )
        else:
            # Insert new content
            await db.portfolio_content.insert_one(content_obj.model_dump())
        
        return {"message": "Content updated successfully", "content": content_obj.model_dump()}
    except Exception as e:
        logging.error(f"Error updating content: {str(e)}")
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
