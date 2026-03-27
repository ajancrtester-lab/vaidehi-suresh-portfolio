/**
 * API Service - Centralized API calls
 * Replaces all mock.js usage with real backend API calls
 */

const API_URL = process.env.REACT_APP_BACKEND_URL;

// Artist Info
export const fetchArtistInfo = async () => {
  try {
    const response = await fetch(`${API_URL}/api/artist-info`);
    if (!response.ok) throw new Error('Failed to fetch artist info');
    const data = await response.json();
    return data.artistInfo;
  } catch (error) {
    console.error('Error fetching artist info:', error);
    throw error;
  }
};

// Audio Tracks
export const fetchAudioTracks = async () => {
  try {
    const response = await fetch(`${API_URL}/api/audio-tracks`);
    if (!response.ok) throw new Error('Failed to fetch audio tracks');
    const data = await response.json();
    return data.tracks;
  } catch (error) {
    console.error('Error fetching audio tracks:', error);
    throw error;
  }
};

// Video Performances
export const fetchVideoPerformances = async () => {
  try {
    const response = await fetch(`${API_URL}/api/video-performances`);
    if (!response.ok) throw new Error('Failed to fetch videos');
    const data = await response.json();
    return data.videos;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};

// Gallery
export const fetchGallery = async () => {
  try {
    const response = await fetch(`${API_URL}/api/gallery`);
    if (!response.ok) throw new Error('Failed to fetch gallery');
    const data = await response.json();
    return data.gallery;
  } catch (error) {
    console.error('Error fetching gallery:', error);
    throw error;
  }
};

// Testimonials
export const fetchTestimonials = async () => {
  try {
    const response = await fetch(`${API_URL}/api/testimonials`);
    if (!response.ok) throw new Error('Failed to fetch testimonials');
    const data = await response.json();
    return data.testimonials;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    throw error;
  }
};

// Bookings
export const fetchBookings = async () => {
  try {
    const response = await fetch(`${API_URL}/api/bookings`);
    if (!response.ok) throw new Error('Failed to fetch bookings');
    const data = await response.json();
    return data.bookings;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

// Content
export const fetchContent = async () => {
  try {
    const response = await fetch(`${API_URL}/api/content`);
    if (!response.ok) throw new Error('Failed to fetch content');
    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error('Error fetching content:', error);
    throw error;
  }
};
