# 🚀 Northflank Database Seeding Instructions

This guide will help you populate your Northflank MongoDB database with all the data from your Emergent environment.

## 📋 Prerequisites

Make sure your Northflank backend has these environment variables set:
- `MONGO_URL` - Your MongoDB connection string
- `DB_NAME` - Your database name (usually `vaidehi_portfolio`)

---

## 🎯 Option A: Run Seed Script on Northflank (Recommended)

### Step 1: Upload the seed script to your Northflank project

1. Go to your Northflank dashboard
2. Navigate to your backend service
3. Either:
   - **If using Git deployment:** Push the `/backend/seed_northflank.py` file to your repository
   - **If using direct upload:** Use Northflank's file manager to upload the script

### Step 2: Run the seed script

**Via Northflank Shell:**
1. Go to your Northflank dashboard
2. Click on your backend service
3. Go to **"Shell"** or **"Terminal"** tab
4. Run the following command:

```bash
cd /app/backend  # or wherever your backend code is
python seed_northflank.py
```

**Or via Job:**
1. Create a new **Job** in Northflank
2. Use the same environment as your backend
3. Set the run command to: `python /app/backend/seed_northflank.py`
4. Run the job once

---

## 🎯 Option B: Seed via API Calls (Alternative)

If you can't run Python scripts directly on Northflank, you can populate the database by making API calls from your local machine or Emergent:

### Prerequisites:
- Your Northflank backend URL: `https://p01--vaidehi-suresh-portfolio--xnwd42xkxs5d.code.run`
- Admin password (default: `admin123`)

### Run this script from Emergent:

```bash
# Set your Northflank backend URL
BACKEND_URL="https://p01--vaidehi-suresh-portfolio--xnwd42xkxs5d.code.run"

# The seed script will use the admin endpoints to populate data
python /app/backend/seed_via_api.py
```

I can create this script for you if needed!

---

## 🎯 Option C: Quick Manual Verification

After seeding, verify the data by checking these endpoints:

```bash
# Replace with your Northflank URL
BACKEND_URL="https://p01--vaidehi-suresh-portfolio--xnwd42xkxs5d.code.run"

# Check audio tracks
curl "$BACKEND_URL/api/admin/audio-tracks"

# Check videos
curl "$BACKEND_URL/api/admin/video-performances"

# Check gallery
curl "$BACKEND_URL/api/admin/gallery"

# Check site settings
curl "$BACKEND_URL/api/site-settings"
```

Each should return populated data (not empty arrays).

---

## ✅ Expected Output

When you run the seed script successfully, you should see:

```
🚀 Starting database seeding...
✅ Connected to MongoDB

📀 Seeding audio tracks...
✅ Inserted 4 audio tracks

🎥 Seeding video performances...
✅ Inserted 6 video performances

🖼️  Seeding gallery...
✅ Inserted 10 gallery items

⚙️  Seeding site settings...
✅ Inserted site settings

📝 Seeding portfolio content...
✅ Inserted portfolio content

==================================================
🎉 Database seeding completed successfully!
==================================================

📊 Summary:
   • Audio Tracks: 4
   • Video Performances: 6
   • Gallery Items: 10
   • Site Settings: 1
   • Portfolio Content: 1

✅ Your Northflank backend is now ready!
```

---

## 🔄 After Seeding

Once the data is seeded:

1. **Test your Northflank backend:**
   ```bash
   curl https://p01--vaidehi-suresh-portfolio--xnwd42xkxs5d.code.run/api/admin/audio-tracks
   ```
   
2. **Trigger a Netlify redeploy** (no changes needed):
   - Go to Netlify Dashboard
   - Click **"Trigger deploy"** → **"Clear cache and deploy site"**
   
3. **Check your live site:**
   - Visit: https://vaidehisopanasangeethaartist.netlify.app/
   - You should now see:
     - ✅ Sacred Melodies (Audio section)
     - ✅ Performances (Video section)
     - ✅ Gallery section
     - ✅ All data displaying correctly!

---

## 🆘 Troubleshooting

### Issue: "Connection refused" or "Cannot connect to MongoDB"
**Solution:** Check your `MONGO_URL` environment variable in Northflank settings.

### Issue: "Module 'motor' not found"
**Solution:** Make sure `motor` is in your `requirements.txt` and installed on Northflank.

### Issue: Script runs but website still shows empty sections
**Solution:** 
1. Verify data was actually inserted by checking the API endpoints
2. Clear your browser cache (Ctrl+Shift+R)
3. Trigger a new Netlify deployment

---

## 📞 Need Help?

If you're having trouble running the seed script on Northflank, let me know and I can:
1. Create an API-based seeding script that you can run from anywhere
2. Help you debug connection issues
3. Create a different seeding approach

---

**Current Status:**
- ✅ Seed script created: `/app/backend/seed_northflank.py`
- ⏳ Waiting for you to run it on Northflank
- ⏳ After running, your Netlify site will show all data correctly!
