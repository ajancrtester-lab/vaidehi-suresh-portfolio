# Background Music Audio File

## To Add Your Real Performance Audio:

Since browsers cannot directly play YouTube/Instagram videos as audio in `<audio>` elements, you need to:

### Option 1: Upload Your Own Audio File
1. Download the audio from one of your Instagram reels or YouTube Shorts
   - You can use online tools to extract audio from YouTube videos
   - For Instagram, you might need to download the reel first

2. Convert to MP3 format if needed

3. Upload the audio file to: `/app/frontend/public/audio/`
   - Name it something like: `vaidehi-performance.mp3` or `sopana-intro.mp3`

4. Update `/app/frontend/src/components/BackgroundMusic.jsx`:
   - Change line 99 from:
     ```jsx
     <source src="/audio/idakka-intro.mp3" type="audio/mpeg" />
     ```
   - To:
     ```jsx
     <source src="/audio/vaidehi-performance.mp3" type="audio/mpeg" />
     ```

### Option 2: Use Admin Dashboard
You can also update this through the Admin panel:
1. Go to `/admin`
2. Navigate to Media → Audio Tracks
3. Add a special track with ID "background-music"
4. The system can be configured to use that as background audio

### Recommended Audio:
- From your YouTube Shorts: "Sindhooranuna Vighraham" (2.7K views)
- Or: "Seetha Kalyanam Vaibhogame" (1.9K views)
- Duration: First 30 seconds will auto-play

### Current Status:
- Background music component is active ✅
- Plays for 30 seconds on page load ✅
- Has mute/unmute controls ✅
- **Needs**: Actual audio file from your performance

The audio file should be:
- Format: MP3
- Duration: At least 30 seconds
- Quality: Good enough for web (128kbps is fine)
- Size: Keep under 1MB for fast loading
