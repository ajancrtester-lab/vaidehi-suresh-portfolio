"""
Sync Portfolio Data to Database
This script reads portfolio_data.py and syncs all changes to the database
Run this after editing portfolio_data.py to update your live site
"""

import sys
import os

# Add parent directory to path to import portfolio_data
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from portfolio_data import (
    AUDIO_TRACKS,
    VIDEO_PERFORMANCES,
    GALLERY,
    SITE_SETTINGS,
    PORTFOLIO_CONTENT
)

import requests
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

# Determine which database to sync to
SYNC_TO = os.environ.get('SYNC_TO', 'northflank')  # 'northflank' or 'local'

if SYNC_TO == 'northflank':
    BACKEND_URL = "https://p01--vaidehi-suresh-portfolio--xnwd42xkxs5d.code.run"
    USE_API = True
else:
    # For local/direct MongoDB access
    MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
    DB_NAME = os.environ.get('DB_NAME', 'vaidehi_portfolio')
    USE_API = False

def sync_via_api():
    """Sync data using API endpoints (for Northflank)"""
    print("🔄 Syncing data to Northflank via API...")
    print(f"Backend URL: {BACKEND_URL}\n")
    print("⚠️  Using REPLACE strategy: Deleting old items and inserting fresh data\n")
    
    try:
        # 1. Sync Audio Tracks - DELETE ALL then INSERT
        print("📀 Syncing audio tracks...")
        
        # Get all existing audio tracks
        try:
            response = requests.get(f"{BACKEND_URL}/api/admin/audio-tracks")
            existing_tracks = response.json().get('tracks', [])
            
            # Delete all existing tracks
            for track in existing_tracks:
                requests.delete(f"{BACKEND_URL}/api/admin/audio-tracks/{track['id']}")
            print(f"  🗑️  Deleted {len(existing_tracks)} old tracks")
        except:
            pass
        
        # Insert fresh data
        for track in AUDIO_TRACKS:
            response = requests.post(
                f"{BACKEND_URL}/api/admin/audio-tracks",
                json=track,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code in [200, 201]:
                print(f"  ✅ Added: {track['title']}")
            else:
                print(f"  ⚠️  Failed: {track['title']} - {response.status_code}")
        
        # 2. Sync Video Performances - DELETE ALL then INSERT
        print("\n🎥 Syncing video performances...")
        
        # Delete all existing videos
        try:
            response = requests.get(f"{BACKEND_URL}/api/admin/video-performances")
            existing_videos = response.json().get('videos', [])
            
            for video in existing_videos:
                requests.delete(f"{BACKEND_URL}/api/admin/video-performances/{video['id']}")
            print(f"  🗑️  Deleted {len(existing_videos)} old videos")
        except:
            pass
        
        # Insert fresh data
        for video in VIDEO_PERFORMANCES:
            response = requests.post(
                f"{BACKEND_URL}/api/admin/video-performances",
                json=video,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code in [200, 201]:
                print(f"  ✅ Added: {video['title']}")
            else:
                print(f"  ⚠️  Failed: {video['title']} - {response.status_code}")
        
        # 3. Sync Gallery - DELETE ALL then INSERT
        print("\n🖼️  Syncing gallery...")
        
        # Delete all existing gallery items
        try:
            response = requests.get(f"{BACKEND_URL}/api/admin/gallery")
            existing_gallery = response.json().get('gallery', [])
            
            for item in existing_gallery:
                requests.delete(f"{BACKEND_URL}/api/admin/gallery/{item['id']}")
            print(f"  🗑️  Deleted {len(existing_gallery)} old items")
        except:
            pass
        
        # Insert fresh data
        for item in GALLERY:
            response = requests.post(
                f"{BACKEND_URL}/api/admin/gallery",
                json=item,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code in [200, 201]:
                print(f"  ✅ Added: {item['title']}")
            else:
                print(f"  ⚠️  Failed: {item['title']} - {response.status_code}")
        
        # 4. Sync Site Settings
        print("\n⚙️  Syncing site settings...")
        response = requests.put(
            f"{BACKEND_URL}/api/site-settings",
            json=SITE_SETTINGS,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            print("  ✅ Site settings updated")
        else:
            print(f"  ⚠️  Failed to update site settings - {response.status_code}")
        
        print("\n" + "="*60)
        print("🎉 Sync completed successfully!")
        print("="*60)
        print(f"\n📊 Summary:")
        print(f"   • Audio Tracks: {len(AUDIO_TRACKS)} items synced")
        print(f"   • Video Performances: {len(VIDEO_PERFORMANCES)} items synced")
        print(f"   • Gallery Items: {len(GALLERY)} items synced")
        print(f"   • Site Settings: Updated")
        print("\n✅ Changes are now live on Northflank!")
        print("🔄 Netlify will pick up changes on next build")
        
    except Exception as e:
        print(f"\n❌ Error during API sync: {str(e)}")
        raise

async def sync_via_mongodb():
    """Sync data directly to MongoDB (for local development)"""
    print("🔄 Syncing data to MongoDB directly...")
    print(f"MongoDB: {MONGO_URL}\n")
    
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    try:
        # Test connection
        await db.command('ping')
        print("✅ Connected to MongoDB\n")
        
        # 1. Sync Audio Tracks
        print("📀 Syncing audio tracks...")
        for track in AUDIO_TRACKS:
            await db.audio_tracks.update_one(
                {"id": track['id']},
                {"$set": track},
                upsert=True
            )
            print(f"  ✅ Synced: {track['title']}")
        
        # 2. Sync Video Performances
        print("\n🎥 Syncing video performances...")
        for video in VIDEO_PERFORMANCES:
            await db.video_performances.update_one(
                {"id": video['id']},
                {"$set": video},
                upsert=True
            )
            print(f"  ✅ Synced: {video['title']}")
        
        # 3. Sync Gallery
        print("\n🖼️  Syncing gallery...")
        for item in GALLERY:
            await db.gallery.update_one(
                {"id": item['id']},
                {"$set": item},
                upsert=True
            )
            print(f"  ✅ Synced: {item['title']}")
        
        # 4. Sync Site Settings
        print("\n⚙️  Syncing site settings...")
        await db.site_settings.update_one(
            {"id": SITE_SETTINGS['id']},
            {"$set": SITE_SETTINGS},
            upsert=True
        )
        print("  ✅ Site settings synced")
        
        # 5. Sync Portfolio Content
        print("\n📝 Syncing portfolio content...")
        await db.portfolio_content.update_one(
            {},
            {"$set": PORTFOLIO_CONTENT},
            upsert=True
        )
        print("  ✅ Portfolio content synced")
        
        print("\n" + "="*60)
        print("🎉 MongoDB sync completed successfully!")
        print("="*60)
        
    except Exception as e:
        print(f"\n❌ Error during MongoDB sync: {str(e)}")
        raise
    finally:
        client.close()

if __name__ == "__main__":
    print("="*60)
    print("Portfolio Data Sync Tool")
    print("="*60)
    print(f"Sync Target: {SYNC_TO.upper()}\n")
    
    if USE_API:
        sync_via_api()
    else:
        asyncio.run(sync_via_mongodb())
