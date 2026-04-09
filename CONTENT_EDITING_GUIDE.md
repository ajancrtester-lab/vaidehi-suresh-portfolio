# 📘 Complete Content Management Guide

## 🎯 Two Ways to Update Content

Your website content is split into **two types**:

### 1. **Media Content** (Videos, Audio, Gallery, Links)
- **File**: `/app/backend/portfolio_data.py`
- **Sync**: Run `python sync_to_database.py`
- **Goes Live**: Immediately on Northflank → Shows on Netlify within minutes

### 2. **Text Content** (About, Services, Achievements, Training)
- **File**: `/app/frontend/src/content/bilingual.js`
- **Sync**: Push to Git ("Save to Github" button)
- **Goes Live**: After Netlify rebuilds (2-3 minutes)

---

## 📝 Common Editing Tasks

### ✅ Task 1: Add a New YouTube Video

**File**: `/app/backend/portfolio_data.py`

**Steps:**
1. Open the file
2. Find `VIDEO_PERFORMANCES = [`
3. Add your new video:

```python
{
    "id": "video-new-7",  # Create unique ID
    "title": "Your Performance Title",
    "venue": "Temple/Venue Name",
    "date": "January 2025",
    "thumbnail": "https://i.ytimg.com/vi/YOUR_VIDEO_ID/hqdefault.jpg",
    "videoUrl": "https://www.youtube.com/embed/YOUR_VIDEO_ID",
    "order": 7,  # Next number in sequence
    "isActive": True
},
```

4. Save the file
5. Run sync:
```bash
cd /app/backend
python sync_to_database.py
```

6. **Done!** Video appears on your Netlify site within minutes ✅

**💡 Tip**: To get YouTube video ID from URL:
- `https://www.youtube.com/watch?v=ABC123` → Video ID is `ABC123`
- Thumbnail: `https://i.ytimg.com/vi/ABC123/hqdefault.jpg`
- Embed: `https://www.youtube.com/embed/ABC123`

---

### ✅ Task 2: Update Instagram Link

**File**: `/app/backend/portfolio_data.py`

**Steps:**
1. Find `SITE_SETTINGS = {`
2. Update the Instagram URL:

```python
"socialMedia": {
    "instagram": "https://www.instagram.com/YOUR_NEW_USERNAME/",
    "youtube": "https://www.youtube.com/@sureshnairiranikulam3072",
    "facebook": "https://www.facebook.com/vaidehi.suresh"
},
```

3. **Note**: This updates `portfolio_data.py` but Instagram link in `bilingual.js` won't change
4. For full consistency, also update `/app/frontend/src/content/bilingual.js` (search for "instagram")
5. Run sync + Push to Git

---

### ✅ Task 3: Change WhatsApp Number

**File**: `/app/backend/portfolio_data.py`

**Steps:**
1. Find `SITE_SETTINGS = {`
2. Update:

```python
"contact": {
    "whatsapp": "919876543210",  # New number (include country code)
    "email": "your@email.com",
    "location": "Your Location"
},
```

3. Run sync:
```bash
cd /app/backend
python sync_to_database.py
```

---

### ✅ Task 4: Update About Section Text

**File**: `/app/frontend/src/content/bilingual.js`

**Steps:**
1. Open `/app/frontend/src/content/bilingual.js`
2. Find the `about` section (around line 55):

**English:**
```javascript
about: {
  title: "The Journey",  // ← Edit this
  subtitle: "A Life Devoted to Sacred Music",  // ← Edit this
  quote: "Music is my prayer..."  // ← Edit this
},
```

**Malayalam** (around line 279):
```javascript
about: {
  title: "യാത്ര",  // ← Edit this
  subtitle: "പവിത്ര സംഗീതത്തിനായി...",  // ← Edit this
  quote: "സംഗീതം എന്റെ..."  // ← Edit this
},
```

3. Save the file
4. Click **"Save to Github"** button in Emergent chat
5. Netlify will rebuild (2-3 minutes)
6. **Done!** New text appears on your site ✅

---

### ✅ Task 5: Update Service Descriptions

**File**: `/app/frontend/src/content/bilingual.js`

**Steps:**
1. Find `services:` section (around line 185 for English, 408 for Malayalam)
2. Edit any service:

```javascript
{
  title: "Temple Ceremonies & Festivals",  // ← Edit title
  description: "Authentic Sopana Sangeetham...",  // ← Edit description
  keywords: "Temple music, Kerala festivals..."  // ← Edit keywords
},
```

3. Save → Click "Save to Github" → Wait for Netlify rebuild

---

### ✅ Task 6: Add a New Audio Track

**File**: `/app/backend/portfolio_data.py`

**Steps:**
1. Find `AUDIO_TRACKS = [`
2. Add:

```python
{
    "id": "audio-yt-5",  # Unique ID
    "title": "New Song Title",
    "raga": "Raga Name",
    "duration": "4:30",
    "temple": "Temple Name",
    "audioUrl": "https://www.youtube.com/watch?v=VIDEO_ID",
    "order": 5,
    "isActive": True
},
```

3. Run sync:
```bash
cd /app/backend
python sync_to_database.py
```

---

### ✅ Task 7: Update Gallery Item

**File**: `/app/backend/portfolio_data.py`

**Steps:**
1. Find `GALLERY = [`
2. Edit any item:

```python
{
    "id": "gallery-real-1",  # Don't change ID
    "thumbnail": "NEW_IMAGE_URL",  // ← Change thumbnail
    "linkType": "youtube",  # youtube/instagram-post/instagram-reel
    "externalLink": "NEW_LINK",  // ← Change link
    "title": "NEW TITLE",  // ← Change title
    "caption": "NEW CAPTION"  // ← Change caption
},
```

3. Run sync

---

### ✅ Task 8: Update Years of Experience

**File**: `/app/backend/portfolio_data.py`

**Steps:**
1. Find `SITE_SETTINGS = {`
2. Update:

```python
"stats": {
    "yearsOfExperience": 14,  // ← Change number
    "templesPerformed": 800,  // ← Change number
    "studentsTrained": 120,
    "awardsReceived": 15
},
```

3. Run sync

---

### ✅ Task 9: Change Guru/Teacher Information

**File**: `/app/frontend/src/content/bilingual.js`

**Steps:**
1. Find `training:` → `gurus:` section (around line 122 for EN, 345 for ML)
2. Edit any guru:

```javascript
{
  name: "Teacher Name",  // ← Edit
  title: "Teaching Subject",  // ← Edit
  description: "Description of training...",  // ← Edit
  specialization: "Area of expertise"  // ← Edit
},
```

3. Save → "Save to Github" → Wait for rebuild

---

## 🔄 Complete Workflow Summary

### For Media (Videos, Audio, Gallery, Links):

```bash
1. Edit /app/backend/portfolio_data.py
2. Save file
3. Run: cd /app/backend && python sync_to_database.py
4. Done! ✅ (Live on Northflank immediately → Netlify shows it within minutes)
```

### For Text (About, Services, Achievements, Training):

```bash
1. Edit /app/frontend/src/content/bilingual.js
2. Save file
3. Click "Save to Github" button in Emergent chat
4. Wait 2-3 minutes for Netlify rebuild
5. Done! ✅
```

---

## ⚙️ Advanced: Batch Updates

**Update Multiple Items at Once:**

1. Edit `portfolio_data.py`:
   - Change 3 video titles
   - Add 2 new audio tracks
   - Update Instagram link
   - Change WhatsApp number

2. Run sync **once**:
```bash
python sync_to_database.py
```

3. **All changes** sync together! ✅

---

## 🐛 Troubleshooting

### Issue: Changes not showing on Netlify

**Solution 1**: Clear browser cache
```
Windows/Linux: Ctrl + Shift + R
Mac: Cmd + Shift + R
```

**Solution 2**: Wait 5-10 minutes (CDN cache refresh)

**Solution 3**: Check Netlify deployment
- Go to https://app.netlify.com/sites/vaidehisopanasangeethaartist/deploys
- Verify latest deployment is "Published"
- Check if it's the latest Git commit

---

### Issue: Sync script shows errors

**Solution**: Check the error message
- If "Connection refused": Northflank backend might be down
- If "Module not found": Make sure you're in `/app/backend` directory
- If "Invalid syntax": Check your Python syntax in `portfolio_data.py`

**Test if backend is running:**
```bash
curl https://p01--vaidehi-suresh-portfolio--xnwd42xkxs5d.code.run/api/admin/audio-tracks
```

---

### Issue: Bilingual text not updating

**Reason**: Bilingual text is in `bilingual.js`, not `portfolio_data.py`

**Solution**:
1. Edit `/app/frontend/src/content/bilingual.js`
2. Click "Save to Github"
3. Wait for Netlify rebuild

---

## 📊 Quick Reference

| What to Update | File | Sync Method |
|----------------|------|-------------|
| YouTube Videos | `portfolio_data.py` | Run sync script |
| Audio Tracks | `portfolio_data.py` | Run sync script |
| Gallery Images | `portfolio_data.py` | Run sync script |
| Instagram Link | `portfolio_data.py` + `bilingual.js` | Sync + Git push |
| WhatsApp Number | `portfolio_data.py` | Run sync script |
| About Text (EN/ML) | `bilingual.js` | Git push only |
| Services (EN/ML) | `bilingual.js` | Git push only |
| Achievements (EN/ML) | `bilingual.js` | Git push only |
| Gurus Info (EN/ML) | `bilingual.js` | Git push only |
| Stats (years, temples) | `portfolio_data.py` | Run sync script |

---

## 💡 Pro Tips

### Tip 1: Always Backup Before Major Changes
```bash
cp /app/backend/portfolio_data.py /app/backend/portfolio_data.backup.py
cp /app/frontend/src/content/bilingual.js /app/frontend/src/content/bilingual.backup.js
```

### Tip 2: Test Sync Script Before Making Changes
```bash
python -c "from portfolio_data import *; print('✅ Syntax is valid!')"
```

### Tip 3: Verify Changes on Northflank
```bash
# Check audio tracks
curl https://p01--vaidehi-suresh-portfolio--xnwd42xkxs5d.code.run/api/admin/audio-tracks

# Check videos
curl https://p01--vaidehi-suresh-portfolio--xnwd42xkxs5d.code.run/api/admin/video-performances
```

### Tip 4: Keep IDs Unique
- Every `id` must be unique
- Format: `video-real-1`, `audio-yt-5`, `gallery-real-10`
- Never reuse deleted IDs

---

## 🎉 You're All Set!

You now have:
- ✅ Complete control over all media content via `portfolio_data.py`
- ✅ Complete control over all text content via `bilingual.js`
- ✅ Simple sync workflow
- ✅ Immediate updates on your live site

**Happy editing!** 🚀
