import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Idakka3D = () => {
  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotate(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* 3D Idakka Container */}
      <motion.div
        className="relative"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d'
        }}
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <motion.div
          className="relative"
          style={{
            transformStyle: 'preserve-3d',
            rotateY: rotate,
          }}
        >
          {/* Idakka Body - Hourglass shape */}
          <svg
            width="120"
            height="180"
            viewBox="0 0 120 180"
            className="drop-shadow-2xl"
            style={{
              filter: 'drop-shadow(0 10px 30px rgba(212, 175, 55, 0.4))'
            }}
          >
            {/* Main body gradient */}
            <defs>
              <linearGradient id="woodGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#8B4513', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#A0522D', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#6B3410', stopOpacity: 1 }} />
              </linearGradient>
              
              <linearGradient id="leatherGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#D4A574', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#E8C99B', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#D4A574', stopOpacity: 1 }} />
              </linearGradient>

              <radialGradient id="drumheadGlow">
                <stop offset="0%" style={{ stopColor: '#d4af37', stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: '#d4af37', stopOpacity: 0 }} />
              </radialGradient>
            </defs>

            {/* Top drumhead */}
            <ellipse cx="60" cy="20" rx="35" ry="12" fill="url(#leatherGradient)" stroke="#8B4513" strokeWidth="2"/>
            <ellipse cx="60" cy="20" rx="30" ry="10" fill="url(#drumheadGlow)" opacity="0.6"/>
            
            {/* Top wooden ring */}
            <ellipse cx="60" cy="22" rx="36" ry="13" fill="none" stroke="url(#woodGradient)" strokeWidth="3"/>
            
            {/* Upper body - curves inward */}
            <path
              d="M 25 22 Q 40 50, 45 90 L 75 90 Q 80 50, 95 22"
              fill="url(#woodGradient)"
              stroke="#5C3317"
              strokeWidth="1.5"
            />
            
            {/* Center waist (narrowest part) */}
            <ellipse cx="60" cy="90" rx="15" ry="8" fill="#6B3410" stroke="#4A2511" strokeWidth="1"/>
            
            {/* Lower body - curves outward */}
            <path
              d="M 45 90 Q 40 130, 25 158 L 95 158 Q 80 130, 75 90"
              fill="url(#woodGradient)"
              stroke="#5C3317"
              strokeWidth="1.5"
            />
            
            {/* Bottom wooden ring */}
            <ellipse cx="60" cy="158" rx="36" ry="13" fill="none" stroke="url(#woodGradient)" strokeWidth="3"/>
            
            {/* Bottom drumhead */}
            <ellipse cx="60" cy="160" rx="35" ry="12" fill="url(#leatherGradient)" stroke="#8B4513" strokeWidth="2"/>
            <ellipse cx="60" cy="160" rx="30" ry="10" fill="url(#drumheadGlow)" opacity="0.6"/>
            
            {/* Leather strings (vertical) */}
            <line x1="30" y1="25" x2="30" y2="155" stroke="#C19A6B" strokeWidth="2" opacity="0.8"/>
            <line x1="45" y1="25" x2="42" y2="155" stroke="#C19A6B" strokeWidth="2" opacity="0.8"/>
            <line x1="75" y1="25" x2="78" y2="155" stroke="#C19A6B" strokeWidth="2" opacity="0.8"/>
            <line x1="90" y1="25" x2="90" y2="155" stroke="#C19A6B" strokeWidth="2" opacity="0.8"/>
            
            {/* Decorative patterns */}
            <circle cx="60" cy="55" r="3" fill="#d4af37" opacity="0.6"/>
            <circle cx="60" cy="125" r="3" fill="#d4af37" opacity="0.6"/>
            
            {/* Wood grain details */}
            <path
              d="M 50 40 Q 55 45, 50 50"
              stroke="#4A2511"
              strokeWidth="0.5"
              fill="none"
              opacity="0.3"
            />
            <path
              d="M 70 110 Q 75 115, 70 120"
              stroke="#4A2511"
              strokeWidth="0.5"
              fill="none"
              opacity="0.3"
            />
          </svg>

          {/* Animated glow effect */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </motion.div>

        {/* Musical notes floating around */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute text-[#d4af37] text-2xl opacity-60"
            style={{
              top: `${20 + i * 30}%`,
              left: i % 2 === 0 ? '-20%' : '120%'
            }}
            animate={{
              y: [0, -30, 0],
              x: i % 2 === 0 ? [0, 20, 0] : [0, -20, 0],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            ♪
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Idakka3D;
