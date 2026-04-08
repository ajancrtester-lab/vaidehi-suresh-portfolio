import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram, ExternalLink, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from '../hooks/use-toast';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const InstagramReels = () => {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadReels = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/instagram-reels`);
      const data = await response.json();
      setReels(data.reels || []);
    } catch (error) {
      console.error('Failed to load Instagram reels:', error);
      setReels([]);
    } finally {
      setLoading(false);
    }
  };

  const refreshReels = async () => {
    try {
      setRefreshing(true);
      const response = await fetch(`${BACKEND_URL}/api/instagram-reels/refresh`, {
        method: 'POST'
      });
      const data = await response.json();
      setReels(data.reels || []);
      toast({
        title: 'Success',
        description: 'Instagram reels refreshed successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to refresh reels',
        variant: 'destructive',
      });
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadReels();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <Instagram className="h-12 w-12 mx-auto mb-4 text-[#d4af37] animate-pulse" />
        <p className="text-gray-400">Loading Instagram reels...</p>
      </div>
    );
  }

  if (reels.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-black/50 border border-[#d4af37]/30 rounded-lg p-12 text-center">
          <Instagram className="h-16 w-16 mx-auto mb-6 text-[#d4af37]" />
          
          <h3 className="text-2xl font-cormorant text-[#d4af37] mb-4">
            Latest Instagram Reels
          </h3>
          
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Follow on Instagram to see the latest temple performances and sacred concerts
          </p>

          <a
            href="https://www.instagram.com/iraneesam_vaidehi_suresh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#800020] to-[#9b2335] text-white rounded-lg hover:opacity-90 transition-opacity text-lg font-semibold"
          >
            <Instagram className="h-6 w-6" />
            View on Instagram
          </a>

          <div className="mt-8 p-4 bg-[#d4af37]/10 border border-[#d4af37]/20 rounded">
            <p className="text-sm text-gray-400">
              <strong className="text-[#d4af37]">Admin:</strong> Add Instagram reels via 
              Admin Panel → Media Management → Instagram Reels
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#d4af37]/20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#800020] to-[#d4af37] flex items-center justify-center">
            <Instagram className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">@iraneesam_vaidehi_suresh</h3>
            <p className="text-sm text-gray-400">Latest Reels</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button
            onClick={refreshReels}
            disabled={refreshing}
            variant="outline"
            className="border-[#d4af37]/50 hover:bg-[#d4af37]/10 text-[#d4af37]"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <a
            href="https://www.instagram.com/iraneesam_vaidehi_suresh"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 border border-[#d4af37]/50 hover:bg-[#d4af37]/10 rounded-lg transition-colors text-[#d4af37] font-semibold flex items-center gap-2"
          >
            <Instagram className="h-4 w-4" />
            Follow
          </a>
        </div>
      </div>

      {/* 3x3 Grid */}
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        {reels.slice(0, 9).map((reel, index) => (
          <motion.a
            key={reel.id}
            href={reel.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group relative aspect-square overflow-hidden bg-black/50 rounded-lg cursor-pointer"
          >
            {/* Reel Cover Image */}
            <img
              src={reel.thumbnail}
              alt={reel.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />

            {/* Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="text-center p-4">
                <ExternalLink className="h-8 w-8 text-white mx-auto mb-2" />
                <p className="text-white text-sm font-semibold line-clamp-2">
                  {reel.title}
                </p>
              </div>
            </div>

            {/* REEL Badge */}
            <div className="absolute top-2 left-2">
              <div className="px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-xs text-white font-semibold">
                REEL
              </div>
            </div>

            {/* Instagram Icon */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Instagram className="h-4 w-4 text-white" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <a
          href="https://www.instagram.com/iraneesam_vaidehi_suresh"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#d4af37] hover:text-[#ffd700] transition-colors text-sm"
        >
          <Instagram className="h-4 w-4" />
          View all reels on Instagram
        </a>
      </div>
    </div>
  );
};

export default InstagramReels;
