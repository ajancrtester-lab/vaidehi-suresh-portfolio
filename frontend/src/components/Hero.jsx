import { motion } from 'framer-motion';
import { Play, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { artistInfo } from '../mock';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate temple-inspired particles (lotus petals)
    const particleCount = 30;
    const generatedParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
      size: 20 + Math.random() * 30
    }));
    setParticles(generatedParticles);
  }, []);

  const scrollToAudio = () => {
    const audioSection = document.getElementById('audio-section');
    audioSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1a0a0a] to-[#0a0a0a]">
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-[#800020]/20 via-transparent to-[#d4af37]/10"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>

      {/* Temple-inspired Floating Particles (Lotus Petals) */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              left: `${particle.left}%`,
              top: '-10%',
              width: `${particle.size}px`,
              height: `${particle.size}px`
            }}
            animate={{
              y: ['0vh', '110vh'],
              x: [0, Math.sin(particle.id) * 50, 0],
              rotate: [0, 360],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M50,10 Q60,30 50,50 Q40,30 50,10 M50,50 Q70,60 50,90 Q60,60 50,50 M50,50 Q30,60 50,90 Q40,60 50,50"
                fill="#d4af37"
                opacity="0.3"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Diya Flame Effect (corners) */}
      <motion.div
        className="absolute top-20 left-20 w-2 h-2 bg-[#d4af37] rounded-full blur-xl"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <motion.div
        className="absolute top-20 right-20 w-2 h-2 bg-[#d4af37] rounded-full blur-xl"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 2,
          delay: 1,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.div
            className="inline-block mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="w-1 h-20 bg-gradient-to-b from-transparent via-[#d4af37] to-transparent mx-auto" />
          </motion.div>

          <h1 className="font-cormorant text-6xl md:text-8xl font-bold text-[#d4af37] mb-4 tracking-wide">
            {artistInfo.name}
          </h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8 font-light tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {artistInfo.tagline}
          </motion.p>

          <motion.div
            className="h-px w-32 bg-gradient-to-r from-transparent via-[#800020] to-transparent mx-auto mb-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <Button
              onClick={scrollToAudio}
              className="bg-gradient-to-r from-[#800020] to-[#9b2335] hover:from-[#9b2335] hover:to-[#800020] text-white px-8 py-6 text-lg rounded-none border border-[#d4af37]/30 shadow-lg shadow-[#d4af37]/20 hover:shadow-xl hover:shadow-[#d4af37]/40"
            >
              <Play className="mr-2 h-5 w-5" />
              Listen Now
            </Button>
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="h-8 w-8 text-[#d4af37]/50" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </section>
  );
};

export default Hero;