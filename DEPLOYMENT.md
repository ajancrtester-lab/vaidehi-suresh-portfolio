# 🚀 DEPLOYMENT GUIDE - Railway + Netlify

## 📋 Prerequisites
- GitHub account
- Railway account (free): https://railway.app
- Netlify account (free): https://www.netlify.com
- MongoDB Atlas account (free): https://www.mongodb.com/cloud/atlas

---

## Part 1: MongoDB Atlas Setup (5 minutes)

### Step 1: Create MongoDB Cluster
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for free account
3. Create a **FREE** M0 cluster (512MB storage)
4. Choose **AWS** as provider and nearest region
5. Click "Create Cluster"

### Step 2: Create Database User
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `admin` (or your choice)
5. Password: Generate a strong password (SAVE THIS!)
6. User Privileges: Select "Atlas admin"
7. Click "Add User"

### Step 3: Whitelist All IPs
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### Step 4: Get Connection String
1. Go to "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string (looks like: `mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/`)
5. Replace `<password>` with your actual password
6. Add database name at the end: `mongodb+srv://admin:yourpassword@cluster0.xxxxx.mongodb.net/portfolio_db?retryWrites=true&w=majority`

**SAVE THIS CONNECTION STRING** - You'll need it for Railway!

---

## Part 2: Backend Deployment to Railway (10 minutes)

### Step 1: Push Code to GitHub
```bash
# If you haven't already, initialize git in your project
cd /app
git init
git add .
git commit -m "Initial commit - Portfolio website"

# Create a new repository on GitHub (https://github.com/new)
# Then push your code:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Railway
1. Go to https://railway.app
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Authorize Railway to access your GitHub
5. Select your repository
6. Railway will auto-detect and deploy your FastAPI app

### Step 3: Set Environment Variables in Railway
1. Click on your deployed service
2. Go to "Variables" tab
3. Add these environment variables (click "New Variable" for each):

```
MONGO_URL=mongodb+srv://admin:yourpassword@cluster0.xxxxx.mongodb.net/portfolio_db?retryWrites=true&w=majority
DB_NAME=portfolio_db
ADMIN_PASSWORD=admin123
ARTIST_WHATSAPP=+919446909402
```

4. Click "Deploy" to restart with new variables

### Step 4: Get Your Railway Backend URL
1. Go to "Settings" tab in Railway
2. Scroll down to "Domains"
3. Click "Generate Domain"
4. Copy the URL (will be like: `https://your-app-name.up.railway.app`)

**SAVE THIS URL** - You'll need it for Netlify!

### Step 5: Verify Backend is Running
Open your Railway URL in browser:
- Visit: `https://your-app-name.up.railway.app/api/`
- You should see: `{"message": "Hello World"}`

---

## Part 3: Frontend Deployment to Netlify (10 minutes)

### Step 1: Build Frontend with Railway Backend URL
1. Update `/app/frontend/.env`:
```
REACT_APP_BACKEND_URL=https://your-railway-app.up.railway.app
```

2. Build the frontend:
```bash
cd /app/frontend
yarn build
```

### Step 2: Deploy to Netlify

#### Option A: Drag & Drop (Easiest)
1. Go to https://app.netlify.com
2. Drag the `/app/frontend/build` folder to "Want to deploy a new site without connecting to Git?"
3. Done! Your site is live.

#### Option B: GitHub Auto-Deploy (Recommended)
1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" and authorize
4. Select your repository
5. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `yarn build`
   - **Publish directory**: `frontend/build`
6. Click "Advanced build settings" → "New variable"
7. Add: `REACT_APP_BACKEND_URL` = `https://your-railway-app.up.railway.app`
8. Click "Deploy site"

### Step 3: Get Your Netlify URL
- Netlify will give you a URL like: `https://random-name-12345.netlify.app`
- You can customize it in "Site settings" → "Change site name"

---

## Part 4: Final Configuration (5 minutes)

### Update CORS in Backend
1. Go back to Railway
2. Add one more environment variable:
```
CORS_ORIGINS=https://your-netlify-site.netlify.app
```
3. Redeploy

### Test Everything
1. Visit your Netlify site
2. Toggle language (EN ↔ Malayalam) - should work ✅
3. Try booking form - WhatsApp link should work ✅
4. Go to `/admin` - login with your ADMIN_PASSWORD ✅
5. Try uploading media in admin panel ✅

---

## Part 5: Seed Initial Data (5 minutes)

### Run Seed Scripts (One-time only)
You need to run these scripts once to populate initial data:

1. **From your local machine**, update backend/.env with Railway MongoDB URL
2. Run seed scripts:
```bash
cd /app/backend
python seed_site_settings.py
python update_real_content.py
```

Alternatively, manually add content via Admin Dashboard (`/admin`).

---

## 🎉 You're Done!

### Your Live URLs:
- **Frontend (Netlify)**: https://your-site.netlify.app
- **Backend (Railway)**: https://your-app.railway.app
- **Admin Panel**: https://your-site.netlify.app/admin
- **MongoDB**: Hosted on Atlas (free forever)

### Cost Breakdown:
- Railway Backend: **FREE** (500 hrs/month)
- Netlify Frontend: **FREE** (100GB bandwidth/month)
- MongoDB Atlas: **FREE** (512MB storage)
- **Total: $0/month** 🎊

---

## 🔧 Troubleshooting

### Backend not starting on Railway?
- Check "Deployments" tab for error logs
- Verify all environment variables are set correctly
- Make sure MONGO_URL is correct

### Frontend can't connect to backend?
- Check browser console for CORS errors
- Verify REACT_APP_BACKEND_URL in Netlify environment variables
- Make sure Railway backend is running

### MongoDB connection error?
- Check your IP is whitelisted (0.0.0.0/0)
- Verify MONGO_URL format is correct
- Make sure database user password doesn't have special characters (or URL-encode them)

### Admin panel not loading?
- Clear browser cache
- Check if `/admin` route exists in React Router
- Verify ADMIN_PASSWORD environment variable in Railway

---

## 📞 Support

If you face issues:
1. Check Railway deployment logs
2. Check browser console (F12)
3. Check Netlify build logs
4. Verify all environment variables match

---

## 🔄 Future Updates

To update your site:

**Backend changes:**
```bash
git add .
git commit -m "Update backend"
git push
```
Railway will auto-deploy!

**Frontend changes:**
```bash
git add .
git commit -m "Update frontend"
git push
```
Netlify will auto-deploy!

---

**Enjoy your free, always-on portfolio website! 🚀**
