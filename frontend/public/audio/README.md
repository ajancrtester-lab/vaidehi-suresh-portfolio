# Background Music - Idakka Instrument Audio

## Overview
The website plays authentic Idakka (traditional Kerala percussion instrument) background music for 30 seconds on page load.

## Audio File Setup

### Required File
Place an Idakka instrument audio file at:
```
/app/frontend/public/audio/idakka-intro.mp3
```

### Recommended Audio Specifications
- **Format**: MP3 (recommended for browser compatibility)
- **Duration**: 30-35 seconds
- **Quality**: 128-192 kbps (balance between quality and file size)
- **Volume**: Pre-normalized to avoid sudden loudness
- **Type**: Traditional Kerala Idakka instrument sound/rhythm

### Where to Find Authentic Idakka Audio

1. **YouTube Audio Library** (Free, Copyright-free)
   - Search: "Idakka instrument", "Kerala percussion", "Temple music percussion"

2. **Freesound.org** (Creative Commons)
   - Search: "Idakka", "Indian percussion", "Kerala drums"

3. **Free Music Archive**
   - World Music > Indian Classical

4. **Record Your Own**
   - Hire a local Idakka artist
   - Record at a Kerala temple with permission

5. **Purchase from Stock Audio Sites**
   - AudioJungle
   - Pond5
   - Epidemic Sound

### Alternative Setup (If No Audio Available)

If you don't have an Idakka audio file yet, the component will:
- Gracefully fail (no errors)
- Not show the music controls
- Website will function normally

### Testing the Audio

1. Add your MP3 file to `/app/frontend/public/audio/idakka-intro.mp3`
2. Reload the website
3. Audio should autoplay at 30% volume
4. Should fade out and stop after 30 seconds
5. Mute/unmute button appears in bottom-right corner

### Features

- **Auto-play**: Starts automatically on page load (if browser allows)
- **30-second duration**: Plays for 30 seconds with 3-second fade-out
- **Volume control**: Mute/unmute button with visual feedback
- **Sound wave animation**: Visual indicator when playing
- **Smooth fade-out**: Gradual volume decrease before stopping
- **Browser compatibility**: Handles autoplay restrictions gracefully

### Troubleshooting

**Audio not playing?**
- Check browser console for errors
- Verify file exists at correct path
- Try a different browser (some block autoplay)
- Check file format (MP3 is most compatible)

**Audio too loud/quiet?**
- Adjust initial volume in `BackgroundMusic.jsx` (line 17)
- Pre-normalize audio file before uploading

**Want different duration?**
- Edit timeout value in `BackgroundMusic.jsx` (line 23)
- Current: 27000ms = 27 seconds (starts fade-out at 27s)

---

## Component Location
`/app/frontend/src/components/BackgroundMusic.jsx`
