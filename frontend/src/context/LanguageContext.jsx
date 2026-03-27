import React, { createContext, useContext, useState, useEffect } from 'react';
import { content as defaultContent } from '../content/bilingual';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [content, setContent] = useState(defaultContent);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved language preference
  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  // Function to fetch and refresh content
  const refreshContent = async () => {
    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${BACKEND_URL}/api/content`);
      
      if (response.ok) {
        const data = await response.json();
        
        // Merge backend content with default content
        const mergedContent = {
          en: { ...defaultContent.en },
          ml: { ...defaultContent.ml }
        };

        // Merge each section from backend
        if (data.content) {
          Object.keys(data.content).forEach(lang => {
            if (mergedContent[lang]) {
              Object.keys(data.content[lang] || {}).forEach(section => {
                if (mergedContent[lang][section]) {
                  mergedContent[lang][section] = {
                    ...mergedContent[lang][section],
                    ...data.content[lang][section]
                  };
                } else {
                  mergedContent[lang][section] = data.content[lang][section];
                }
              });
            }
          });
        }

        setContent(mergedContent);
        console.log('✅ Content refreshed successfully');
      }
    } catch (error) {
      console.log('Using default content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch content on initial mount
  useEffect(() => {
    refreshContent();
  }, []);

  // Listen for content update events
  useEffect(() => {
    const handleContentUpdate = () => {
      console.log('🔄 Content update event received, refreshing...');
      refreshContent();
    };

    window.addEventListener('contentUpdated', handleContentUpdate);
    
    return () => {
      window.removeEventListener('contentUpdated', handleContentUpdate);
    };
  }, []);

  // Save language preference
  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ml' : 'en';
    setLanguage(newLang);
    localStorage.setItem('preferredLanguage', newLang);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, content, isLoading, refreshContent }}>
      {children}
    </LanguageContext.Provider>
  );
};
