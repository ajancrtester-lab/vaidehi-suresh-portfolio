import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram, ExternalLink } from 'lucide-react';
import { fetchGallery } from '../services/api';

const InstagramGrid = () => {
  const [instagramPosts, setInstagramPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInstagramPosts = async () => {
      try {
        setLoading(true);
        const allGallery = await fetchGallery();
        
        // Filter only Instagram posts/reels and take first 9 for 3x3 grid
        const instaPosts = allGallery
          .filter(item => 
            item.linkType === 'instagram-post' || 
            item.linkType === 'instagram-reel'
          )
          .slice(0, 9);
        
        setInstagramPosts(instaPosts);
      } catch (error) {
        console.error('Failed to load Instagram posts:', error);
        setInstagramPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadInstagramPosts();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <Instagram className="h-12 w-12 mx-auto mb-4 text-[#d4af37] animate-pulse" />
        <p className="text-gray-400">Loading Instagram feed...</p>
      </div>
    );
  }

  if (instagramPosts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-black/50 border border-[#d4af37]/30 rounded-lg p-12 text-center">
          <Instagram className="h-16 w-16 mx-auto mb-6 text-[#d4af37]" />
          
          <h3 className="text-2xl font-cormorant text-[#d4af37] mb-4">
            Latest Instagram Performances
          </h3>
          
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Follow on Instagram to see the latest temple performances and sacred concerts
          </p>

          <a
            href="https://www.instagram.com/vaidehisureshikm"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#800020] to-[#9b2335] text-white rounded-lg hover:opacity-90 transition-opacity text-lg font-semibold"
          >
            <Instagram className="h-6 w-6" />
            View on Instagram
          </a>

          <div className="mt-8 p-4 bg-[#d4af37]/10 border border-[#d4af37]/20 rounded">
            <p className="text-sm text-gray-400">
              <strong className="text-[#d4af37]">Admin:</strong> Add Instagram posts via 
              Admin Panel → Media Management → Gallery. Set Link Type to "Instagram Post" or "Instagram Reel"
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Instagram Header */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#d4af37]/20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#800020] to-[#d4af37] flex items-center justify-center">
            <Instagram className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">@vaidehisureshikm</h3>
            <p className="text-sm text-gray-400">Latest Performances</p>
          </div>
        </div>
        
        <a
          href="https://www.instagram.com/vaidehisureshikm"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 border border-[#d4af37]/50 hover:bg-[#d4af37]/10 rounded-lg transition-colors text-[#d4af37] font-semibold flex items-center gap-2"
        >
          <Instagram className="h-4 w-4" />
          Follow
        </a>
      </div>

      {/* 3x3 Grid */}
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        {instagramPosts.map((post, index) => (
          <motion.a
            key={post.id}
            href={post.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group relative aspect-square overflow-hidden bg-black/50 rounded-lg cursor-pointer"
          >
            {/* Post Image */}
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />

            {/* Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="text-center p-4">
                <ExternalLink className="h-8 w-8 text-white mx-auto mb-2" />
                <p className="text-white text-sm font-semibold line-clamp-2">
                  {post.title}
                </p>
                {post.caption && (
                  <p className="text-gray-300 text-xs mt-1 line-clamp-2">
                    {post.caption}
                  </p>
                )}
              </div>
            </div>

            {/* Instagram Icon Badge */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Instagram className="h-4 w-4 text-white" />
              </div>
            </div>

            {/* Reel Indicator */}
            {post.linkType === 'instagram-reel' && (
              <div className="absolute top-2 left-2">
                <div className="px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-xs text-white font-semibold">
                  REEL
                </div>
              </div>
            )}
          </motion.a>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <a
          href="https://www.instagram.com/vaidehisureshikm"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#d4af37] hover:text-[#ffd700] transition-colors text-sm"
        >
          <Instagram className="h-4 w-4" />
          View all posts on Instagram
        </a>
      </div>
    </div>
  );
};

export default InstagramGrid;
