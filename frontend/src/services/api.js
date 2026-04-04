/**
 * API Service - Centralized API calls
 * Replaces all mock.js usage with real backend API calls
 */

const API_URL = process.env.REACT_APP_BACKEND_URL || '';

// Helper function with error handling and cache disabling
const fetchWithErrorHandling = async (endpoint, errorMessage) => {
  try {
    const url = API_URL ? `${API_URL}${endpoint}` : endpoint;
    const response = await fetch(url, {
      cache: 'no-store', // 🔥 Disable cache to always get fresh data
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${errorMessage}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`${errorMessage}:`, error);
    throw error;
  }
};

// Artist Info
export const fetchArtistInfo = async () => {
  try {
    const data = await fetchWithErrorHandling('/api/artist-info', 'Failed to fetch artist info');
    return data.artistInfo;
  } catch (error) {
    // Return fallback data instead of throwing
    return {
      name: 'Vaidehi Suresh',
      tagline: 'Sopana Sangeetham Artist',
      yearsOfExperience: 13,
      templesPerformed: 750,
      contactInfo: {
        whatsapp: '+919446909402',
        email: 'vaidehisureshikm@gmail.com',
        location: 'Iranikkulam,Thrissur, Kerala'
      }
    };
  }
};

// Audio Tracks
export const fetchAudioTracks = async () => {
  try {
    const data = await fetchWithErrorHandling('/api/admin/audio-tracks', 'Failed to fetch audio tracks');
    return data.audioTracks || [];
  } catch (error) {
    return []; // Return empty array on error
  }
};

// Video Performances
export const fetchVideoPerformances = async () => {
  try {
    const data = await fetchWithErrorHandling('/api/admin/videos', 'Failed to fetch videos');
    return data.videos || [];
  } catch (error) {
    return [];
  }
};

// Gallery
export const fetchGallery = async () => {
  try {
    const data = await fetchWithErrorHandling('/api/gallery', 'Failed to fetch gallery');
    return data.gallery || [];
  } catch (error) {
    return [];
  }
};

// Testimonials
export const fetchTestimonials = async () => {
  try {
    const data = await fetchWithErrorHandling('/api/admin/testimonials', 'Failed to fetch testimonials');
    return data.testimonials || [];
  } catch (error) {
    return [];
  }
};

// Bookings
export const fetchBookings = async () => {
  try {
    const data = await fetchWithErrorHandling('/api/bookings', 'Failed to fetch bookings');
    return data.bookings || [];
  } catch (error) {
    return [];
  }
};

// Content
export const fetchContent = async () => {
  try {
    const data = await fetchWithErrorHandling('/api/content', 'Failed to fetch content');
    return data.content || {};
  } catch (error) {
    return {};
  }
};
