import { createContext, useContext, useState, useEffect } from 'react';
import { fetchArtistInfo } from '../services/api';

const ArtistInfoContext = createContext();

export const useArtistInfo = () => {
  const context = useContext(ArtistInfoContext);
  if (!context) {
    throw new Error('useArtistInfo must be used within ArtistInfoProvider');
  }
  return context;
};

export const ArtistInfoProvider = ({ children }) => {
  const [artistInfo, setArtistInfo] = useState({
    name: 'Vaidehi Suresh',
    tagline: 'Sopana Sangeetham Artist',
    yearsOfExperience: 15,
    templesPerformed: 750
  });
  const [contactInfo, setContactInfo] = useState({
    whatsapp: '919446909402',
    email: 'vaidehisureshikm@gmail.com',
    location: 'Iranikkulam, Thrissur, Kerala'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadArtistInfo = async () => {
      try {
        // Fetch from site-settings which has the stats
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/site-settings`);
        const data = await response.json();
        const settings = data.settings || {};
        
        if (settings.stats) {
          setArtistInfo({
            name: settings.hero?.mainTitle || 'Vaidehi Suresh',
            tagline: settings.hero?.tagline || 'Preserving the Sacred Melodies of Kerala Temples',
            yearsOfExperience: settings.stats.yearsOfExperience || 15,
            templesPerformed: settings.stats.templesPerformed || 750,
            studentsTrained: settings.stats.studentsTrained || 100,
            awardsReceived: settings.stats.awardsReceived || 25
          });
        }
        
        // Also try the artist-info endpoint as fallback
        const artistData = await fetchArtistInfo().catch(() => null);
        if (artistData) {
          setArtistInfo(prev => ({
            ...prev,
            ...artistData
          }));
          
          if (artistData.contactInfo) {
            setContactInfo(artistData.contactInfo);
          }
        }
      } catch (error) {
        console.log('Using default content:', error);
        // Keep default values
      }
    };

    loadArtistInfo();
  }, []);

  return (
    <ArtistInfoContext.Provider value={{ artistInfo, contactInfo, loading }}>
      {children}
    </ArtistInfoContext.Provider>
  );
};
