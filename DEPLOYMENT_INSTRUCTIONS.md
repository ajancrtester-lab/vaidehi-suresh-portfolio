# 🚀 DEPLOYMENT GUIDE - Performance Gallery

## ✅ STEP 1: Push Code to GitHub

**ACTION REQUIRED FROM YOU:**

1. **Look at your Emergent chat interface** (where you're typing messages to me)
2. **Find the "Save to Github" button**
   - Usually located near the message input box
   - May be in the top menu bar
   - Or in settings/options menu
3. **Click "Save to Github"**
4. **Wait for confirmation** (usually 10-30 seconds)

**What this does:**
- Commits all your local code changes
- Pushes to your GitHub repository
- Triggers automatic deployments on Northflank and Netlify

---

## ⏳ STEP 2: Wait for Deployments

### Northflank Backend (3-5 minutes)
1. Login to [Northflank Dashboard](https://app.northflank.com)
2. Go to your `vaidehi-suresh-portfolio` service
3. Check the deployment status
4. Wait for "✅ Deployment Successful"

### Netlify Frontend (1-2 minutes)
1. Login to [Netlify Dashboard](https://app.netlify.com)
2. Go to your site
3. Click "Deploys" tab
4. Wait for "✅ Published"

**IMPORTANT:** Northflank may require manual deployment trigger since auto-deploy was disabled!

If Northflank doesn't auto-deploy:
- Click "Rebuild" or "Deploy" button in Northflank dashboard
- Select "main" branch
- Wait for deployment to complete

---

## 🧪 STEP 3: Verify Backend Routes Are Live

Once Northflank deployment is complete, test the API:

```bash
curl https://p01-vaidehi-suresh-portfolio--wmu42ekx5d.code.run/api/performance-gallery
```

**Expected Result:**
```json
{"images": []}
```
(Empty array = routes exist but no data yet)

**If you get 404 error:**
- Northflank hasn't deployed the new code yet
- Check deployment logs in Northflank dashboard
- Wait a bit longer or manually trigger deployment

---

## 🗄️ STEP 4: Seed Production Database

**You'll need:**
1. Your **production MONGO_URL** (from Northflank MongoDB addon)
2. Your **DB_NAME** (usually `portfolio_db`)

**How to get MongoDB credentials:**

### Option A: From Northflank Dashboard
1. Go to Northflank Dashboard
2. Click "Addons" or "Services"
3. Click your MongoDB instance
4. Find "Connection Details" or "Environment Variables"
5. Copy the MONGO_URL (looks like: `mongodb+srv://user:pass@...`)

### Option B: From Your Backend .env (if synced)
Your production backend should have the MONGO_URL in environment variables.

**Once you have the credentials, I'll run the seed script for you!**

---

## ✅ STEP 5: Test Live Website

After seeding, visit:
```
https://your-site.netlify.app
```

1. Scroll down to find the Performance Gallery section
2. You should see the 3D carousel with 5 sample images
3. Try clicking/dragging the carousel

---

## 📸 STEP 6: Test Admin Panel Upload

1. Go to: `https://your-site.netlify.app/admin`
2. Login: `admin123`
3. Click "Performance Gallery" tab
4. Upload your real performance photos!

---

## 🆘 Troubleshooting

### ❌ Backend returns 404
**Solution:** Northflank hasn't deployed yet
- Check Northflank dashboard deployment status
- Manually trigger rebuild if needed

### ❌ Frontend shows old version
**Solution:** Clear browser cache or hard refresh (Ctrl + Shift + R)

### ❌ Database seeding fails
**Solution:** Double-check MONGO_URL format and credentials

---

## 📞 Next Steps After Step 1

**Once you click "Save to Github" and it's confirmed:**
1. Tell me: **"Pushed to GitHub"**
2. I'll help you check deployment status
3. Then we'll seed the database together

---

**👉 GO AHEAD NOW: Click "Save to Github" in your Emergent interface!**

When done, reply with: **"done"** or **"pushed"**
