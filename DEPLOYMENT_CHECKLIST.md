# ✅ DEPLOYMENT CHECKLIST

## Before Deployment

### 1. MongoDB Atlas Setup
- [ ] Created free MongoDB Atlas account
- [ ] Created M0 free cluster
- [ ] Created database user with password
- [ ] Whitelisted all IPs (0.0.0.0/0)
- [ ] Copied connection string
- [ ] Tested connection string locally

### 2. GitHub Setup
- [ ] Created GitHub repository
- [ ] Pushed all code to GitHub
- [ ] Verified all files are pushed

### 3. Railway Backend Deployment
- [ ] Created Railway account
- [ ] Connected GitHub repository
- [ ] Added MONGO_URL environment variable
- [ ] Added DB_NAME environment variable
- [ ] Added ADMIN_PASSWORD environment variable
- [ ] Added ARTIST_WHATSAPP environment variable
- [ ] Generated Railway domain
- [ ] Tested backend health: `https://your-app.railway.app/api/health`
- [ ] Verified API responds: `https://your-app.railway.app/api/`

### 4. Netlify Frontend Deployment
- [ ] Created Netlify account
- [ ] Connected GitHub repository (or uploaded build folder)
- [ ] Added REACT_APP_BACKEND_URL environment variable
- [ ] Set build command: `yarn build`
- [ ] Set publish directory: `frontend/build`
- [ ] Verified build succeeded
- [ ] Custom domain configured (optional)

### 5. Final Configuration
- [ ] Added Netlify URL to Railway CORS_ORIGINS variable
- [ ] Tested website loads on Netlify URL
- [ ] Tested language toggle (EN ↔ Malayalam)
- [ ] Tested booking form WhatsApp link
- [ ] Tested admin login at `/admin`
- [ ] Ran seed scripts for initial data (optional)

### 6. Post-Deployment Testing
- [ ] Hero section translates correctly
- [ ] All sections load without errors
- [ ] Contact form works and generates WhatsApp link
- [ ] Admin dashboard accessible
- [ ] Media upload works in admin panel
- [ ] No CORS errors in browser console
- [ ] Backend stays alive (no 503 errors after 5 mins)

---

## Environment Variables Summary

### Railway (Backend)
```
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/portfolio_db?retryWrites=true&w=majority
DB_NAME=portfolio_db
ADMIN_PASSWORD=admin123
ARTIST_WHATSAPP=+919446909402
CORS_ORIGINS=https://your-netlify-site.netlify.app
```

### Netlify (Frontend)
```
REACT_APP_BACKEND_URL=https://your-railway-app.up.railway.app
```

---

## Quick Links

- Railway Dashboard: https://railway.app/dashboard
- Netlify Dashboard: https://app.netlify.com
- MongoDB Atlas: https://cloud.mongodb.com
- Your GitHub Repo: https://github.com/YOUR_USERNAME/YOUR_REPO

---

## Troubleshooting

### Backend Issues
- Check Railway deployment logs
- Verify environment variables are set
- Test health endpoint: `/api/health`

### Frontend Issues
- Clear Netlify cache and redeploy
- Check browser console for errors
- Verify REACT_APP_BACKEND_URL is correct

### Database Issues
- Verify MongoDB Atlas connection string
- Check IP whitelist includes 0.0.0.0/0
- Test connection locally first

---

## 🎉 Deployment Complete!

Once all items are checked, your website is live and free forever!

**Frontend**: https://your-site.netlify.app
**Backend**: https://your-app.railway.app
**Admin**: https://your-site.netlify.app/admin
