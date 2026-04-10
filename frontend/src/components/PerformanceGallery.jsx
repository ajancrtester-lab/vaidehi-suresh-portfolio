import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PerformanceGallery = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const autoPlayRef = useRef(null);

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

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && images.length > 0) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 4000); // Auto-scroll every 4 seconds

      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
        }
      };
    }
  }, [isAutoPlaying, images.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Drag handlers
  const handleDragStart = (e) => {
    setIsDragging(true);
    setDragStart(e.clientX || e.touches[0].clientX);
    setIsAutoPlaying(false);
  };

  const handleDragEnd = (e) => {
    if (!isDragging) return;
    
    const dragEnd = e.clientX || e.changedTouches[0].clientX;
    const diff = dragStart - dragEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    setIsDragging(false);
  };

  // Resume autoplay when mouse leaves
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  if (images.length === 0) {
    return null;
  }

  // Calculate visible images (center + 2 on each side)
  const getVisibleImages = () => {
    const visible = [];
    const total = images.length;

    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + total) % total;
      visible.push({
        ...images[index],
        offset: i,
        index
      });
    }

    return visible;
  };

  const visibleImages = getVisibleImages();

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

        {/* 3D Carousel */}
        <div
          className="relative h-[500px] md:h-[600px] flex items-center justify-center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        >
          <AnimatePresence mode="sync">
            {visibleImages.map((image) => {
              const offset = image.offset;
              const isCenter = offset === 0;

              // Calculate position and transformation
              const x = offset * 350; // Horizontal spacing
              const z = isCenter ? 0 : -200 - Math.abs(offset) * 100; // Depth
              const rotateY = offset * 15; // Rotation angle
              const scale = isCenter ? 1 : 0.75 - Math.abs(offset) * 0.1; // Scale
              const opacity = isCenter ? 1 : 0.4 + (1 - Math.abs(offset) * 0.2);

              return (
                <motion.div
                  key={image.id}
                  className={`absolute ${isCenter ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}`}
                  initial={false}
                  animate={{
                    x,
                    z,
                    rotateY,
                    scale,
                    opacity,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 20,
                    mass: 1
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                    perspective: 1000,
                  }}
                  onClick={() => !isCenter && goToSlide(image.index)}
                >
                  <div className="relative w-[600px] h-[400px] md:w-[700px] md:h-[450px]">
                    {/* Image container */}
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-[#d4af37]/30 shadow-2xl">
                      {/* Image */}
                      <img
                        src={image.url}
                        alt={image.title}
                        className="w-full h-full object-contain bg-black"
                        draggable="false"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Title overlay (only on center image) */}
                      {isCenter && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="absolute bottom-0 left-0 right-0 p-8"
                        >
                          <h3 className="font-cormorant text-3xl md:text-4xl font-bold text-[#d4af37] mb-2">
                            {image.title}
                          </h3>
                          {image.caption && (
                            <p className="text-gray-300 text-sm md:text-base">
                              {image.caption}
                            </p>
                          )}
                        </motion.div>
                      )}
                    </div>

                    {/* Golden glow effect for center image */}
                    {isCenter && (
                      <div className="absolute inset-0 rounded-2xl shadow-[0_0_80px_rgba(212,175,55,0.3)] pointer-events-none" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-black/50 border border-[#d4af37]/50 flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all duration-300 group"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-black/50 border border-[#d4af37]/50 flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all duration-300 group"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Indicator dots */}
        <div className="flex justify-center mt-12 gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                index === currentIndex
                  ? 'w-12 h-3 bg-[#d4af37]'
                  : 'w-3 h-3 bg-gray-600 hover:bg-gray-500'
              } rounded-full`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Auto-play indicator */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="text-xs text-gray-500 hover:text-[#d4af37] transition-colors"
          >
            {isAutoPlaying ? '⏸ Pause auto-scroll' : '▶ Resume auto-scroll'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default PerformanceGallery;
