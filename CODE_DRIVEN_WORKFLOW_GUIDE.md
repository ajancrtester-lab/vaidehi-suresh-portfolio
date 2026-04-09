# 📝 Code-Driven Content Management Guide

This guide shows you how to update your website content by editing code files and automatically syncing to production.

---

## 🎯 Quick Start

### Step 1: Edit Content

Open `/app/backend/portfolio_data.py` and edit any content:

```python
# Example: Update a video title
VIDEO_PERFORMANCES = [
    {
        "id": "video-real-1",
        "title": "NEW TITLE HERE",  # ← Edit this
        "venue": "YouTube Performance",
        ...
    }
]

# Example: Change Instagram link
SITE_SETTINGS = {
    ...
    "socialMedia": {
        "instagram": "https://www.instagram.com/NEW_USERNAME/",  # ← Edit this
        ...
    }
}
```

### Step 2: Sync to Database

Run the sync script:

```bash
cd /app/backend
python sync_to_database.py
```

### Step 3: Changes Go Live

✅ Northflank database is updated instantly  
✅ Netlify will show changes on next visit (or after clearing cache)

---

## 📂 File Structure

```
/app/backend/
├── portfolio_data.py          ← EDIT THIS FILE (all your content)
├── sync_to_database.py         ← RUN THIS to sync changes
├── seed_northflank.py          ← (Old seeding script)
└── seed_via_api.py            ← (Old seeding script)
```

---

## ✏️ What You Can Edit

### 1. Audio Tracks

```python
AUDIO_TRACKS = [
    {
        "id": "audio-yt-1",              # Don't change (unique ID)
        "title": "Song Title",           # ← Edit
        "raga": "Raga Name",             # ← Edit
        "duration": "3:02",              # ← Edit
        "temple": "Temple Name",         # ← Edit
        "audioUrl": "YouTube URL",       # ← Edit (YouTube link)
        "order": 1,                      # ← Edit (display order)
        "isActive": True                 # ← Edit (show/hide)
    }
]
```

### 2. Video Performances

```python
VIDEO_PERFORMANCES = [
    {
        "id": "video-real-1",            # Don't change
        "title": "Performance Title",    # ← Edit
        "venue": "Venue Name",           # ← Edit
        "date": "December 2024",         # ← Edit
        "thumbnail": "Thumbnail URL",    # ← Edit
        "videoUrl": "YouTube Embed URL", # ← Edit
        "order": 1,
        "isActive": True
    }
]
```

### 3. Gallery Items

```python
GALLERY = [
    {
        "id": "gallery-real-1",          # Don't change
        "thumbnail": "Image URL",        # ← Edit
        "linkType": "youtube",           # ← Edit (youtube/instagram-post/instagram-reel)
        "externalLink": "Full URL",      # ← Edit (YouTube/Instagram link)
        "title": "Performance Name",     # ← Edit
        "caption": "Description"         # ← Edit
    }
]
```

### 4. Site Settings

```python
SITE_SETTINGS = {
    "hero": {
        "mainTitle": "Vaidehi Suresh",           # ← Edit
        "subtitle": "Sopana Sangeetham Exponent", # ← Edit
        "tagline": "Your tagline here",          # ← Edit
    },
    "stats": {
        "yearsOfExperience": 13,    # ← Edit
        "templesPerformed": 750,     # ← Edit
    },
    "socialMedia": {
        "instagram": "Instagram URL",  # ← Edit
        "youtube": "YouTube URL",      # ← Edit
        "facebook": "Facebook URL"     # ← Edit
    },
    "contact": {
        "whatsapp": "919446909402",    # ← Edit
        "email": "your@email.com",     # ← Edit
    }
}
```

### 5. Bilingual Content

```python
PORTFOLIO_CONTENT = {
    "about": {
        "en": {
            "title": "English Title",   # ← Edit
            "quote": "English quote"    # ← Edit
        },
        "ml": {
            "title": "മലയാളം ശീർഷകം",  # ← Edit
            "quote": "മലയാളം ഉദ്ധരണി"    # ← Edit
        }
    }
}
```

---

## 🔄 Complete Workflow

### Workflow A: Edit → Sync → Live (Manual)

```bash
# 1. Edit the file
nano /app/backend/portfolio_data.py

# 2. Save changes (Ctrl+X, Y, Enter)

# 3. Sync to database
python /app/backend/sync_to_database.py

# 4. Push to Git (optional - for backup)
# Use Emergent "Save to Github" button

# 5. Done! Changes are live
```

### Workflow B: Git → Deploy → Auto-Sync (Automated)

**Setup once on Northflank:**

1. Go to Northflank dashboard
2. Your backend service → Settings
3. Under "Build & Deploy", add a post-deploy command:
   ```bash
   python /app/backend/sync_to_database.py
   ```
4. Save settings

**Then your workflow becomes:**

```bash
# 1. Edit portfolio_data.py locally
# 2. Commit and push to Git
git add backend/portfolio_data.py
git commit -m "Updated content"
git push

# 3. Northflank auto-deploys and runs sync script
# 4. Database is automatically updated!
```

---

## 🚀 Common Tasks

### Add a New YouTube Video

1. Open `portfolio_data.py`
2. Add to `VIDEO_PERFORMANCES`:

```python
{
    "id": "video-new-1",  # Create unique ID
    "title": "New Performance Title",
    "venue": "Venue Name",
    "date": "January 2025",
    "thumbnail": "https://i.ytimg.com/vi/VIDEO_ID/hqdefault.jpg",
    "videoUrl": "https://www.youtube.com/embed/VIDEO_ID",
    "order": 7,  # Next number in sequence
    "isActive": True
},
```

3. Run: `python sync_to_database.py`
4. Done! Video appears on site ✅

### Update Instagram Link

1. Edit `SITE_SETTINGS`:

```python
"socialMedia": {
    "instagram": "https://www.instagram.com/NEW_USERNAME/",
```

2. Run: `python sync_to_database.py`
3. Done! Link updated ✅

### Change Hero Text

1. Edit `SITE_SETTINGS`:

```python
"hero": {
    "mainTitle": "New Name",
    "subtitle": "New Subtitle",
```

2. Run: `python sync_to_database.py`
3. Done! Hero text updated ✅

### Update WhatsApp Number

1. Edit `SITE_SETTINGS`:

```python
"contact": {
    "whatsapp": "919876543210",  # New number
```

2. Run: `python sync_to_database.py`
3. Done! Booking WhatsApp updated ✅

---

## 🎯 Pro Tips

### Tip 1: Verify Before Syncing

Check your data is valid:
```bash
python -c "from portfolio_data import *; print('✅ Data file is valid!')"
```

### Tip 2: Backup Before Major Changes

```bash
cp portfolio_data.py portfolio_data.backup.py
```

### Tip 3: Test Locally First

```bash
# Set to local mode
export SYNC_TO=local
python sync_to_database.py

# Then sync to production
export SYNC_TO=northflank
python sync_to_database.py
```

### Tip 4: Batch Updates

Edit multiple sections at once, then run sync once. All changes apply together.

---

## ❓ FAQ

**Q: Do I need to restart Northflank after syncing?**  
A: No! The sync script updates the database directly. Changes are instant.

**Q: Do I need to redeploy Netlify?**  
A: No! Netlify fetches data from the database. Just refresh your browser (or clear cache if needed).

**Q: What if I make a mistake?**  
A: Just edit `portfolio_data.py` again and re-run `sync_to_database.py`. It will overwrite with the corrected data.

**Q: Can I add new items?**  
A: Yes! Just add a new entry with a unique `id` and run sync.

**Q: Can I delete items?**  
A: Yes! Remove the entry from `portfolio_data.py` and run sync. The item stays in database but won't be updated. To fully delete, use the Admin Panel or set `isActive: False`.

**Q: How do I get YouTube thumbnail URLs?**  
A: Replace `VIDEO_ID` in: `https://i.ytimg.com/vi/VIDEO_ID/hqdefault.jpg`

**Q: Can I use this from Northflank directly?**  
A: Yes! SSH into Northflank, edit the file, and run the sync script there.

---

## 🆘 Troubleshooting

### Issue: "ModuleNotFoundError: No module named 'portfolio_data'"

**Solution:**
```bash
cd /app/backend  # Make sure you're in the backend directory
python sync_to_database.py
```

### Issue: "Connection refused" or API errors

**Solution:** Check if Northflank backend is running:
```bash
curl https://p01--vaidehi-suresh-portfolio--xnwd42xkxs5d.code.run/api/health
```

### Issue: Changes not showing on Netlify

**Solution:** Clear browser cache (Ctrl+Shift+R) or wait a few minutes for CDN refresh.

---

## 🎉 Summary

| Action | Command |
|--------|---------|
| **Edit content** | Open `portfolio_data.py` |
| **Sync to database** | `python sync_to_database.py` |
| **Verify sync** | Check API endpoints |
| **Backup** | Copy `portfolio_data.py` |

**You now have full control over your content through code!** 🚀
