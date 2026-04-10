"""
Seed sample performance gallery images
"""

import asyncio
import sys
import os
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from database import db, close_db_connection
from datetime import datetime, timezone

# Sample images (using high-quality temple/performance imagery)
SAMPLE_IMAGES = [
    {
        "id": "perf-gallery-1",
        "url": "https://images.unsplash.com/photo-1514064019862-23e2a332a6a6?w=1280&h=720&fit=crop",
        "title": "Divine Performance at Guruvayur Temple",
        "caption": "Annual temple festival 2024",
        "order": 1,
        "isActive": True,
        "createdAt": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": "perf-gallery-2",
        "url": "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=1280&h=720&fit=crop",
        "title": "Sacred Music at Thrissur Pooram",
        "caption": "Traditional Sopana Sangeetham performance",
        "order": 2,
        "isActive": True,
        "createdAt": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": "perf-gallery-3",
        "url": "https://images.unsplash.com/photo-1545128485-c400e7702796?w=1280&h=720&fit=crop",
        "title": "Cultural Festival Performance",
        "caption": "Kerala Sangeetha Sabha",
        "order": 3,
        "isActive": True,
        "createdAt": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": "perf-gallery-4",
        "url": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1280&h=720&fit=crop",
        "title": "Temple Music Workshop",
        "caption": "Teaching traditional music to students",
        "order": 4,
        "isActive": True,
        "createdAt": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": "perf-gallery-5",
        "url": "https://images.unsplash.com/photo-1522093537031-3ee69e6b1746?w=1280&h=720&fit=crop",
        "title": "Classical Concert",
        "caption": "Solo performance at cultural center",
        "order": 5,
        "isActive": True,
        "createdAt": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": "perf-gallery-6",
        "url": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1280&h=720&fit=crop",
        "title": "Devotional Music Session",
        "caption": "Morning prayer performance",
        "order": 6,
        "isActive": True,
        "createdAt": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": "perf-gallery-7",
        "url": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1280&h=720&fit=crop",
        "title": "Festival Performance",
        "caption": "Annual music festival",
        "order": 7,
        "isActive": True,
        "createdAt": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": "perf-gallery-8",
        "url": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1280&h=720&fit=crop",
        "title": "Sacred Temple Ceremony",
        "caption": "Special occasion performance",
        "order": 8,
        "isActive": True,
        "createdAt": datetime.now(timezone.utc).isoformat()
    },
]

async def seed_performance_gallery():
    """Seed performance gallery with sample images"""
    try:
        print("🎨 Seeding Performance Gallery...")
        
        # Clear existing data
        await db.performance_gallery.delete_many({})
        print("  🗑️  Cleared existing gallery images")
        
        # Insert sample images
        await db.performance_gallery.insert_many(SAMPLE_IMAGES)
        print(f"  ✅ Inserted {len(SAMPLE_IMAGES)} sample images")
        
        print("\n✅ Performance Gallery seeded successfully!")
        
    except Exception as e:
        print(f"\n❌ Error seeding gallery: {str(e)}")
        raise
    finally:
        await close_db_connection()

if __name__ == "__main__":
    asyncio.run(seed_performance_gallery())
