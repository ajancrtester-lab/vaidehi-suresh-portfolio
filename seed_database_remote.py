#!/usr/bin/env python3
"""
Seed script to populate MongoDB with initial data for the admin dashboard
Run this script to add sample content to your database
"""

import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timezone
import os

# MongoDB connection
MONGO_URL = "mongodb+srv://vaidehi_db_user:ajettan%40123@vaidehi.ji29yfr.mongodb.net/portfolio_db?retryWrites=true&w=majority&appName=vaidehi"
DB_NAME = "portfolio_db"

async def seed_database():
    print("🔗 Connecting to MongoDB...")
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    print("✅ Connected to MongoDB")
    
    # Clear existing data
    print("\n🗑️  Clearing existing collections...")
    await db.site_settings.delete_many({})
    await db.audio_tracks.delete_many({})
    await db.videos.delete_many({})
    await db.gallery.delete_many({})
    await db.testimonials.delete_many({})
    
    # Seed Site Settings
    print("\n📝 Seeding Site Settings...")
    site_settings = {
        "heroText": "Vaidehi Suresh - Sopana Sangeetham Artist",
        "whatsappNumber": "+919446909402",
        "backgroundMusic": {
            "enabled": False,
            "audioUrl": "",
            "volume": 0.3
        }
    }
    await db.site_settings.insert_one(site_settings)
    print("✅ Site settings added")
    
    # Seed Audio Tracks
    print("\n🎵 Seeding Audio Tracks...")
    audio_tracks = [
        {
            "id": "audio1",
            "title": "Madhyamavati Raga",
            "raga": "Madhyamavati",
            "duration": "8:30",
            "audioUrl": "https://www.youtube.com/watch?v=sample1",
            "description": "Classical temple performance",
            "youtubeUrl": "https://www.youtube.com/watch?v=sample1",
            "instagramUrl": "",
            "createdAt": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": "audio2",
            "title": "Mohana Raga Performance",
            "raga": "Mohana",
            "duration": "6:45",
            "audioUrl": "https://www.youtube.com/watch?v=sample2",
            "description": "Guruvayur temple performance",
            "youtubeUrl": "https://www.youtube.com/watch?v=sample2",
            "instagramUrl": "",
            "createdAt": datetime.now(timezone.utc).isoformat()
        }
    ]
    await db.audio_tracks.insert_many(audio_tracks)
    print(f"✅ Added {len(audio_tracks)} audio tracks")
    
    # Seed Videos
    print("\n🎥 Seeding Videos...")
    videos = [
        {
            "id": "video1",
            "title": "Sopana Sangeetham at Thrissur Pooram",
            "description": "Performance at Thrissur Pooram 2024",
            "videoUrl": "https://www.youtube.com/watch?v=sample1",
            "thumbnailUrl": "https://img.youtube.com/vi/sample1/maxresdefault.jpg",
            "youtubeId": "sample1",
            "createdAt": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": "video2",
            "title": "Temple Music Performance",
            "description": "Classical performance at Guruvayur Temple",
            "videoUrl": "https://www.youtube.com/watch?v=sample2",
            "thumbnailUrl": "https://img.youtube.com/vi/sample2/maxresdefault.jpg",
            "youtubeId": "sample2",
            "createdAt": datetime.now(timezone.utc).isoformat()
        }
    ]
    await db.videos.insert_many(videos)
    print(f"✅ Added {len(videos)} videos")
    
    # Seed Gallery
    print("\n🖼️  Seeding Gallery...")
    gallery = [
        {
            "id": "gallery1",
            "title": "Thrissur Pooram Performance",
            "description": "Classical raga performance",
            "imageUrl": "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800",
            "category": "performance",
            "createdAt": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": "gallery2",
            "title": "Temple Concert",
            "description": "Devotional music at Kerala temple",
            "imageUrl": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
            "category": "temple",
            "createdAt": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": "gallery3",
            "title": "Cultural Performance",
            "description": "Traditional sopana sangeetham",
            "imageUrl": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
            "category": "cultural",
            "createdAt": datetime.now(timezone.utc).isoformat()
        }
    ]
    await db.gallery.insert_many(gallery)
    print(f"✅ Added {len(gallery)} gallery items")
    
    # Seed Testimonials
    print("\n💬 Seeding Testimonials...")
    testimonials = [
        {
            "id": "testimonial1",
            "name": "Dr. Ramakrishnan Nair",
            "role": "Temple Administrator",
            "content": "Vaidehi's performance brought divine energy to our temple. Her dedication to Sopana Sangeetham is commendable.",
            "imageUrl": "https://i.pravatar.cc/150?img=12",
            "rating": 5,
            "createdAt": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": "testimonial2",
            "name": "Lakshmi Menon",
            "role": "Music Critic",
            "content": "An authentic voice in preserving Kerala's sacred musical traditions. Highly recommended for temple events.",
            "imageUrl": "https://i.pravatar.cc/150?img=45",
            "rating": 5,
            "createdAt": datetime.now(timezone.utc).isoformat()
        }
    ]
    await db.testimonials.insert_many(testimonials)
    print(f"✅ Added {len(testimonials)} testimonials")
    
    print("\n🎉 Database seeded successfully!")
    print("\n📊 Summary:")
    print(f"   • Site Settings: 1")
    print(f"   • Audio Tracks: {len(audio_tracks)}")
    print(f"   • Videos: {len(videos)}")
    print(f"   • Gallery Items: {len(gallery)}")
    print(f"   • Testimonials: {len(testimonials)}")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())
