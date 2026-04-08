/**
 * Utility functions for media URL processing
 */

/**
 * Extract YouTube video ID from various URL formats
 * Supports: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID
 */
export const extractYouTubeId = (url) => {
  if (!url) return null;
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return null;
};

/**
 * Get YouTube thumbnail URL from video URL
 * Returns highest quality thumbnail available
 */
export const getYouTubeThumbnail = (url) => {
  const videoId = extractYouTubeId(url);
  if (!videoId) return null;
  
  // Try maxresdefault (1920x1080) first, fallback to hqdefault (480x360)
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

/**
 * Get YouTube embed URL from video URL
 */
export const getYouTubeEmbedUrl = (url) => {
  const videoId = extractYouTubeId(url);
  if (!videoId) return url;
  return `https://www.youtube.com/embed/${videoId}`;
};

/**
 * Extract Instagram post/reel ID from URL
 */
export const extractInstagramId = (url) => {
  if (!url) return null;
  
  const patterns = [
    /instagram\.com\/(?:p|reel)\/([a-zA-Z0-9_-]+)/,
    /instagram\.com\/reels\/([a-zA-Z0-9_-]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return null;
};

/**
 * Get Instagram embed URL
 */
export const getInstagramEmbedUrl = (url) => {
  const postId = extractInstagramId(url);
  if (!postId) return null;
  return `https://www.instagram.com/p/${postId}/embed`;
};

/**
 * Detect media type from URL
 */
export const detectMediaType = (url) => {
  if (!url) return 'unknown';
  
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'youtube';
  }
  
  if (url.includes('instagram.com')) {
    if (url.includes('/reel')) return 'instagram-reel';
    return 'instagram-post';
  }
  
  return 'unknown';
};
