"""
Add site settings management to allow editing everything from backend
"""

import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.environ.get('MONGO_URL')
DB_NAME = os.environ.get('DB_NAME', 'test_database')

async def seed_site_settings():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    print("🔄 Creating site settings collection...")
    
    # Site Settings - Everything configurable
    site_settings = {
        "id": "main_settings",
        "hero": {
            "mainTitle": "Vaidehi Suresh",
            "subtitle": "Sopana Sangeetham Exponent",
            "tagline": "Preserving the Sacred Melodies of Kerala Temples",
            "description": "A dedicated practitioner of Sopana Sangeetham, carrying forward the ancient tradition of temple music with devotion and artistry."
        },
        "stats": {
            "yearsOfExperience": 15,
            "templesPerformed": 750,
            "studentsTrained": 100,
            "awardsReceived": 12
        },
        "backgroundMusic": {
            "enabled": True,
            "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            "duration": 30,
            "volume": 0.3,
            "title": "Sopana Sangeetham",
            "description": "Traditional temple music"
        },
        "socialMedia": {
            "instagram": "https://www.instagram.com/iraneesam_vaidehi_suresh/",
            "youtube": "https://www.youtube.com/@sureshnairiranikulam3072",
            "facebook": "https://www.facebook.com/vaidehi.suresh"
        },
        "contact": {
            "whatsapp": "919446909402",
            "email": "vaidehisureshikm@gmail.com",
            "location": "Iranikkulam, Thrissur, Kerala"
        },
        "seo": {
            "metaTitle": "Vaidehi Suresh - Sopana Sangeetham Artist | Kerala Temple Music",
            "metaDescription": "Renowned Sopana Sangeetham artist from Kerala. Book authentic temple music performances for festivals, cultural events, and devotional concerts.",
            "keywords": ["Sopana Sangeetham", "Kerala Temple Music", "Vaidehi Suresh", "Traditional Music", "Temple Performances"]
        }
    }
    
    # Insert or update
    await db.site_settings.delete_many({})
    await db.site_settings.insert_one(site_settings)
    print("✅ Site settings created")
    
    print("\n🎉 All content is now manageable from backend!")
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_site_settings())
