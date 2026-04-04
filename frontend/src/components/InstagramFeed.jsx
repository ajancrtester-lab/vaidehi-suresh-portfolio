import { useState, useEffect } from 'react';
import { Instagram } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const InstagramFeed = () => {
  const [instagramUsername, setInstagramUsername] = useState('vaidehisureshikm');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch Instagram username from settings
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/site-settings`, {
          cache: 'no-store'
        });
        const data = await response.json();
        if (data.settings?.instagramUsername) {
          setInstagramUsername(data.settings.instagramUsername);
        }
      } catch (error) {
        console.error('Failed to load Instagram settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-400">Loading Instagram feed...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Instagram Feed Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Instagram className="h-6 w-6 text-[#E1306C]" />
          <h3 className="text-2xl font-serif text-[#d4af37]">Latest Performances</h3>
        </div>
        <a
          href={`https://instagram.com/${instagramUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-[#E1306C] transition-colors"
        >
          <Instagram className="h-4 w-4" />
          Follow @{instagramUsername} for latest updates
        </a>
      </div>

      {/* Elfsight Instagram Feed Widget */}
      <div className="max-w-5xl mx-auto">
        {/* Option 1: Elfsight Widget (Easiest - No API needed) */}
        <script src="https://static.elfsight.com/platform/platform.js" defer></script>
        <div 
          className="elfsight-app-d3f0c24e-7b5a-4aa5-9e64-8f4e3c2a1b6f"
          data-elfsight-app-lazy
        />

        {/* Fallback: Manual Instagram Embed */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* These will be replaced by actual Instagram widget */}
          <div className="aspect-square bg-zinc-900/50 rounded-lg overflow-hidden border border-zinc-800">
            <a
              href={`https://instagram.com/${instagramUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full flex items-center justify-center hover:bg-zinc-800/50 transition-colors"
            >
              <Instagram className="h-12 w-12 text-[#E1306C]" />
            </a>
          </div>
        </div>
      </div>

      {/* Alternative: Simple Instagram Link */}
      <div className="text-center mt-8">
        <a
          href={`https://instagram.com/${instagramUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#dc2743] text-white rounded-full hover:shadow-lg transition-all font-medium"
        >
          <Instagram className="h-5 w-5" />
          View All Posts on Instagram
        </a>
      </div>
    </div>
  );
};

export default InstagramFeed;
