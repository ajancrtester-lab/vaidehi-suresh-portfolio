#!/bin/bash

# 🚀 Deployment Preparation Script
# This script prepares your code for deployment to Railway + Netlify

echo "════════════════════════════════════════════════"
echo "🚀 Portfolio Deployment Preparation"
echo "════════════════════════════════════════════════"
echo ""

# Step 1: Check if git is initialized
echo "📦 Step 1: Checking Git repository..."
if [ ! -d ".git" ]; then
    echo "⚠️  Git not initialized. Initializing..."
    git init
    git add .
    git commit -m "Initial commit - Portfolio website ready for deployment"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Step 2: Check for uncommitted changes
echo ""
echo "📦 Step 2: Checking for uncommitted changes..."
if [[ -n $(git status -s) ]]; then
    echo "⚠️  You have uncommitted changes. Committing..."
    git add .
    git commit -m "Update: Ready for Railway + Netlify deployment"
    echo "✅ Changes committed"
else
    echo "✅ No uncommitted changes"
fi

# Step 3: Verify deployment files
echo ""
echo "📦 Step 3: Verifying deployment files..."
files=(
    "Procfile"
    "railway.json"
    "runtime.txt"
    ".env.example"
    "DEPLOYMENT.md"
    "START_HERE.md"
)

all_files_exist=true
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
        all_files_exist=false
    fi
done

if [ "$all_files_exist" = true ]; then
    echo "✅ All deployment files present"
else
    echo "⚠️  Some deployment files are missing"
fi

# Step 4: Check backend structure
echo ""
echo "📦 Step 4: Checking backend structure..."
if [ -f "backend/server.py" ] && [ -f "backend/requirements.txt" ]; then
    echo "✅ Backend files present"
else
    echo "❌ Backend files missing"
fi

# Step 5: Check frontend structure
echo ""
echo "📦 Step 5: Checking frontend structure..."
if [ -f "frontend/package.json" ] && [ -f "frontend/src/App.js" ]; then
    echo "✅ Frontend files present"
else
    echo "❌ Frontend files missing"
fi

echo ""
echo "════════════════════════════════════════════════"
echo "✅ PREPARATION COMPLETE!"
echo "════════════════════════════════════════════════"
echo ""
echo "📋 NEXT STEPS (Manual - You need to do these):"
echo ""
echo "1️⃣  CREATE GITHUB REPOSITORY"
echo "   → Go to: https://github.com/new"
echo "   → Name: vaidehi-suresh-portfolio (or your choice)"
echo "   → Create repository"
echo ""
echo "2️⃣  PUSH CODE TO GITHUB"
echo "   Run these commands:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3️⃣  SETUP MONGODB ATLAS (5 min)"
echo "   → Visit: https://www.mongodb.com/cloud/atlas/register"
echo "   → Follow instructions in DEPLOYMENT.md Part 1"
echo ""
echo "4️⃣  DEPLOY BACKEND TO RAILWAY (10 min)"
echo "   → Visit: https://railway.app"
echo "   → Follow instructions in DEPLOYMENT.md Part 2"
echo ""
echo "5️⃣  DEPLOY FRONTEND TO NETLIFY (10 min)"
echo "   → Visit: https://netlify.com"
echo "   → Follow instructions in DEPLOYMENT.md Part 3"
echo ""
echo "📖 For detailed step-by-step guide, read:"
echo "   → START_HERE.md"
echo "   → DEPLOYMENT.md"
echo ""
echo "════════════════════════════════════════════════"
