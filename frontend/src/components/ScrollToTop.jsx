import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  // Show button when page is scrolled and detect if at bottom
  useEffect(() => {
    const toggleVisibility = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show button if scrolled more than 300px
      if (scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Check if near bottom (within 100px)
      if (scrollTop + windowHeight >= documentHeight - 100) {
        setIsAtBottom(false); // Hide scroll down at bottom
      } else if (scrollTop < 300) {
        setIsAtBottom(true); // Show scroll down at top
      } else {
        setIsAtBottom(false); // Show scroll up in middle
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    toggleVisibility(); // Check initial state

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Scroll to Bottom - shows at top */}
      <AnimatePresence>
        {isAtBottom && (
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToBottom}
            className="fixed bottom-24 right-8 z-50 group"
            aria-label="Scroll to bottom"
          >
            {/* Outer glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37] to-[#800020] blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300 rounded-full" />
            
            {/* Button */}
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-[#d4af37] to-[#c9a961] hover:from-[#f4c542] hover:to-[#d4af37] border-2 border-[#800020]/50 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
              <ChevronDown 
                className="h-6 w-6 sm:h-7 sm:w-7 text-[#800020] group-hover:text-black transition-colors duration-300" 
                strokeWidth={2.5}
              />
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
              Scroll to bottom
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Scroll to Top - shows when scrolled */}
      <AnimatePresence>
        {isVisible && !isAtBottom && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-8 z-50 group"
            aria-label="Scroll to top"
          >
            {/* Outer glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#800020] to-[#d4af37] blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300 rounded-full" />
            
            {/* Button */}
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-[#800020] to-[#9b2335] hover:from-[#9b2335] hover:to-[#800020] border-2 border-[#d4af37]/50 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
              <ChevronUp 
                className="h-6 w-6 sm:h-7 sm:w-7 text-[#d4af37] group-hover:text-white transition-colors duration-300" 
                strokeWidth={2.5}
              />
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
              Scroll to top
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScrollToTop;
