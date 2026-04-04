import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Floating Flower Petals Component
export const FloatingPetals = ({ count = 20 }) => {
  

  const petals = useMemo(() =>
  new Array(count).fill().map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    rotation: Math.random() * 360,
  })),
[count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}%`,
            top: '-10%',
          }}
          animate={{
            y: ['0vh', '120vh'],
            x: [0, 50, -30, 0],
            rotate: [petal.rotation, petal.rotation + 720],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg width="20" height="25" viewBox="0 0 20 25" fill="none">
            <path
              d="M10 0C10 0 5 5 5 12.5C5 17.5 7 20 10 20C13 20 15 17.5 15 12.5C15 5 10 0 10 0Z"
              fill="#ff69b4"
              opacity="0.6"
            />
            <path
              d="M10 0C10 0 5 5 5 12.5C5 17.5 7 20 10 20C13 20 15 17.5 15 12.5C15 5 10 0 10 0Z"
              fill="#d4af37"
              opacity="0.3"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

// Sacred Om Symbol Animation
export const SacredOm = ({ position = 'center' }) => {
  const positionClasses = {
    'top-left': 'top-20 left-20',
    'top-right': 'top-20 right-20',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  };

  return (
    <motion.div
      className={`absolute ${positionClasses[position]} pointer-events-none z-0`}
      initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
      animate={{ 
        opacity: [0, 0.15, 0.15, 0],
        scale: [0.5, 1.5, 1.5, 2],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <svg width="150" height="150" viewBox="0 0 100 100" fill="none">
        <text
          x="50"
          y="70"
          fontSize="60"
          fontFamily="serif"
          fontWeight="bold"
          fill="#d4af37"
          textAnchor="middle"
          opacity="0.3"
        >
          ॐ
        </text>
      </svg>
    </motion.div>
  );
};

// Incense Smoke Effect
export const IncenseSmoke = ({ count = 5 }) => {
  
 
  new Array(count).fill().map((_, i) => ({
    delay: i * 2,
  })),
[count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {smokeParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bottom-0"
          style={{
            left: `${particle.x}%`,
          }}
          animate={{
            y: [0, -300],
            x: [-10, 10, -10],
            opacity: [0, 0.4, 0],
            scale: [0.5, 1.5, 2],
          }}
          transition={{
            duration: 8,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        >
          <div className="w-3 h-20 bg-gradient-to-t from-gray-500/30 to-transparent blur-sm rounded-full" />
        </motion.div>
      ))}
    </div>
  );
};

// Lotus Flower Animation
export const LotusFlower = ({ position = 'bottom' }) => {
  return (
    <motion.div
      className={`absolute ${position === 'bottom' ? 'bottom-10' : 'top-10'} left-1/2 -translate-x-1/2 pointer-events-none`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 0.3, 0.3, 0],
        scale: [0, 1, 1, 1.2],
        rotate: [0, 360],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
        {/* Lotus petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <motion.ellipse
            key={i}
            cx="50"
            cy="50"
            rx="15"
            ry="30"
            fill="#ff69b4"
            opacity="0.4"
            transform={`rotate(${angle} 50 50)`}
            animate={{
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              repeat: Infinity,
            }}
          />
        ))}
        <circle cx="50" cy="50" r="8" fill="#d4af37" opacity="0.6" />
      </svg>
    </motion.div>
  );
};

// Temple Bell Animation
export const TempleBell = ({ side = 'left' }) => {
  return (
    <motion.div
      className={`absolute top-10 ${side === 'left' ? 'left-10' : 'right-10'} pointer-events-none`}
      animate={{
        rotate: [-5, 5, -5],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <svg width="50" height="60" viewBox="0 0 50 60" fill="none">
        <path
          d="M25 10 L20 5 L30 5 Z"
          fill="#d4af37"
          opacity="0.6"
        />
        <path
          d="M15 15 Q15 10 25 10 Q35 10 35 15 L35 35 Q35 45 25 45 Q15 45 15 35 Z"
          fill="#d4af37"
          opacity="0.7"
        />
        <motion.circle
          cx="25"
          cy="48"
          r="3"
          fill="#800020"
          animate={{
            y: [0, 3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </svg>
      
      {/* Bell sound waves */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 2, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <div className="w-16 h-16 border-2 border-[#d4af37] rounded-full" />
      </motion.div>
    </motion.div>
  );
};

// Diya (Oil Lamp) Flame
export const DiyaFlame = ({ position }) => {
  return (
    <motion.div className={`absolute ${position} pointer-events-none`}>
      <svg width="40" height="50" viewBox="0 0 40 50" fill="none">
        {/* Diya base */}
        <ellipse cx="20" cy="35" rx="18" ry="6" fill="#d4af37" opacity="0.8" />
        <path
          d="M10 35 Q10 30 20 30 Q30 30 30 35"
          fill="#800020"
          opacity="0.6"
        />
        
        {/* Flame */}
        <motion.g
          animate={{
            scale: [1, 1.1, 1],
            y: [0, -2, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <ellipse cx="20" cy="20" rx="6" ry="12" fill="#ffdd77" opacity="0.8" />
          <ellipse cx="20" cy="18" rx="4" ry="8" fill="#fff9e6" />
        </motion.g>
      </svg>
    </motion.div>
  );
};

// Rangoli Pattern (Sacred Geometry)
export const RangoliPattern = () => {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-5"
      animate={{
        rotate: [0, 360],
        scale: [0.8, 1.2, 0.8],
      }}
      transition={{
        duration: 30,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <svg width="400" height="400" viewBox="0 0 200 200" fill="none">
        {/* Mandala pattern */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <g key={i} transform={`rotate(${angle} 100 100)`}>
            <circle cx="100" cy="40" r="8" fill="#d4af37" opacity="0.6" />
            <path
              d="M100 50 L95 70 L105 70 Z"
              fill="#800020"
              opacity="0.5"
            />
          </g>
        ))}
        <circle cx="100" cy="100" r="30" stroke="#d4af37" strokeWidth="2" fill="none" opacity="0.6" />
        <circle cx="100" cy="100" r="50" stroke="#800020" strokeWidth="1" fill="none" opacity="0.4" />
        <circle cx="100" cy="100" r="70" stroke="#d4af37" strokeWidth="1" fill="none" opacity="0.3" />
      </svg>
    </motion.div>
  );
};

// Peacock Feather Decoration
export const PeacockFeather = ({ side = 'left' }) => {
  return (
    <motion.div
      className={`absolute top-1/4 ${side === 'left' ? 'left-5' : 'right-5'} pointer-events-none`}
      animate={{
        rotate: [0, 10, 0, -10, 0],
        y: [0, -10, 0, 10, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <svg width="60" height="120" viewBox="0 0 60 120" fill="none">
        {/* Feather stem */}
        <line x1="30" y1="0" x2="30" y2="100" stroke="#d4af37" strokeWidth="2" opacity="0.6" />
        
        {/* Feather eye */}
        <ellipse cx="30" cy="20" rx="20" ry="25" fill="#4169e1" opacity="0.5" />
        <ellipse cx="30" cy="20" rx="15" ry="20" fill="#32cd32" opacity="0.5" />
        <ellipse cx="30" cy="20" rx="8" ry="12" fill="#d4af37" opacity="0.7" />
        <circle cx="30" cy="20" r="4" fill="#800020" opacity="0.8" />
      </svg>
    </motion.div>
  );
};

// Garland Chain
export const Garland = () => {
  return (
    <div className="absolute top-0 left-0 right-0 pointer-events-none">
      <svg width="100%" height="80" viewBox="0 0 1200 80" preserveAspectRatio="none" fill="none">
        <motion.path
          d="M0 20 Q100 40 200 20 T400 20 T600 20 T800 20 T1000 20 T1200 20"
          stroke="#d4af37"
          strokeWidth="2"
          fill="none"
          opacity="0.4"
          animate={{
            d: [
              "M0 20 Q100 40 200 20 T400 20 T600 20 T800 20 T1000 20 T1200 20",
              "M0 25 Q100 35 200 25 T400 25 T600 25 T800 25 T1000 25 T1200 25",
              "M0 20 Q100 40 200 20 T400 20 T600 20 T800 20 T1000 20 T1200 20",
            ],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Flowers on garland */}
        {[200, 400, 600, 800, 1000].map((x, i) => (
          <motion.circle
            key={i}
            cx={x}
            cy="20"
            r="8"
            fill="#ff69b4"
            opacity="0.6"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity,
            }}
          />
        ))}
      </svg>
    </div>
  );
};
