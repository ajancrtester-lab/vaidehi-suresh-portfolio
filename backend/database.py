"""
Database connection and configuration
"""
from motor.motor_asyncio import AsyncIOMotorClient
import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# ✅ Get environment variables safely
mongo_url = os.getenv("MONGO_URL")
db_name = os.getenv("DB_NAME")

# ✅ Proper error handling
if not mongo_url:
    raise ValueError("❌ MONGO_URL is not set in environment variables")

if not db_name:
    raise ValueError("❌ DB_NAME is not set in environment variables")

# ✅ Create client
client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

def get_database():
    return db

async def close_db_connection():
    client.close()
