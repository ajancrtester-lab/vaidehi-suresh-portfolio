# 🚀 Quick Deployment Guide

## STEP 1: Save to GitHub ⚡
1. **Click "Save to Github" button** in Emergent chat interface
2. Wait for confirmation
3. This triggers automatic deployments on Northflank + Netlify

## STEP 2: Wait for Deployments (3-5 mins) ⏱️
- **Northflank:** Check deployment status in dashboard
- **Netlify:** Check build status in dashboard

## STEP 3: Test Backend Routes 🧪
```bash
curl https://your-backend.northflank.app/api/performance-gallery
```
✅ Expected: `[]` (empty array)  
❌ If 404: Wait longer or check deployment logs

## STEP 4: Seed Database 🌱
```bash
cd /app
python seed_northflank_database.py
```

You'll need:
- **Northflank MONGO_URL** (from Northflank Dashboard → MongoDB Addon → Connection Details)
- **DB_NAME** (usually `portfolio_db`)

## STEP 5: Verify Live Site ✅
Visit your Netlify site → Performance Gallery should show 5 images in 3D carousel

---

## Full Details
See `/app/DEPLOYMENT_CHECKLIST.md` for complete troubleshooting guide.
