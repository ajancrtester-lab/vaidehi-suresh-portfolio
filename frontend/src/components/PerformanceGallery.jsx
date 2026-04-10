import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const PerformanceGallery = () => {
  const [images, setImages] = useState([]);

  // Fetch images from backend
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
        const response = await fetch(`${BACKEND_URL}/api/performance-gallery`);
        const data = await response.json();
        setImages(data.images || []);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      }
    };

    fetchImages();
  }, []);

  if (images.length === 0) {
    return null;
  }

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-[#0a0a0a] via-[#1a0a0a] to-[#0a0a0a] overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#d4af37] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#800020] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
          </div>
          <h2 className="font-cormorant text-5xl md:text-6xl font-bold text-[#d4af37] mb-4">
            Divine Moments Through Music
          </h2>
          <p className="text-gray-400 text-sm tracking-[0.3em] uppercase">
            Sacred Performances Captured
          </p>
        </motion.div>

        {/* Vertical Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {images
              .sort((a, b) => a.order - b.order)
              .map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative"
                >
                  {/* Card Container */}
                  <div className="relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#d4af37]/20">
                    {/* Image Container */}
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                      <motion.img
                        src={image.url}
                        alt={image.title}
                        className="w-full h-full object-contain bg-black"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                      
                      {/* Order Badge */}
                      <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-[#d4af37] text-black flex items-center justify-center font-bold text-lg shadow-lg">
                        {image.order}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-3">
                      {/* Title */}
                      <h3 className="font-cormorant text-2xl md:text-3xl font-bold text-[#d4af37] group-hover:text-[#e5c158] transition-colors">
                        {image.title}
                      </h3>
                      
                      {/* Caption */}
                      {image.caption && (
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                          {image.caption}
                        </p>
                      )}

                      {/* Decorative Line */}
                      <div className="pt-4">
                        <div className="h-px w-16 bg-gradient-to-r from-[#d4af37] to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 rounded-2xl shadow-[0_0_60px_rgba(212,175,55,0.3)]" />
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        {/* No Images Message */}
        {images.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-500 text-lg">No performances to display yet</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PerformanceGallery;
