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
        const data = await fetchArtistInfo();
        if (data) {
          setArtistInfo({
            name: data.name || 'Vaidehi Suresh',
            tagline: data.tagline || 'Sopana Sangeetham Artist',
            yearsOfExperience: data.yearsOfExperience || 15,
            templesPerformed: data.templesPerformed || 750
          });
          
          if (data.contactInfo) {
            setContactInfo(data.contactInfo);
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
