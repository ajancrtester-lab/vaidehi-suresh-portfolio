import { createContext, useContext, useState, useEffect } from 'react';

const ArtistInfoContext = createContext();

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const ArtistInfoProvider = ({ children }) => {
  const [artistInfo, setArtistInfo] = useState({
    name: 'Vaidehi Suresh',
    tagline: 'Sopana Sangeetham Artist',
    yearsOfExperience: 13,
    templesPerformed: 750,
    studentsTrained: 100,
    awardsReceived: 25
  });
  
  const [contactInfo, setContactInfo] = useState({
    phone: '+91 98765 43210',
    email: 'contact@vaidehisuresh.com'
  });
  
  const [loading, setLoading] = useState(false);
  const [lastFetch, setLastFetch] = useState(0);

  const fetchLatestData = async (forceRefresh = false) => {
    // Cache for 30 seconds
    const now = Date.now();
    if (!forceRefresh && now - lastFetch < 30000) {
      return;
    }

    try {
      setLoading(true);
      
      // Fetch from site-settings with cache busting
      const response = await fetch(`${BACKEND_URL}/api/site-settings?t=${now}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        const settings = data.settings || {};
        
        if (settings.stats) {
          setArtistInfo(prev => ({
            ...prev,
            name: settings.hero?.mainTitle || prev.name,
            tagline: settings.hero?.tagline || prev.tagline,
            yearsOfExperience: settings.stats.yearsOfExperience || prev.yearsOfExperience,
            templesPerformed: settings.stats.templesPerformed || prev.templesPerformed,
            studentsTrained: settings.stats.studentsTrained || prev.studentsTrained,
            awardsReceived: settings.stats.awardsReceived || prev.awardsReceived
          }));
        }
        
        if (settings.socialMedia) {
          setContactInfo(prev => ({
            ...prev,
            phone: settings.phone || prev.phone,
            email: settings.email || prev.email
          }));
        }
        
        setLastFetch(now);
      }
    } catch (error) {
      console.error('Failed to fetch artist info:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestData();
    
    // Listen for admin updates
    const handleStorageChange = (e) => {
      if (e.key === 'admin-update') {
        fetchLatestData(true);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <ArtistInfoContext.Provider value={{ artistInfo, contactInfo, loading, refresh: fetchLatestData }}>
      {children}
    </ArtistInfoContext.Provider>
  );
};

export const useArtistInfo = () => {
  const context = useContext(ArtistInfoContext);
  if (!context) {
    throw new Error('useArtistInfo must be used within ArtistInfoProvider');
  }
  return context;
};
