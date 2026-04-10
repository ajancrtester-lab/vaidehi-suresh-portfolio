"""
Quick script to add Performance Gallery images to your EXISTING production database
No database switching - uses your current MONGO_URL from .env
"""
import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

# Load your existing production .env
load_dotenv()

# Sample performance gallery data
PERFORMANCE_GALLERY_DATA = [
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

async def seed_current_database():
    """Seed performance gallery to your EXISTING production database"""
    
    # Get current production credentials from .env
    mongo_url = os.getenv('MONGO_URL')
    db_name = os.getenv('DB_NAME', 'portfolio_db')
    
    if not mongo_url:
        print("❌ Error: MONGO_URL not found in .env file!")
        print("   Make sure you're running from /app/backend/ directory")
        return
    
    print(f"🔗 Connecting to your production database...")
    print(f"   Database: {db_name}")
    
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    try:
        # Test connection
        await client.admin.command('ping')
        print("✅ Connected successfully!")
        
        # Check existing data
        existing_count = await db.performance_gallery.count_documents({})
        print(f"\n📊 Current performance gallery items: {existing_count}")
        
        if existing_count > 0:
            print("\n⚠️  Performance gallery already has data.")
            print("   Options:")
            print("   1. Keep existing and add new items")
            print("   2. Clear existing and insert sample data")
            choice = input("\n   Enter choice (1 or 2): ").strip()
            
            if choice == "2":
                result = await db.performance_gallery.delete_many({})
                print(f"   🗑️  Deleted {result.deleted_count} existing items")
        
        # Insert new data
        print(f"\n📥 Inserting {len(PERFORMANCE_GALLERY_DATA)} performance gallery items...")
        result = await db.performance_gallery.insert_many(PERFORMANCE_GALLERY_DATA)
        print(f"✅ Inserted {len(result.inserted_ids)} items successfully!")
        
        # Verify
        total = await db.performance_gallery.count_documents({})
        print(f"\n✅ Total items in database: {total}")
        
        # Show sample
        print("\n📸 Sample items:")
        async for item in db.performance_gallery.find({}, {"_id": 0}).limit(3):
            print(f"  - {item['title']} (Order: {item['order']})")
        
        print("\n🎉 Performance gallery seeded to your production database!")
        print("\n✅ Your live website will now show these images!")
        
    except Exception as e:
        print(f"❌ Error: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    print("=" * 60)
    print("SEED PERFORMANCE GALLERY TO PRODUCTION DATABASE")
    print("=" * 60)
    print("\nThis script uses your EXISTING production database")
    print("(from MONGO_URL in your .env file)")
    print("\nNo database switching required!")
    print("=" * 60)
    
    asyncio.run(seed_current_database())
