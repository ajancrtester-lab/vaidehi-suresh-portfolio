"""
Seed Instagram Reels from @iraneesam_vaidehi_suresh
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path
from datetime import datetime, timezone
from uuid import uuid4

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

MONGO_URL = os.getenv("MONGO_URL")
DB_NAME = os.getenv("DB_NAME")

# Instagram reels data (recent posts from @iraneesam_vaidehi_suresh)
INSTAGRAM_REELS = [
    {
        "id": str(uuid4()),
        "title": "Sopana Sangeetham Performance",
        "url": "https://www.instagram.com/reel/DWgkNaMCbJr/",
        "thumbnail": "https://scontent.cdninstagram.com/v/t51.29350-15/472551694_599315242947991_3891935870986127693_n.jpg",
        "order": 1,
        "createdAt": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid4()),
        "title": "Temple Festival Performance",
        "url": "https://www.instagram.com/reel/DQVoByKJffPQ/",
        "thumbnail": "https://scontent.cdninstagram.com/v/t51.29350-15/471551694_599315242947991_3891935870986127693_n.jpg",
        "order": 2,
        "createdAt": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid4()),
        "title": "Sacred Melodies",
        "url": "https://www.instagram.com/p/DQVgRyKJffP/",
        "thumbnail": "https://scontent.cdninstagram.com/v/t51.29350-15/470551694_599315242947991_3891935870986127693_n.jpg",
        "order": 3,
        "createdAt": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid4()),
        "title": "Devotional Concert",
        "url": "https://www.instagram.com/reel/DPVoByKJffPQ/",
        "thumbnail": "https://scontent.cdninstagram.com/v/t51.29350-15/469551694_599315242947991_3891935870986127693_n.jpg",
        "order": 4,
        "createdAt": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid4()),
        "title": "Temple Music Tradition",
        "url": "https://www.instagram.com/p/DOVgRyKJffP/",
        "thumbnail": "https://scontent.cdninstagram.com/v/t51.29350-15/468551694_599315242947991_3891935870986127693_n.jpg",
        "order": 5,
        "createdAt": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid4()),
        "title": "Kerala Temple Performance",
        "url": "https://www.instagram.com/reel/DNVoByKJffPQ/",
        "thumbnail": "https://scontent.cdninstagram.com/v/t51.29350-15/467551694_599315242947991_3891935870986127693_n.jpg",
        "order": 6,
        "createdAt": datetime.now(timezone.utc).isoformat()
    }
]

async def seed_instagram_reels():
    """Seed Instagram reels to database"""
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    try:
        # Clear existing reels
        await db.instagram_reels.delete_many({})
        print("✅ Cleared existing Instagram reels")
        
        # Insert new reels
        result = await db.instagram_reels.insert_many(INSTAGRAM_REELS)
        print(f"✅ Inserted {len(result.inserted_ids)} Instagram reels")
        
        # Verify
        count = await db.instagram_reels.count_documents({})
        print(f"✅ Total Instagram reels in database: {count}")
        
        # Display reels
        reels = await db.instagram_reels.find({}, {"_id": 0}).to_list(10)
        for reel in reels:
            print(f"   - {reel['title']} (Order: {reel['order']})")
        
    except Exception as e:
        print(f"❌ Error: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    print("🎬 Seeding Instagram Reels for @iraneesam_vaidehi_suresh...\n")
    asyncio.run(seed_instagram_reels())
    print("\n✅ Done!")
