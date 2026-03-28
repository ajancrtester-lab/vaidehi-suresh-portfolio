import React, { createContext, useContext, useState, useEffect } from 'react';
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
  const [artistInfo, setArtistInfo] = useState(null);
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArtistInfo = async () => {
      try {
        setLoading(true);
        const data = await fetchArtistInfo();
        console.log("FINAL DATA:", data);
        setArtistInfo(data);
        setContactInfo(data.contactInfo);
      } catch (error) {
        console.error('Failed to load artist info:', error);
        // Fallback data
        setArtistInfo({
          name: 'Vaidehi Suresh',
          tagline: 'Sopana Sangeetham Artist',
          yearsOfExperience: 13,
          templesPerformed: 750
        });
        setContactInfo({
          whatsapp: '+919446909402',
          email: 'vaidehisureshikm@gmail.com',
          location: 'Iranikkulam,Thrissur, Kerala'
        });
      } finally {
        setLoading(false);
      }
    };

    loadArtistInfo();
  }, []);

  return (
    <ArtistInfoContext.Provider value={{ artistInfo, contactInfo, loading }}>
      {loading ? (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh', 
          background: '#0a0a0a', 
          color: '#d4af37',
          fontSize: '20px'
        }}>
          Loading...
        </div>
      ) : children}
    </ArtistInfoContext.Provider>
  );
};
