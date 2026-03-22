import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { gallery } from '../mock';
import { ExternalLink, Youtube, Instagram, Play } from 'lucide-react';

const ImageGallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const getLinkIcon = (linkType) => {
    switch (linkType) {
      case 'youtube':
        return <Youtube className="h-5 w-5" />;
      case 'instagram-post':
        return <Instagram className="h-5 w-5" />;
      case 'instagram-reel':
        return <Play className="h-5 w-5" />;
      default:
        return <ExternalLink className="h-5 w-5" />;
    }
  };

  const getLinkBadge = (linkType) => {
    switch (linkType) {
      case 'youtube':
        return 'YouTube';
      case 'instagram-post':
        return 'Instagram';
      case 'instagram-reel':
        return 'Reel';
      default:
        return 'Link';
    }
  };

  return (
    <section
      ref={ref}
      className="relative py-32 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#1a0a0a] overflow-hidden"
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
            Gallery
          </h2>

          <p className="text-gray-400 text-sm tracking-[0.3em] uppercase">
            Moments of Devotion
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {gallery.map((item, index) => (
            <motion.a
              key={item.id}
              href={item.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="group cursor-pointer relative overflow-hidden block"
            >
              <div className="relative overflow-hidden border border-[#d4af37]/20 hover:border-[#d4af37]/60 transition-all duration-300">
                <motion.img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-[350px] object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                
                {/* Link Type Badge */}
                <div className="absolute top-4 right-4 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="px-3 py-1.5 rounded-full bg-[#d4af37] backdrop-blur-sm flex items-center gap-2 border border-[#d4af37]">
                    {getLinkIcon(item.linkType)}
                    <span className="text-xs font-semibold text-black uppercase">
                      {getLinkBadge(item.linkType)}
                    </span>
                  </div>
                </div>

                {/* External Link Icon */}
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/30">
                    <ExternalLink className="h-5 w-5 text-white" />
                  </div>
                </div>

                {/* Title & Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-cormorant text-xl font-semibold mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm font-light">{item.caption}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
          className="text-center text-gray-500 text-sm mt-12"
        >
          Click any thumbnail to view the full content on YouTube or Instagram
        </motion.p>
      </div>
    </section>
  );
};

export default ImageGallery;