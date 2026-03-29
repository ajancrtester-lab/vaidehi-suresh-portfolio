#!/bin/bash
# Railway startup script

echo "🚀 Starting Vaidehi Suresh Portfolio Backend..."

# Navigate to backend directory
cd /app/backend || cd backend

# Install dependencies
echo "📦 Installing dependencies..."
pip install -r requirements.txt

# Start uvicorn server
echo "🎯 Starting FastAPI server..."
uvicorn server:app --host 0.0.0.0 --port ${PORT:-8001}
