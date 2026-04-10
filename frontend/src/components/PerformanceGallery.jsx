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
      }, 4000);

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
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    setDragStart(clientX);
  };

  const handleDragEnd = (e) => {
    if (!isDragging) return;

    const clientX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
    const diff = dragStart - clientX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    setIsDragging(false);
  };

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

        {/* 3D Carousel Slider */}
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
              const x = offset * 350;
              const z = isCenter ? 0 : -200 - Math.abs(offset) * 100;
              const rotateY = offset * 15;
              const scale = isCenter ? 1 : 0.75 - Math.abs(offset) * 0.1;
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
                  {/* Dynamic container - adapts to image aspect ratio */}
                  <div className="relative flex items-center justify-center">
                    {/* Image with natural dimensions */}
                    <div className="relative rounded-2xl overflow-hidden border-2 border-[#d4af37]/30 shadow-2xl max-w-[700px] max-h-[500px]">
                      <img
                        src={image.url}
                        alt={image.title}
                        className="w-auto h-auto max-w-[700px] max-h-[500px] object-contain"
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

                      {/* Golden glow effect for center image */}
                      {isCenter && (
                        <div className="absolute inset-0 rounded-2xl shadow-[0_0_80px_rgba(212,175,55,0.3)] pointer-events-none" />
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-8 z-20 p-3 rounded-full bg-black/50 backdrop-blur-sm border border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all duration-300 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-8 z-20 p-3 rounded-full bg-black/50 backdrop-blur-sm border border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all duration-300 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-3 mt-12">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                index === currentIndex
                  ? 'w-12 h-3 bg-[#d4af37] rounded-full'
                  : 'w-3 h-3 bg-gray-600 hover:bg-gray-400 rounded-full'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PerformanceGallery;
