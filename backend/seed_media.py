"""
Seed script to populate media collections from mock data
Run this once to initialize the database with media data
"""

import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.environ.get('MONGO_URL')
DB_NAME = os.environ.get('DB_NAME', 'vaidehi_portfolio')

async def seed_database():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    print("🌱 Starting database seeding...")
    
    # Audio Tracks
    audio_tracks = [
        {
            "id": "audio-1",
            "title": "Harivarasanam",
            "raga": "Madhyamavati",
            "duration": "5:23",
            "temple": "Traditional",
            "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            "order": 1,
            "isActive": True
        },
        {
            "id": "audio-2",
            "title": "Devadideva",
            "raga": "Panchama Varnam",
            "duration": "4:45",
            "temple": "Guruvayur Temple",
            "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
            "order": 2,
            "isActive": True
        },
        {
            "id": "audio-3",
            "title": "Narayana Ninna",
            "raga": "Mohana",
            "duration": "6:12",
            "temple": "Traditional",
            "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
            "order": 3,
            "isActive": True
        },
        {
            "id": "audio-4",
            "title": "Kandan Karunai",
            "raga": "Saveri",
            "duration": "5:50",
            "temple": "Chettikulangara Devi Temple",
            "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
            "order": 4,
            "isActive": True
        },
        {
            "id": "audio-5",
            "title": "Ambike Devi",
            "raga": "Bhairavi",
            "duration": "7:15",
            "temple": "Chottanikkara Temple",
            "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
            "order": 5,
            "isActive": True
        }
    ]
    
    # Delete existing and insert new
    await db.audio_tracks.delete_many({})
    await db.audio_tracks.insert_many(audio_tracks)
    print(f"✅ Seeded {len(audio_tracks)} audio tracks")
    
    # Video Performances
    video_performances = [
        {
            "id": "video-1",
            "title": "Guruvayur Temple Festival",
            "venue": "Guruvayur Sri Krishna Temple",
            "date": "March 2024",
            "thumbnail": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=450&fit=crop",
            "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
            "order": 1,
            "isActive": True
        },
        {
            "id": "video-2",
            "title": "Thrissur Pooram Special Performance",
            "venue": "Vadakkunnathan Temple",
            "date": "April 2024",
            "thumbnail": "https://images.unsplash.com/photo-1528991435120-e73e05a58897?w=800&h=450&fit=crop",
            "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
            "order": 2,
            "isActive": True
        },
        {
            "id": "video-3",
            "title": "Onam Special Recital",
            "venue": "Traditional",
            "date": "September 2023",
            "thumbnail": "https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?w=800&h=450&fit=crop",
            "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
            "order": 3,
            "isActive": True
        },
        {
            "id": "video-4",
            "title": "Annual Temple Festival",
            "venue": "Kerala Temple",
            "date": "January 2024",
            "thumbnail": "https://images.unsplash.com/photo-1604608672516-f1b9b1a0b0f0?w=800&h=450&fit=crop",
            "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
            "order": 4,
            "isActive": True
        }
    ]
    
    await db.video_performances.delete_many({})
    await db.video_performances.insert_many(video_performances)
    print(f"✅ Seeded {len(video_performances)} video performances")
    
    # Testimonials
    testimonials = [
        {
            "id": "testimonial-1",
            "name": "Sreedharan Namboothiri",
            "role": "Temple Administrator",
            "temple": "Guruvayur Temple",
            "quote": "Vaidehi's rendition of Sopana Sangeetham brings the divine presence alive in our temple. Her deep understanding of the ragas and their spiritual significance is truly exceptional.",
            "image": "https://i.pravatar.cc/150?img=12",
            "order": 1,
            "isActive": True
        },
        {
            "id": "testimonial-2",
            "name": "Dr. Lakshmi Menon",
            "role": "Musicologist",
            "temple": "Kerala Sangeetha Nataka Akademi",
            "quote": "In preserving the ancient art of temple music, Vaidehi stands as a beacon of authenticity and devotion. Her performances are a bridge between tradition and contemporary reverence.",
            "image": "https://i.pravatar.cc/150?img=45",
            "order": 2,
            "isActive": True
        },
        {
            "id": "testimonial-3",
            "name": "Krishnan Unni",
            "role": "Festival Organizer",
            "temple": "Thrissur Pooram Committee",
            "quote": "We have had the honor of hosting Vaidehi for multiple years. Her mastery over classical ragas and her soulful voice create an atmosphere of pure divinity.",
            "image": "https://i.pravatar.cc/150?img=33",
            "order": 3,
            "isActive": True
        },
        {
            "id": "testimonial-4",
            "name": "Radha Krishnan",
            "role": "Devotee & Patron",
            "temple": "Music Enthusiast",
            "quote": "Listening to Vaidehi's temple music performances is a transformative spiritual experience. She carries the essence of Sopana Sangeetham in every note.",
            "image": "https://i.pravatar.cc/150?img=27",
            "order": 4,
            "isActive": True
        }
    ]
    
    await db.testimonials.delete_many({})
    await db.testimonials.insert_many(testimonials)
    print(f"✅ Seeded {len(testimonials)} testimonials")
    
    # Gallery items (using existing gallery collection)
    gallery_items = [
        {
            "id": "gallery-1",
            "thumbnail": "https://images.unsplash.com/photo-1598000938546-d8b840f69952?w=400&h=400&fit=crop",
            "linkType": "youtube",
            "externalLink": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            "title": "Temple Performance",
            "caption": "Annual pilgrimage concert"
        },
        {
            "id": "gallery-2",
            "thumbnail": "https://images.unsplash.com/photo-1610118370450-0881b2f5ccb5?w=400&h=400&fit=crop",
            "linkType": "instagram-post",
            "externalLink": "https://www.instagram.com/p/example123/",
            "title": "Guruvayur Devotional",
            "caption": "Sacred morning prayers"
        },
        {
            "id": "gallery-3",
            "thumbnail": "https://images.unsplash.com/photo-1584714268709-c3dd9c92b378?w=400&h=400&fit=crop",
            "linkType": "instagram-reel",
            "externalLink": "https://www.instagram.com/reel/example456/",
            "title": "Traditional Ceremony",
            "caption": "Temple festival highlights"
        },
        {
            "id": "gallery-4",
            "thumbnail": "https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?w=400&h=400&fit=crop",
            "linkType": "youtube",
            "externalLink": "https://www.youtube.com/watch?v=example789",
            "title": "Festival Performance",
            "caption": "Thrissur Pooram 2024"
        },
        {
            "id": "gallery-5",
            "thumbnail": "https://images.unsplash.com/photo-1604608672516-f1b9b1a0b0f0?w=400&h=400&fit=crop",
            "linkType": "instagram-post",
            "externalLink": "https://www.instagram.com/p/example101/",
            "title": "Temple Architecture",
            "caption": "Sacred spaces of Kerala"
        },
        {
            "id": "gallery-6",
            "thumbnail": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=400&fit=crop",
            "linkType": "instagram-reel",
            "externalLink": "https://www.instagram.com/reel/example112/",
            "title": "Evening Prayers",
            "caption": "Devotional session"
        }
    ]
    
    await db.gallery.delete_many({})
    await db.gallery.insert_many(gallery_items)
    print(f"✅ Seeded {len(gallery_items)} gallery items")
    
    print("\n🎉 Database seeding completed successfully!")
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())
