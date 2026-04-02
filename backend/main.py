from fastapi import FastAPI, APIRouter, HTTPException, Query, File, UploadFile
from fastapi.responses import HTMLResponse
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from typing import List, Optional
from datetime import datetime, timezone
from urllib.parse import quote
import hashlib

# Import models from models package
from models.status import StatusCheck, StatusCheckCreate
from models.booking import Booking, BookingCreate, BookingStatusUpdate
from models.content import ContentUpdate, PortfolioContent
from models.media import AudioTrack, AudioTrackCreate, Video, VideoCreate, GalleryImage, GalleryImageCreate, Testimonial, TestimonialCreate
from models.admin import AdminLogin, SiteSettings, SiteSettingsUpdate

# Import database
from database import db, close_db_connection

# Get admin credentials from environment
from dotenv import load_dotenv
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'admin123')
ARTIST_WHATSAPP = os.environ.get('ARTIST_WHATSAPP', '+919876543210')

# redeploy fix
# ============== FastAPI App Setup ==============

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")



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

@api_router.get("/health")
async def health_check():
    """Health check endpoint for Railway/monitoring services"""
    try:
        # Test database connection
        await db.command('ping')
        db_status = "connected"
    except Exception:
        db_status = "disconnected"
    
    return {
        "status": "healthy",
        "service": "Vaidehi Suresh Portfolio API",
        "database": db_status
    }

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
            return HTMLResponse(content="""
                <html>
                    <head>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                            body { font-family: Arial; text-align: center; padding: 50px; background: #0a0a0a; color: white; }
                            .error { color: #ff6b6b; font-size: 20px; }
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
            return HTMLResponse(content="""
                <html>
                    <head>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                            body { font-family: Arial; text-align: center; padding: 50px; background: #0a0a0a; color: white; }
                            .error { color: #ff6b6b; font-size: 20px; }
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
            return HTMLResponse(content="""
                <html>
                    <head>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                            body { font-family: Arial; text-align: center; padding: 50px; background: #0a0a0a; color: white; }
                            .error { color: #ff6b6b; font-size: 20px; }
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
            return HTMLResponse(content="""
                <html>
                    <head>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                            body { font-family: Arial; text-align: center; padding: 50px; background: #0a0a0a; color: white; }
                            .error { color: #ff6b6b; font-size: 20px; }
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

@api_router.get("/gallery")
async def get_gallery():
    """Get all gallery items"""
    try:
        gallery_items = await db.gallery.find({}, {"_id": 0}).to_list(1000)
        return {"gallery": gallery_items}
    except Exception as e:
        logging.error(f"Error fetching gallery: {str(e)}")
        return {"gallery": []}


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


# ============== Media & Gallery Routes ==============

@api_router.get("/audio-tracks")
async def get_audio_tracks():
    """Get all active audio tracks"""
    try:
        tracks = await db.audio_tracks.find({"isActive": True}, {"_id": 0}).sort("order", 1).to_list(100)
        return {"tracks": tracks}
    except Exception as e:
        logging.error(f"Error fetching audio tracks: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.get("/admin/audio-tracks")
async def get_all_audio_tracks_admin():
    """Get all audio tracks for admin (including inactive)"""
    try:
        tracks = await db.audio_tracks.find({}, {"_id": 0}).sort("order", 1).to_list(100)
        return {"tracks": tracks}
    except Exception as e:
        logging.error(f"Error fetching audio tracks: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.put("/admin/audio-tracks/{track_id}")
async def update_audio_track(track_id: str, track_data: dict):
    """Update an audio track"""
    try:
        result = await db.audio_tracks.update_one(
            {"id": track_id},
            {"$set": track_data}
        )
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Track not found")
        return {"success": True}
    except Exception as e:
        logging.error(f"Error updating audio track: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.post("/admin/audio-tracks")
async def create_audio_track(track_data: dict):
    """Create a new audio track"""
    try:
        if "id" not in track_data:
            track_data["id"] = str(uuid.uuid4())
        await db.audio_tracks.insert_one(track_data)
        return {"success": True, "id": track_data["id"]}
    except Exception as e:
        logging.error(f"Error creating audio track: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.delete("/admin/audio-tracks/{track_id}")
async def delete_audio_track(track_id: str):
    """Delete an audio track"""
    try:
        result = await db.audio_tracks.delete_one({"id": track_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Track not found")
        return {"success": True}
    except Exception as e:
        logging.error(f"Error deleting audio track: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.get("/video-performances")
async def get_video_performances():
    """Get all active video performances"""
    try:
        videos = await db.video_performances.find({"isActive": True}, {"_id": 0}).sort("order", 1).to_list(100)
        return {"videos": videos}
    except Exception as e:
        logging.error(f"Error fetching videos: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.get("/admin/video-performances")
async def get_all_videos_admin():
    """Get all videos for admin (including inactive)"""
    try:
        videos = await db.video_performances.find({}, {"_id": 0}).sort("order", 1).to_list(100)
        return {"videos": videos}
    except Exception as e:
        logging.error(f"Error fetching videos: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.put("/admin/video-performances/{video_id}")
async def update_video(video_id: str, video_data: dict):
    """Update a video"""
    try:
        result = await db.video_performances.update_one(
            {"id": video_id},
            {"$set": video_data}
        )
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Video not found")
        return {"success": True}
    except Exception as e:
        logging.error(f"Error updating video: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.post("/admin/video-performances")
async def create_video(video_data: dict):
    """Create a new video"""
    try:
        if "id" not in video_data:
            video_data["id"] = str(uuid.uuid4())
        await db.video_performances.insert_one(video_data)
        return {"success": True, "id": video_data["id"]}
    except Exception as e:
        logging.error(f"Error creating video: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.delete("/admin/video-performances/{video_id}")
async def delete_video(video_id: str):
    """Delete a video"""
    try:
        result = await db.video_performances.delete_one({"id": video_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Video not found")
        return {"success": True}
    except Exception as e:
        logging.error(f"Error deleting video: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.get("/testimonials")
async def get_testimonials():
    """Get all active testimonials"""
    try:
        testimonials = await db.testimonials.find({"isActive": True}, {"_id": 0}).sort("order", 1).to_list(100)
        return {"testimonials": testimonials}
    except Exception as e:
        logging.error(f"Error fetching testimonials: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.get("/admin/testimonials")
async def get_all_testimonials_admin():
    """Get all testimonials for admin (including inactive)"""
    try:
        testimonials = await db.testimonials.find({}, {"_id": 0}).sort("order", 1).to_list(100)
        return {"testimonials": testimonials}
    except Exception as e:
        logging.error(f"Error fetching testimonials: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.put("/admin/testimonials/{testimonial_id}")
async def update_testimonial(testimonial_id: str, testimonial_data: dict):
    """Update a testimonial"""
    try:
        result = await db.testimonials.update_one(
            {"id": testimonial_id},
            {"$set": testimonial_data}
        )
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Testimonial not found")
        return {"success": True}
    except Exception as e:
        logging.error(f"Error updating testimonial: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.post("/admin/testimonials")
async def create_testimonial(testimonial_data: dict):
    """Create a new testimonial"""
    try:
        if "id" not in testimonial_data:
            testimonial_data["id"] = str(uuid.uuid4())
        await db.testimonials.insert_one(testimonial_data)
        return {"success": True, "id": testimonial_data["id"]}
    except Exception as e:
        logging.error(f"Error creating testimonial: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.delete("/admin/testimonials/{testimonial_id}")
async def delete_testimonial(testimonial_id: str):
    """Delete a testimonial"""
    try:
        result = await db.testimonials.delete_one({"id": testimonial_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Testimonial not found")
        return {"success": True}
    except Exception as e:
        logging.error(f"Error deleting testimonial: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.get("/admin/gallery")
async def get_all_gallery_admin():
    """Get all gallery items for admin"""
    try:
        gallery = await db.gallery.find({}, {"_id": 0}).to_list(100)
        return {"gallery": gallery}
    except Exception as e:
        logging.error(f"Error fetching gallery: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.put("/admin/gallery/{item_id}")
async def update_gallery_item(item_id: str, item_data: dict):
    """Update a gallery item"""
    try:
        result = await db.gallery.update_one(
            {"id": item_id},
            {"$set": item_data}
        )
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Gallery item not found")
        return {"success": True}
    except Exception as e:
        logging.error(f"Error updating gallery item: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.post("/admin/gallery")
async def create_gallery_item(item_data: dict):
    """Create a new gallery item"""
    try:
        if "id" not in item_data:
            item_data["id"] = str(uuid.uuid4())
        await db.gallery.insert_one(item_data)
        return {"success": True, "id": item_data["id"]}
    except Exception as e:
        logging.error(f"Error creating gallery item: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.delete("/admin/gallery/{item_id}")
async def delete_gallery_item(item_id: str):
    """Delete a gallery item"""
    try:
        result = await db.gallery.delete_one({"id": item_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Gallery item not found")
        return {"success": True}
    except Exception as e:
        logging.error(f"Error deleting gallery item: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.get("/artist-info")
async def get_artist_info():
    """Get artist basic information"""
    try:
        # Return basic artist info
        artist_info = {
            "name": "Vaidehi Suresh",
            "tagline": "Preserving the Sacred Melodies of Kerala Temples",
            "description": "A dedicated practitioner of Sopana Sangeetham, carrying forward the ancient tradition of temple music with devotion and artistry.",
            "yearsOfExperience": 15,
            "templesPerformed": 750,
            "contactInfo": {
                "whatsapp": "919446909402",
                "email": "vaidehisureshikm@gmail.com",
                "location": "Iranikkulam, Thrissur, Kerala"
            }
        }
        return {"artistInfo": artist_info}
    except Exception as e:
        logging.error(f"Error fetching artist info: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# ============== Site Settings Routes ==============

@api_router.get("/site-settings")
async def get_site_settings():
    """Get all site settings"""
    try:
        settings = await db.site_settings.find_one({"id": "main_settings"}, {"_id": 0})
        if not settings:
            settings = {
                "id": "main_settings",
                "backgroundMusic": {
                    "enabled": True,
                    "audioUrl": "/audio/idakka-intro.mp3",
                    "duration": 30
                }
            }
        return {"settings": settings}
    except Exception as e:
        logging.error(f"Error fetching site settings: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.put("/admin/site-settings")
async def update_site_settings(settings_data: dict):
    """Update site settings"""
    try:
        await db.site_settings.update_one(
            {"id": "main_settings"},
            {"$set": settings_data},
            upsert=True
        )
        return {"success": True}
    except Exception as e:
        logging.error(f"Error updating site settings: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.post("/admin/upload-audio")
async def upload_audio_file(file: UploadFile = File(...)):
    """Upload audio file for background music"""
    try:
        upload_dir = "/app/frontend/public/audio"
        os.makedirs(upload_dir, exist_ok=True)
        
        file_path = os.path.join(upload_dir, file.filename)
        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        public_url = f"/audio/{file.filename}"
        
        await db.site_settings.update_one(
            {"id": "main_settings"},
            {"$set": {"backgroundMusic.audioUrl": public_url}},
            upsert=True
        )
        
        return {"success": True, "url": public_url}
    except Exception as e:
        logging.error(f"Error uploading audio: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# Include the router in the main app
app.include_router(api_router)

# CORS Configuration - supports both development and production
CORS_ORIGINS = os.environ.get('CORS_ORIGINS', '*')
if CORS_ORIGINS == '*':
    # Development mode - allow all origins
    allowed_origins = ["*"]
else:
    # Production mode - specific origins
    allowed_origins = [origin.strip() for origin in CORS_ORIGINS.split(',')]

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=allowed_origins,
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
    await close_db_connection()
