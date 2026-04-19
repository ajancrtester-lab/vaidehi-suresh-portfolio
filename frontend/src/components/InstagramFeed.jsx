import { useState, useEffect } from 'react';
import { Instagram, ExternalLink } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const InstagramFeed = () => {
  const [instagramUsername, setInstagramUsername] = useState('iraneesam_vaidehi_suresh');
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Instagram username from settings
        const settingsRes = await fetch(`${BACKEND_URL}/api/site-settings`, {
          cache: 'no-store'
        });
        const settingsData = await settingsRes.json();
        if (settingsData.settings?.instagramUsername) {
          setInstagramUsername(settingsData.settings.instagramUsername);
        }

        // Fetch gallery items to display as Instagram-style feed
        const galleryRes = await fetch(`${BACKEND_URL}/api/gallery`, {
          cache: 'no-store'
        });
        const galleryData = await galleryRes.json();
        // Show maximum 9 items
        setGalleryItems((galleryData.gallery || []).slice(0, 9));
      } catch (error) {
        console.error('Failed to load feed data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-400">Loading feed...</p>
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

      {/* Gallery Grid (Instagram-style) */}
      {galleryItems.length > 0 ? (
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3 gap-4">
            {galleryItems.map((item, index) => (
              <a
                key={item.id || index}
                href={item.externalLink || item.imageUrl || `https://instagram.com/${instagramUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square bg-zinc-900/50 rounded-lg overflow-hidden border border-zinc-800 group relative hover:border-[#E1306C] transition-all"
              >
                {/* Image or Thumbnail */}
                {item.thumbnail || item.imageUrl ? (
                  <img
                    src={item.thumbnail || item.imageUrl}
                    alt={`${item.title || 'Kerala temple music performance'} - Sopana Sangeetham by Vaidehi Suresh`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                
                {/* Fallback if image fails */}
                <div className="w-full h-full hidden items-center justify-center bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#dc2743]">
                  <Instagram className="h-12 w-12 text-white" />
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ExternalLink className="h-6 w-6 text-white" />
                </div>

                {/* Badge for link type */}
                {item.linkType && (
                  <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 rounded text-xs text-white">
                    {item.linkType === 'youtube' ? 'YouTube' : 
                     item.linkType === 'instagram' ? 'Instagram' : 
                     item.linkType === 'reel' ? 'Reel' : 'Video'}
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>
      ) : (
        // Fallback if no gallery items
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-zinc-900/50 rounded-lg p-12 border border-zinc-800">
            <Instagram className="h-16 w-16 mx-auto mb-4 text-[#E1306C]" />
            <p className="text-gray-400 mb-6">
              Latest performances coming soon!
            </p>
            <a
              href={`https://instagram.com/${instagramUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#dc2743] text-white rounded-full hover:shadow-lg transition-all font-medium"
            >
              <Instagram className="h-5 w-5" />
              Follow on Instagram
            </a>
          </div>
        </div>
      )}

      {/* View All Button */}
      <div className="text-center mt-8">
        <a
          href={`https://instagram.com/${instagramUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#dc2743] text-white rounded-full hover:shadow-lg transition-all font-medium text-lg"
        >
          <Instagram className="h-6 w-6" />
          View All Posts on Instagram
        </a>
      </div>
    </div>
  );
};

export default InstagramFeed;
