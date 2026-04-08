import { useEffect, useState } from 'react';
import { Instagram } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const SnapWidget = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/site-settings`);
        const data = await response.json();
        setSettings(data.settings);
      } catch (error) {
        console.error('Failed to load settings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  useEffect(() => {
    // Load SnapWidget script
    const script = document.createElement('script');
    script.src = 'https://snapwidget.com/js/snapwidget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-400">
        <Instagram className="h-12 w-12 mx-auto mb-4 text-[#d4af37]" />
        <p>Loading Instagram feed...</p>
      </div>
    );
  }

  const instagramUsername = settings?.instagramUsername || 'vaidehisureshikm';
  const snapWidgetId = settings?.snapWidgetId;

  // If custom SnapWidget ID/embed code is provided, use it
  if (snapWidgetId) {
    // Check if it's a full embed code or just an ID
    if (snapWidgetId.includes('iframe') || snapWidgetId.includes('snapwidget')) {
      // It's a full embed code
      return (
        <div className="max-w-5xl mx-auto">
          <div 
            dangerouslySetInnerHTML={{ __html: snapWidgetId }}
            className="snapwidget-container"
          />
        </div>
      );
    }
  }

  // Default: Show Instagram profile link with instructions
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-black/50 border border-[#d4af37]/30 rounded-lg p-8 text-center">
        <Instagram className="h-16 w-16 mx-auto mb-4 text-[#d4af37]" />
        
        <h3 className="text-2xl font-cormorant text-[#d4af37] mb-4">
          Latest Instagram Performances
        </h3>
        
        <p className="text-gray-400 mb-6">
          Follow @{instagramUsername} to see the latest temple performances and sacred concerts
        </p>

        <a
          href={`https://www.instagram.com/${instagramUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#800020] to-[#9b2335] text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          <Instagram className="h-5 w-5" />
          View on Instagram
        </a>

        <div className="mt-8 p-4 bg-[#d4af37]/10 border border-[#d4af37]/20 rounded">
          <p className="text-sm text-gray-400">
            <strong className="text-[#d4af37]">Admin Note:</strong> To display a 3x3 Instagram grid here, 
            get your free embed code from{' '}
            <a 
              href="https://snapwidget.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#d4af37] hover:underline"
            >
              SnapWidget.com
            </a>
            {' '}and paste it in Site Settings → SnapWidget Embed Code
          </p>
        </div>
      </div>
    </div>
  );
};

export default SnapWidget;
