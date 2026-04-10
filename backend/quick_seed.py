import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient

# Get env vars
MONGO_URL = os.environ.get('MONGO_URL')
DB_NAME = os.environ.get('DB_NAME', 'portfolio_db')

SAMPLE_DATA = [
    {
        "id": "perf-001",
        "url": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
        "thumbnail": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400",
        "title": "Sree Krishna Leela",
        "caption": "Classical Bharatanatyam performance depicting stories from Krishna's life",
        "order": 1,
        "isActive": True
    },
    {
        "id": "perf-002",
        "url": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
        "thumbnail": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
        "title": "Temple Festival Performance",
        "caption": "Annual temple festival presentation in Kerala",
        "order": 2,
        "isActive": True
    },
    {
        "id": "perf-003",
        "url": "https://images.unsplash.com/photo-1583224964508-615f09481498?w=800",
        "thumbnail": "https://images.unsplash.com/photo-1583224964508-615f09481498?w=400",
        "title": "Margam Recital",
        "caption": "Full-length traditional Bharatanatyam margam performance",
        "order": 3,
        "isActive": True
    },
    {
        "id": "perf-004",
        "url": "https://images.unsplash.com/photo-1598496991652-4d74f5a3d195?w=800",
        "thumbnail": "https://images.unsplash.com/photo-1598496991652-4d74f5a3d195?w=400",
        "title": "Devotional Dance",
        "caption": "Sopana Sangeetham fusion with classical Bharatanatyam",
        "order": 4,
        "isActive": True
    },
    {
        "id": "perf-005",
        "url": "https://images.unsplash.com/photo-1591608971362-d5a6e5a5c261?w=800",
        "thumbnail": "https://images.unsplash.com/photo-1591608971362-d5a6e5a5c261?w=400",
        "title": "Cultural Exchange Program",
        "caption": "International cultural exchange performance in Kerala",
        "order": 5,
        "isActive": True
    }
]

async def seed():
    print(f"🔗 Connecting to database: {DB_NAME}")
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    try:
        # Clear existing
        result = await db.performance_gallery.delete_many({})
        print(f'🗑️  Cleared {result.deleted_count} existing items')
        
        # Insert new
        result = await db.performance_gallery.insert_many(SAMPLE_DATA)
        print(f'✅ Inserted {len(result.inserted_ids)} sample images')
        
        # Verify
        count = await db.performance_gallery.count_documents({})
        print(f'📊 Total items in database: {count}')
        print('')
        print('📸 Sample items:')
        async for item in db.performance_gallery.find({}, {"_id": 0}).limit(3):
            print(f'  - {item["title"]} (Order: {item["order"]})')
        
        print('')
        print('🎉 Sample data added successfully!')
        
    finally:
        client.close()

if __name__ == '__main__':
    asyncio.run(seed())
