"""
Seed Northflank database via API calls
Run this from Emergent or your local machine to populate the Northflank backend
"""

import requests
import json

# Your Northflank backend URL
BACKEND_URL = "https://p01--vaidehi-suresh-portfolio--xnwd42xkxs5d.code.run"
ADMIN_PASSWORD = "admin123"  # Update if different

def seed_via_api():
    """Seed database using admin API endpoints"""
    
    print("🚀 Starting API-based seeding for Northflank...")
    print(f"Backend URL: {BACKEND_URL}\n")
    
    try:
        # 1. Seed Audio Tracks
        print("📀 Seeding audio tracks...")
        audio_tracks = [
            {
                "id": "audio-yt-1",
                "title": "Darikande Sirassukoithoru",
                "raga": "Sopana Sangeetham",
                "duration": "3:02",
                "temple": "Traditional Performance",
                "audioUrl": "https://www.youtube.com/watch?v=frziSqfnKvM",
                "order": 1,
                "isActive": True
            },
            {
                "id": "audio-yt-2",
                "title": "Prayer Song - Kaithapram",
                "raga": "Devotional",
                "duration": "4:43",
                "temple": "Kerala Temple",
                "audioUrl": "https://www.youtube.com/watch?v=rbrF9shd5cs",
                "order": 2,
                "isActive": True
            },
            {
                "id": "audio-yt-3",
                "title": "Thingalchoodapriye Sankari",
                "raga": "Anandha Bhairavi",
                "duration": "5:20",
                "temple": "Temple Festival",
                "audioUrl": "https://www.youtube.com/watch?v=NNwGau3r6ms",
                "order": 3,
                "isActive": True
            },
            {
                "id": "audio-yt-4",
                "title": "Astapathi - Rase Harimiha",
                "raga": "Sopana Sangeetham",
                "duration": "5:09",
                "temple": "Classical Performance",
                "audioUrl": "https://www.youtube.com/watch?v=TBHQh0U_YxU",
                "order": 4,
                "isActive": True
            }
        ]
        
        for track in audio_tracks:
            response = requests.post(
                f"{BACKEND_URL}/api/admin/audio-tracks",
                json=track,
                headers={"Content-Type": "application/json"}
            )
            if response.status_code == 200:
                print(f"  ✅ Added: {track['title']}")
            else:
                print(f"  ⚠️  Failed: {track['title']} - {response.status_code}")
        
        print(f"✅ Completed audio tracks\n")
        
        # 2. Seed Video Performances
        print("🎥 Seeding video performances...")
        videos = [
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
        
        for video in videos:
            response = requests.post(
                f"{BACKEND_URL}/api/admin/video-performances",
                json=video,
                headers={"Content-Type": "application/json"}
            )
            if response.status_code == 200:
                print(f"  ✅ Added: {video['title']}")
            else:
                print(f"  ⚠️  Failed: {video['title']} - {response.status_code}")
        
        print(f"✅ Completed video performances\n")
        
        # 3. Seed Gallery
        print("🖼️  Seeding gallery...")
        gallery = [
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
                "id": "gallery-real-7",
                "thumbnail": "https://i.ytimg.com/vi/frziSqfnKvM/hqdefault.jpg",
                "linkType": "youtube",
                "externalLink": "https://www.youtube.com/watch?v=frziSqfnKvM",
                "title": "Darikande Sirassukoithoru",
                "caption": "Full performance video"
            },
            {
                "id": "gallery-real-8",
                "thumbnail": "https://i.ytimg.com/vi/rbrF9shd5cs/hqdefault.jpg",
                "linkType": "youtube",
                "externalLink": "https://www.youtube.com/watch?v=rbrF9shd5cs",
                "title": "Prayer Song - Kaithapram",
                "caption": "Devotional performance"
            },
            {
                "id": "gallery-real-9",
                "thumbnail": "https://i.ytimg.com/vi/NNwGau3r6ms/hqdefault.jpg",
                "linkType": "youtube",
                "externalLink": "https://www.youtube.com/watch?v=NNwGau3r6ms",
                "title": "Thingalchoodapriye Sankari",
                "caption": "Anandha Bhairavi raga"
            },
            {
                "id": "gallery-real-10",
                "thumbnail": "https://i.ytimg.com/vi/TBHQh0U_YxU/hqdefault.jpg",
                "linkType": "youtube",
                "externalLink": "https://www.youtube.com/watch?v=TBHQh0U_YxU",
                "title": "Astapathi - Rase Harimiha",
                "caption": "Classical Sopana Sangeetham"
            }
        ]
        
        for item in gallery:
            response = requests.post(
                f"{BACKEND_URL}/api/admin/gallery",
                json=item,
                headers={"Content-Type": "application/json"}
            )
            if response.status_code == 200:
                print(f"  ✅ Added: {item['title']}")
            else:
                print(f"  ⚠️  Failed: {item['title']} - {response.status_code}")
        
        print(f"✅ Completed gallery items\n")
        
        print("="*50)
        print("🎉 API-based seeding completed!")
        print("="*50)
        print("\n📊 Summary:")
        print(f"   • Audio Tracks: {len(audio_tracks)} items")
        print(f"   • Video Performances: {len(videos)} items")
        print(f"   • Gallery Items: {len(gallery)} items")
        print("\n✅ Your Northflank backend is now populated!")
        print("\n🔄 Next Steps:")
        print("   1. Verify data at:")
        print(f"      {BACKEND_URL}/api/admin/audio-tracks")
        print(f"      {BACKEND_URL}/api/admin/video-performances")
        print(f"      {BACKEND_URL}/api/admin/gallery")
        print("   2. Trigger Netlify redeploy (Clear cache and deploy)")
        print("   3. Check your live site!")
        
    except Exception as e:
        print(f"\n❌ Error during API seeding: {str(e)}")
        raise

if __name__ == "__main__":
    seed_via_api()
