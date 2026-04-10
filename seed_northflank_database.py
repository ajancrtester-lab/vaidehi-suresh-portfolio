"""
Seed Performance Gallery data to Northflank MongoDB
Run this AFTER backend is deployed to Northflank
"""
import asyncio
import sys
from motor.motor_asyncio import AsyncIOMotorClient

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

async def seed_database(mongo_url: str, db_name: str):
    """Seed performance gallery data to Northflank MongoDB"""
    
    print(f"🔗 Connecting to MongoDB...")
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    try:
        # Test connection
        await client.admin.command('ping')
        print("✅ Connected successfully!")
        
        # Clear existing data (optional - remove if you want to keep existing)
        print(f"\n📊 Checking existing performance gallery items...")
        existing_count = await db.performance_gallery.count_documents({})
        print(f"Found {existing_count} existing items")
        
        if existing_count > 0:
            response = input("⚠️  Clear existing data? (yes/no): ").lower()
            if response == 'yes':
                result = await db.performance_gallery.delete_many({})
                print(f"🗑️  Deleted {result.deleted_count} existing items")
        
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
        
        print("\n🎉 Database seeding complete!")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)
    finally:
        client.close()

if __name__ == "__main__":
    print("=" * 60)
    print("NORTHFLANK MONGODB SEEDING SCRIPT")
    print("=" * 60)
    
    # Get Northflank MongoDB credentials
    print("\n📋 You need your Northflank MongoDB connection details:")
    print("   1. Go to Northflank Dashboard")
    print("   2. Find your MongoDB addon/service")
    print("   3. Copy the connection string\n")
    
    mongo_url = input("Enter Northflank MONGO_URL: ").strip()
    if not mongo_url:
        print("❌ MongoDB URL is required!")
        sys.exit(1)
    
    db_name = input("Enter DB_NAME (press Enter for 'portfolio_db'): ").strip() or "portfolio_db"
    
    print(f"\n🎯 Target Database: {db_name}")
    confirm = input("Proceed with seeding? (yes/no): ").lower()
    
    if confirm == 'yes':
        asyncio.run(seed_database(mongo_url, db_name))
    else:
        print("❌ Seeding cancelled")
