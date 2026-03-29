import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useArtistInfo } from '../context/ArtistInfoContext';
import Idakka3D from './Idakka3D';
import { useEffect, useState } from 'react';

const Hero = () => {
  const { t } = useLanguage();
  const { artistInfo } = useArtistInfo();
  const [particles, setParticles] = useState([]);

  // Generate temple particles
  useEffect(() => {
    const particleArray = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10,
    }));
    setParticles(particleArray);
  }, []);

  const scrollToAudio = () => {
    const audioSection = document.getElementById('audio-section');
    if (audioSection) {
      audioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-[#0a0a0a] to-black">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #d4af37 1px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Temple Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 2L12 8H18L13 12L15 18L10 14L5 18L7 12L2 8H8L10 2Z"
                fill="#d4af37"
                opacity="0.5"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-20 w-96 h-96 bg-[#800020] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute top-1/3 -right-20 w-96 h-96 bg-[#d4af37] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image with 3D Idakka */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image Frame */}
              <div className="relative aspect-[3/4] max-w-md mx-auto">
                {/* Decorative Corners */}
                <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-[#d4af37]" />
                <div className="absolute -top-4 -right-4 w-16 h-16 border-t-2 border-r-2 border-[#d4af37]" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 border-b-2 border-l-2 border-[#d4af37]" />
                <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-[#d4af37]" />

                {/* Image Container */}
                <div className="relative h-full bg-gradient-to-br from-[#1a1a1a] to-black p-2 rounded-sm overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1610701061989-0d21853d1f82?w=600&h=800&fit=crop&q=80"
                    alt="Vaidehi Suresh"
                    className="w-full h-full object-cover rounded-sm"
                  />

                  {/* Artist Label Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                    <p className="text-[#d4af37] text-xs tracking-[0.3em] uppercase mb-1">
                      SOPANA SANGEETHAM
                    </p>
                    <h3 className="text-2xl font-bold text-white font-serif">Artist</h3>
                  </div>

                  {/* Glow Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#d4af37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>

              {/* Floating 3D Idakka */}
              <motion.div
                className="absolute -right-20 top-1/2 -translate-y-1/2 hidden xl:block"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Idakka3D />
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-left"
          >
            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-[#d4af37] font-serif"
            >
              {artistInfo?.name || 'Vaidehi Suresh'}
            </motion.h1>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-6"
            >
              <p className="text-xl md:text-2xl text-gray-300 mb-2">
                {t('hero.subtitle')}
              </p>
              <div className="h-px w-20 bg-gradient-to-r from-[#d4af37] to-transparent" />
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="inline-block mb-8"
            >
              <div className="px-6 py-2 bg-gradient-to-r from-[#800020]/20 to-[#d4af37]/20 border border-[#d4af37]/30 rounded-full">
                <p className="text-sm text-[#d4af37] tracking-widest uppercase">
                  {t('hero.badge')}
                </p>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 max-w-xl"
            >
              {t('hero.description')}
            </motion.p>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              onClick={scrollToAudio}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#800020] to-[#9b2335] text-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#800020]/50 hover:scale-105"
            >
              <span className="relative z-10 font-semibold">{t('hero.cta')}</span>
              <Play className="relative z-10 h-5 w-5 group-hover:translate-x-1 transition-transform" />

              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#9b2335] to-[#800020] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-[#d4af37]/20"
            >
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#d4af37] mb-1">
                  {artistInfo?.yearsOfExperience || 15}+
                </div>
                <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider">
                  {t('hero.stats.years')}
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#d4af37] mb-1">
                  {artistInfo?.templesPerformed || 750}+
                </div>
                <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider">
                  {t('hero.stats.temples')}
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#d4af37] mb-1">50+</div>
                <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider">
                  {t('hero.stats.ragas')}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={scrollToAudio}
        >
          <span className="text-xs text-gray-500 uppercase tracking-widest">
            {t('hero.scroll')}
          </span>
          <svg
            className="w-6 h-6 text-[#d4af37]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
