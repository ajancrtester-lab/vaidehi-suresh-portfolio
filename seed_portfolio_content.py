#!/usr/bin/env python3
"""
Complete database seed - includes portfolio_content collection
"""

import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timezone

# MongoDB connection
MONGO_URL = "mongodb+srv://vaidehi_db_user:ajettan%40123@vaidehi.ji29yfr.mongodb.net/portfolio_db?retryWrites=true&w=majority&appName=vaidehi"
DB_NAME = "portfolio_db"

async def seed_complete():
    print("🔗 Connecting to MongoDB...")
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    print("✅ Connected to MongoDB")
    
    # Clear and seed portfolio_content collection
    print("\n📝 Seeding Portfolio Content...")
    await db.portfolio_content.delete_many({})
    
    portfolio_content = [
        # About section - English
        {
            "id": "about_en",
            "section": "about",
            "language": "en",
            "data": {
                "title": "About Vaidehi Suresh",
                "description": "A dedicated practitioner of Sopana Sangeetham, preserving Kerala's sacred temple music traditions for over 15 years.",
                "story": "Born into a family deeply rooted in Kerala's cultural heritage, I began my journey in Sopana Sangeetham at an early age. Through rigorous training under renowned maestros, I have mastered the intricate ragas and devotional compositions that define this divine art form."
            },
            "updatedAt": datetime.now(timezone.utc).isoformat()
        },
        # About section - Malayalam
        {
            "id": "about_ml",
            "section": "about",
            "language": "ml",
            "data": {
                "title": "വൈദേഹി സുരേഷിനെക്കുറിച്ച്",
                "description": "15 വർഷത്തിലധികമായി കേരളത്തിന്റെ പവിത്രമായ ക്ഷേത്ര സംഗീത പാരമ്പര്യങ്ങൾ സംരക്ഷിക്കുന്ന സോപാന സംഗീതത്തിന്റെ സമർപ്പിത അഭ്യാസി.",
                "story": "കേരളത്തിന്റെ സാംസ്കാരിക പൈതൃകത്തിൽ ആഴത്തിൽ വേരൂന്നിയ ഒരു കുടുംബത്തിൽ ജനിച്ച ഞാൻ ചെറുപ്പത്തിൽ തന്നെ സോപാന സംഗീതത്തിലേക്കുള്ള യാത്ര ആരംഭിച്ചു."
            },
            "updatedAt": datetime.now(timezone.utc).isoformat()
        },
        # Stats - English
        {
            "id": "stats_en",
            "section": "stats",
            "language": "en",
            "data": {
                "years": "15+",
                "temples": "750+",
                "ragas": "50+"
            },
            "updatedAt": datetime.now(timezone.utc).isoformat()
        },
        # Stats - Malayalam
        {
            "id": "stats_ml",
            "section": "stats",
            "language": "ml",
            "data": {
                "years": "15+",
                "temples": "750+",
                "ragas": "50+"
            },
            "updatedAt": datetime.now(timezone.utc).isoformat()
        }
    ]
    
    await db.portfolio_content.insert_many(portfolio_content)
    print(f"✅ Added {len(portfolio_content)} content items")
    
    # Seed site settings
    print("\n⚙️  Seeding Site Settings...")
    await db.site_settings.delete_many({})
    site_settings = {
        "heroText": "Preserving the Sacred Melodies of Kerala Temples",
        "whatsappNumber": "+919446909402",
        "backgroundMusic": {
            "enabled": False,
            "audioUrl": "",
            "volume": 0.3
        }
    }
    await db.site_settings.insert_one(site_settings)
    print("✅ Site settings configured")
    
    print("\n🎉 Complete database seeding successful!")
    print("\n📊 Collections seeded:")
    print("   • portfolio_content: ✅")
    print("   • site_settings: ✅")
    print("   • audio_tracks: ✅ (already seeded)")
    print("   • videos: ✅ (already seeded)")
    print("   • gallery: ✅ (already seeded)")
    print("   • testimonials: ✅ (already seeded)")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_complete())
