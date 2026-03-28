"""
Fix audio URLs - Replace YouTube links with working MP3 URLs
"""

import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.environ.get('MONGO_URL')
DB_NAME = os.environ.get('DB_NAME', 'test_database')

async def fix_audio_urls():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    print("🔄 Fixing audio URLs to use working MP3 files...")
    
    # Working placeholder MP3 URLs
    working_audio_tracks = [
        {
            "id": "audio-real-1",
            "title": "Darikande Sirassukoithoru",
            "raga": "Sopana Sangeetham",
            "duration": "3:02",
            "temple": "Traditional",
            "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            "order": 1,
            "isActive": True,
            "note": "Placeholder - Upload real performance MP3 through Admin > Settings"
        },
        {
            "id": "audio-real-2",
            "title": "Prayer Song",
            "raga": "Kaithapram",
            "duration": "4:43",
            "temple": "Devotional",
            "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
            "order": 2,
            "isActive": True,
            "note": "Placeholder - Upload real performance MP3"
        },
        {
            "id": "audio-real-3",
            "title": "Thingalchoodapriye Sankari",
            "raga": "Anandha Bhairavi",
            "duration": "5:20",
            "temple": "Temple Performance",
            "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
            "order": 3,
            "isActive": True,
            "note": "Placeholder - Upload real performance MP3"
        },
        {
            "id": "audio-real-4",
            "title": "Astapathi - Rase Harimiha",
            "raga": "Sopana Sangeetham",
            "duration": "5:09",
            "temple": "Classical",
            "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
            "order": 4,
            "isActive": True,
            "note": "Placeholder - Upload real performance MP3"
        },
        {
            "id": "audio-real-5",
            "title": "Sarasadhala Nayane",
            "raga": "Surutti Ragam",
            "duration": "4:52",
            "temple": "Traditional",
            "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
            "order": 5,
            "isActive": True,
            "note": "Placeholder - Upload real performance MP3"
        }
    ]
    
    # Update audio tracks
    await db.audio_tracks.delete_many({})
    await db.audio_tracks.insert_many(working_audio_tracks)
    print(f"✅ Fixed {len(working_audio_tracks)} audio tracks with working URLs")
    
    # Fix background music URL in site settings
    await db.site_settings.update_one(
        {"id": "main_settings"},
        {"$set": {
            "backgroundMusic.audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            "backgroundMusic.enabled": True,
            "backgroundMusic.duration": 30
        }},
        upsert=True
    )
    print("✅ Fixed background music URL")
    
    print("\n🎉 All audio URLs fixed! Website should work without errors now.")
    print("\n📝 Note: These are placeholder audio files.")
    print("   Upload your real performance MP3 files through:")
    print("   Admin Dashboard > Settings > Background Music")
    print("   Admin Dashboard > Media > Audio Tracks")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(fix_audio_urls())
