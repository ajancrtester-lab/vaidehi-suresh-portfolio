import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { fetchVideoPerformances } from '../services/api';
import { Play } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';

const VideoGallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoPerformances, setVideoPerformances] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch videos from API
  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        const videos = await fetchVideoPerformances();
        setVideoPerformances(videos);
      } catch (error) {
        console.error('Failed to load videos:', error);
        setVideoPerformances([]);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  if (loading) {
    return (
      <section className="relative py-32 px-6 bg-gradient-to-b from-[#1a0a0a] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-[#d4af37] text-xl">Loading videos...</div>
        </div>
      </section>
    );
  }

  if (videoPerformances.length === 0) {
    return null; // Hide section if no videos
  }

  return (
    <section
      ref={ref}
      className="relative py-32 px-6 bg-gradient-to-b from-[#1a0a0a] to-[#0a0a0a] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ width: 0 }}
            animate={isInView ? { width: '100px' } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
          </motion.div>

          <h2 className="font-cormorant text-5xl md:text-6xl font-bold text-[#d4af37] mb-6">
            Performances
          </h2>

          <p className="text-gray-400 text-sm tracking-[0.3em] uppercase">
            Sacred Moments Captured
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {videoPerformances.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div className="group cursor-pointer relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#800020]/20 to-[#d4af37]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                    
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-[300px] object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                      />
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-colors duration-300">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="w-16 h-16 rounded-full bg-[#d4af37] flex items-center justify-center shadow-lg shadow-[#d4af37]/50"
                        >
                          <Play className="h-6 w-6 text-black ml-1" fill="black" />
                        </motion.div>
                      </div>
                    </div>

                    <div className="border-x border-b border-[#d4af37]/30 bg-black/50 p-6 group-hover:border-[#d4af37]/60 transition-colors duration-300">
                      <h3 className="font-cormorant text-2xl font-semibold text-[#d4af37] mb-2">
                        {video.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-1">{video.venue}</p>
                      <p className="text-gray-500 text-xs">{video.date}</p>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-full bg-black border-[#d4af37]/30 p-0">
                  <div className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={video.videoUrl}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;