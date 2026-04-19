"""
Direct update of contact info to Northflank MongoDB
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

# Northflank MongoDB connection (you'll need to provide this)
NORTHFLANK_MONGO_URL = "mongodb+srv://..."  # Get this from Northflank dashboard
DB_NAME = "vaidehi_portfolio"

# Contact info from portfolio_data.py
CONTACT_INFO = {
    "whatsapp": "919447435548",
    "email": "vaidehisureshikm@gmail.com",
    "location": "Iranikkulam,Mala,Thrissur, Kerala"
}

async def update_northflank_contact():
    """Update contact info directly in Northflank MongoDB"""
    
    print("=" * 60)
    print("NORTHFLANK CONTACT INFO UPDATE")
    print("=" * 60)
    
    # Get MongoDB URL from user
    mongo_url = input("\nEnter your Northflank MONGO_URL: ").strip()
    
    if not mongo_url:
        print("❌ MongoDB URL is required!")
        return
    
    print(f"\n🔗 Connecting to Northflank MongoDB...")
    client = AsyncIOMotorClient(mongo_url)
    db = client[DB_NAME]
    
    try:
        # Test connection
        await client.admin.command('ping')
        print("✅ Connected successfully!")
        
        print(f"\n📞 Updating contact information:")
        print(f"   WhatsApp: {CONTACT_INFO['whatsapp']}")
        print(f"   Email: {CONTACT_INFO['email']}")
        print(f"   Location: {CONTACT_INFO['location']}")
        
        # Update site_settings
        result = await db.site_settings.update_one(
            {"id": "main_settings"},
            {"$set": {"contact": CONTACT_INFO}},
            upsert=True
        )
        
        if result.modified_count > 0 or result.upserted_id:
            print(f"\n✅ Contact information updated on Northflank!")
        else:
            print(f"\n⚠️  No changes made (data already matches)")
        
        # Verify
        settings = await db.site_settings.find_one({"id": "main_settings"}, {"_id": 0})
        if settings and "contact" in settings:
            print(f"\n✅ Verified - Current contact info in Northflank:")
            print(f"   WhatsApp: {settings['contact'].get('whatsapp')}")
            print(f"   Email: {settings['contact'].get('email')}")
            print(f"   Location: {settings['contact'].get('location')}")
        
        print(f"\n🎉 Update complete! Check your live site:")
        print(f"   https://vaidehisopanasangeethaartist.netlify.app")
        print(f"\n💡 Hard refresh (Ctrl+Shift+R) to see changes")
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(update_northflank_contact())
