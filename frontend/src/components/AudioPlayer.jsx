import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { fetchAudioTracks } from '../services/api';
import { Play, ExternalLink, Music } from 'lucide-react';
import { IncenseSmoke, LotusFlower, FloatingPetals } from './TempleAnimations';

const AudioPlayer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px' });
  const [audioTracks, setAudioTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch audio tracks from API
  useEffect(() => {
    const loadAudioTracks = async () => {
      try {
        setLoading(true);
        const tracks = await fetchAudioTracks();
        setAudioTracks(tracks);
      } catch (error) {
        console.error('Failed to load audio tracks:', error);
        setAudioTracks([]);
      } finally {
        setLoading(false);
      }
    };

    loadAudioTracks();
  }, []);

  const handlePlayTrack = (track) => {
    // Open YouTube/Instagram link in new tab
    if (track.audioUrl) {
      window.open(track.audioUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <section className="relative py-32 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#1a0a0a]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-[#d4af37] text-xl">Loading audio tracks...</div>
        </div>
      </section>
    );
  }

  // Show message if no tracks
  if (audioTracks.length === 0) {
    return (
      <section ref={ref} id="audio-section" className="py-20 bg-gradient-to-b from-black via-[#0a0a0a] to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #d4af37 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }}/>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#d4af37] mb-4 font-serif">
              Sacred Melodies
            </h2>
            <p className="text-gray-400 text-lg">
              EXPERIENCE THE DIVINE THROUGH MUSIC
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[#1a1a1a] to-black border border-[#d4af37]/30 rounded-lg p-12 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                  <Music className="w-10 h-10 text-[#d4af37]" />
                </div>
                <h3 className="text-xl font-semibold text-[#d4af37] mb-2">
                  Audio Performances Coming Soon
                </h3>
                <p className="text-gray-400 mb-6">
                  Discover Sopana Sangeetham performances on our social media platforms
                </p>
                <div className="flex justify-center gap-4">
                  <a 
                    href="https://www.instagram.com/iraneesam_vaidehi_suresh/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gradient-to-r from-[#800020] to-[#9b2335] text-white rounded-lg hover:shadow-lg hover:shadow-[#800020]/50 transition-all duration-300"
                  >
                    Instagram
                  </a>
                  <a 
                    href="https://www.youtube.com/@sureshnairiranikulam3072" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gradient-to-r from-[#800020] to-[#9b2335] text-white rounded-lg hover:shadow-lg hover:shadow-[#800020]/50 transition-all duration-300"
                  >
                    YouTube
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      id="audio-section"
      className="py-20 bg-gradient-to-b from-black via-[#0a0a0a] to-black relative overflow-hidden"
    >
      {/* Incense Smoke Effect */}
      <IncenseSmoke count={6} />
      
      {/* Lotus Flowers */}
      <LotusFlower position="top" />
      
      {/* Floating Petals */}
      <FloatingPetals count={15} />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #d4af37 1px, transparent 0)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#d4af37] mb-4 font-serif">
            Sacred Melodies
          </h2>
          <p className="text-gray-400 text-lg">
            EXPERIENCE THE DIVINE THROUGH MUSIC
          </p>
        </motion.div>

        {/* Audio Tracks Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {audioTracks.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-[#1a1a1a] to-black border border-[#d4af37]/30 rounded-lg p-6 hover:border-[#d4af37] transition-all duration-300 hover:shadow-lg hover:shadow-[#d4af37]/20">
                  <div className="flex items-start gap-4">
                    {/* Play Button */}
                    <button
                      onClick={() => handlePlayTrack(track)}
                      className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r from-[#800020] to-[#9b2335] flex items-center justify-center hover:scale-110 transition-transform duration-300 group-hover:shadow-lg group-hover:shadow-[#800020]/50"
                      aria-label={`Play ${track.title}`}
                    >
                      <Play className="h-7 w-7 text-white ml-1" fill="white" />
                    </button>

                    {/* Track Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white mb-1 truncate group-hover:text-[#d4af37] transition-colors">
                        {track.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-2">
                        Raga: <span className="text-[#d4af37]">{track.raga}</span>
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        {track.duration && (
                          <span className="flex items-center gap-1">
                            <Music className="h-3 w-3" />
                            {track.duration}
                          </span>
                        )}
                        {track.temple && (
                          <span className="truncate">{track.temple}</span>
                        )}
                      </div>
                    </div>

                    {/* External Link Icon */}
                    <button
                      onClick={() => handlePlayTrack(track)}
                      className="flex-shrink-0 text-gray-500 hover:text-[#d4af37] transition-colors"
                      aria-label="Open in new tab"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Info Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <p className="text-sm text-gray-500">
              Click <Play className="inline h-3 w-3 mx-1" /> to listen on YouTube/Instagram
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AudioPlayer;
