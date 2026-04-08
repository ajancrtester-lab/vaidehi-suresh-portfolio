import { motion } from 'framer-motion';

// Seeded random function for deterministic values based on index
const seededRandom = (seed) => {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
};

// Pre-generate petal data outside component to avoid React strict mode issues
const generatePetals = (count) => {
  return new Array(count).fill(null).map((_, i) => ({
    id: i,
    x: seededRandom(i * 1) * 100,
    y: seededRandom(i * 2) * 100,
    rotation: seededRandom(i * 3) * 360,
    duration: 10 + seededRandom(i * 4) * 10,
    delay: seededRandom(i * 5) * 5,
  }));
};

// Pre-generate smoke particles
const generateSmokeParticles = (count) => {
  return new Array(count).fill(null).map((_, i) => ({
    id: i,
    x: seededRandom(i * 10) * 100,
    delay: i * 2,
  }));
};

// Default data
const DEFAULT_PETALS = generatePetals(20);
const DEFAULT_SMOKE = generateSmokeParticles(5);

// Floating Flower Petals
export const FloatingPetals = ({ count = 20 }) => {
  // Use pre-generated data or generate new if count differs
  const petals = count === 20 ? DEFAULT_PETALS : generatePetals(count);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{ left: `${petal.x}%`, top: '-10%' }}
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
          <svg width="20" height="25" viewBox="0 0 20 25">
            <path d="M10 0C10 0 5 5 5 12.5C5 17.5 7 20 10 20C13 20 15 17.5 15 12.5C15 5 10 0 10 0Z" fill="#ff69b4" opacity="0.6"/>
            <path d="M10 0C10 0 5 5 5 12.5C5 17.5 7 20 10 20C13 20 15 17.5 15 12.5C15 5 10 0 10 0Z" fill="#d4af37" opacity="0.3"/>
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

// Incense Smoke
export const IncenseSmoke = ({ count = 5 }) => {
  const smokeParticles = count === 5 ? DEFAULT_SMOKE : generateSmokeParticles(count);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {smokeParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bottom-0"
          style={{ left: `${particle.x}%` }}
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

// Lotus Flower
export const LotusFlower = ({ position = 'bottom' }) => {
  return (
    <motion.div
      className={`absolute ${position === 'bottom' ? 'bottom-10' : 'top-10'} left-1/2 -translate-x-1/2 pointer-events-none`}
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 15, repeat: Infinity }}
    >
      🌸
    </motion.div>
  );
};

// Sacred Om
export const SacredOm = ({ position = 'center' }) => {
  const pos = {
    'top-left': 'top-20 left-20',
    'top-right': 'top-20 right-20',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  };

  return (
    <motion.div
      className={`absolute ${pos[position]} pointer-events-none`}
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 20, repeat: Infinity }}
    >
      <div className="text-6xl opacity-30 text-yellow-500">ॐ</div>
    </motion.div>
  );
};

// Temple Bell
export const TempleBell = ({ side = 'left' }) => {
  return (
    <motion.div
      className={`absolute top-10 ${side === 'left' ? 'left-10' : 'right-10'} pointer-events-none`}
      animate={{ rotate: [-5, 5, -5] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      🔔
    </motion.div>
  );
};

export const DiyaFlame = ({ position = 'bottom-10 left-1/2' }) => {
  return (
    <motion.div
      className={`absolute ${position} -translate-x-1/2 pointer-events-none`}
      animate={{
        scale: [1, 1.1, 1],
        y: [0, -3, 0],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
      }}
    >
      🔥
    </motion.div>
  );
};
