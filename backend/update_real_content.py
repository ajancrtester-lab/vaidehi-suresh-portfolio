"""
Update database with real Instagram reels, YouTube videos, and audio from social media
"""

import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.environ.get('MONGO_URL')
DB_NAME = os.environ.get('DB_NAME', 'test_database')

async def update_real_content():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    print("🔄 Updating with real social media content...")
    
    # Real YouTube Videos from the channel
    youtube_videos = [
        {
            "id": "video-real-1",
            "title": "Darikande Sirassukoithoru - Sopana Sangeetham",
            "venue": "YouTube Performance",
            "date": "December 2024",
            "thumbnail": "https://i.ytimg.com/vi/frziSqfnKvM/hqdefault.jpg",
            "videoUrl": "https://www.youtube.com/embed/frziSqfnKvM",
            "order": 1,
            "isActive": True
        },
        {
            "id": "video-real-2",
            "title": "Prayer Song - Kaithapram",
            "venue": "Devotional Performance",
            "date": "November 2024",
            "thumbnail": "https://i.ytimg.com/vi/rbrF9shd5cs/hqdefault.jpg",
            "videoUrl": "https://www.youtube.com/embed/rbrF9shd5cs",
            "order": 2,
            "isActive": True
        },
        {
            "id": "video-real-3",
            "title": "Thingalchoodapriye Sankari - Anandha Bhairavi",
            "venue": "Temple Performance",
            "date": "October 2024",
            "thumbnail": "https://i.ytimg.com/vi/NNwGau3r6ms/hqdefault.jpg",
            "videoUrl": "https://www.youtube.com/embed/NNwGau3r6ms",
            "order": 3,
            "isActive": True
        },
        {
            "id": "video-real-4",
            "title": "Astapathi - Rase Harimiha",
            "venue": "Sopana Sangeetham",
            "date": "September 2024",
            "thumbnail": "https://i.ytimg.com/vi/TBHQh0U_YxU/hqdefault.jpg",
            "videoUrl": "https://www.youtube.com/embed/TBHQh0U_YxU",
            "order": 4,
            "isActive": True
        },
        {
            "id": "video-real-5",
            "title": "Sarasadhala Nayane - Surutti Ragam",
            "venue": "Classical Performance",
            "date": "August 2024",
            "thumbnail": "https://i.ytimg.com/vi/2bbQtFZqcn4/hqdefault.jpg",
            "videoUrl": "https://www.youtube.com/embed/2bbQtFZqcn4",
            "order": 5,
            "isActive": True
        },
        {
            "id": "video-real-6",
            "title": "Dasami Vannanju",
            "venue": "Festival Performance",
            "date": "July 2024",
            "thumbnail": "https://i.ytimg.com/vi/Egmkek6-jls/hqdefault.jpg",
            "videoUrl": "https://www.youtube.com/embed/Egmkek6-jls",
            "order": 6,
            "isActive": True
        }
    ]
    
    # Instagram Reels for Gallery (using YouTube Shorts as placeholders since Instagram can't be scraped)
    gallery_items = [
        {
            "id": "gallery-real-1",
            "thumbnail": "https://i.ytimg.com/vi/Z78bMBSQh8Q/hqdefault.jpg",
            "linkType": "youtube",
            "externalLink": "https://www.youtube.com/shorts/Z78bMBSQh8Q",
            "title": "Astanagakkalam - Sopana Sangeetham",
            "caption": "Temple devotional performance"
        },
        {
            "id": "gallery-real-2",
            "thumbnail": "https://i.ytimg.com/vi/u-dfUfA1sLo/hqdefault.jpg",
            "linkType": "youtube",
            "externalLink": "https://www.youtube.com/shorts/u-dfUfA1sLo",
            "title": "Sindhooranuna Vighraham",
            "caption": "Classical raga performance"
        },
        {
            "id": "gallery-real-3",
            "thumbnail": "https://i.ytimg.com/vi/sbpNec3e17g/hqdefault.jpg",
            "linkType": "youtube",
            "externalLink": "https://www.youtube.com/shorts/sbpNec3e17g",
            "title": "Seetha Kalyanam Vaibhogame",
            "caption": "Devotional music"
        },
        {
            "id": "gallery-real-4",
            "thumbnail": "https://i.ytimg.com/vi/LMk4vgFOVLo/hqdefault.jpg",
            "linkType": "youtube",
            "externalLink": "https://www.youtube.com/shorts/LMk4vgFOVLo",
            "title": "Ormayil Ennennum",
            "caption": "Lyrics by Sathish Kalath"
        },
        {
            "id": "gallery-real-5",
            "thumbnail": "https://i.ytimg.com/vi/3ehLqsEruGU/hqdefault.jpg",
            "linkType": "youtube",
            "externalLink": "https://www.youtube.com/shorts/3ehLqsEruGU",
            "title": "Sopana Sangeetham at JTC Mala",
            "caption": "Live temple performance"
        },
        {
            "id": "gallery-real-6",
            "thumbnail": "https://i.ytimg.com/vi/JwbvZGRLyfI/hqdefault.jpg",
            "linkType": "youtube",
            "externalLink": "https://www.youtube.com/shorts/JwbvZGRLyfI",
            "title": "Aanakkomban - NK Desham",
            "caption": "Traditional temple music with Idakka"
        },
        {
            "id": "gallery-insta-1",
            "thumbnail": "https://images.unsplash.com/photo-1598000938546-d8b840f69952?w=400&h=400&fit=crop",
            "linkType": "instagram-post",
            "externalLink": "https://www.instagram.com/iraneesam_vaidehi_suresh/",
            "title": "Temple Performance Highlights",
            "caption": "Follow for more performances"
        },
        {
            "id": "gallery-insta-2",
            "thumbnail": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=400&fit=crop",
            "linkType": "instagram-reel",
            "externalLink": "https://www.instagram.com/iraneesam_vaidehi_suresh/",
            "title": "Latest Reel Performance",
            "caption": "Check Instagram for latest reels"
        }
    ]
    
    # Audio Tracks (using YouTube video audio)
    audio_tracks = [
        {
            "id": "audio-real-1",
            "title": "Darikande Sirassukoithoru",
            "raga": "Sopana Sangeetham",
            "duration": "3:02",
            "temple": "Traditional",
            "audioUrl": "https://www.youtube.com/watch?v=frziSqfnKvM",
            "order": 1,
            "isActive": True
        },
        {
            "id": "audio-real-2",
            "title": "Prayer Song",
            "raga": "Kaithapram",
            "duration": "4:43",
            "temple": "Devotional",
            "audioUrl": "https://www.youtube.com/watch?v=rbrF9shd5cs",
            "order": 2,
            "isActive": True
        },
        {
            "id": "audio-real-3",
            "title": "Thingalchoodapriye Sankari",
            "raga": "Anandha Bhairavi",
            "duration": "5:20",
            "temple": "Temple Performance",
            "audioUrl": "https://www.youtube.com/watch?v=NNwGau3r6ms",
            "order": 3,
            "isActive": True
        },
        {
            "id": "audio-real-4",
            "title": "Astapathi - Rase Harimiha",
            "raga": "Sopana Sangeetham",
            "duration": "5:09",
            "temple": "Classical",
            "audioUrl": "https://www.youtube.com/watch?v=TBHQh0U_YxU",
            "order": 4,
            "isActive": True
        },
        {
            "id": "audio-real-5",
            "title": "Sarasadhala Nayane",
            "raga": "Surutti Ragam",
            "duration": "4:52",
            "temple": "Traditional",
            "audioUrl": "https://www.youtube.com/watch?v=2bbQtFZqcn4",
            "order": 5,
            "isActive": True
        }
    ]
    
    # Replace existing data
    await db.video_performances.delete_many({})
    await db.video_performances.insert_many(youtube_videos)
    print(f"✅ Updated {len(youtube_videos)} YouTube videos")
    
    await db.gallery.delete_many({})
    await db.gallery.insert_many(gallery_items)
    print(f"✅ Updated {len(gallery_items)} gallery items")
    
    await db.audio_tracks.delete_many({})
    await db.audio_tracks.insert_many(audio_tracks)
    print(f"✅ Updated {len(audio_tracks)} audio tracks")
    
    print("\n🎉 Successfully updated all content with real social media links!")
    client.close()

if __name__ == "__main__":
    asyncio.run(update_real_content())
