import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if on admin page
    const isAdminPage = location.pathname.startsWith('/admin');
    
    // Explicitly set cursor based on page
    if (isAdminPage) {
      document.body.style.cursor = 'auto';
      return; // Don't add event listeners on admin pages
    } else {
      document.body.style.cursor = 'none';
    }

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === 'BUTTON' ||
        e.target.tagName === 'A' ||
        e.target.closest('button') ||
        e.target.closest('a') ||
        e.target.style.cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, [location.pathname]);

  // Don't render custom cursor on admin pages
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot - more visible */}
      <motion.div
        className="fixed top-0 left-0 w-5 h-5 pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
          scale: isHovering ? 1.8 : 1
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      >
        <div className="w-full h-full rounded-full bg-[#d4af37] shadow-lg shadow-[#d4af37]/50" />
      </motion.div>

      {/* Cursor ring - more prominent */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9998] border-2 border-[#d4af37] rounded-full"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 0.8 : 0.6
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      />

      {/* Outer glow ring */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 pointer-events-none z-[9997] border border-[#d4af37]/30 rounded-full"
        animate={{
          x: mousePosition.x - 32,
          y: mousePosition.y - 32,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.4 : 0.2
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      />
    </>
  );
};

export default CustomCursor;