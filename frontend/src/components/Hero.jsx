import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useArtistInfo } from '../context/ArtistInfoContext';
import Idakka3D from './Idakka3D';
import { useEffect, useState } from 'react';
import { FloatingPetals, SacredOm, TempleBell, DiyaFlame } from './TempleAnimations';

const Hero = () => {
  const { t } = useLanguage();
  const { artistInfo } = useArtistInfo();
  const [vilakkuParticles, setVilakkuParticles] = useState([]);

  // Generate temple lamp (vilakku) particles
  useEffect(() => {
    const particles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 20 + Math.random() * 15,
    }));
    setVilakkuParticles(particles);
  }, []);

  const scrollToAudio = () => {
    const audioSection = document.getElementById('audio-section');
    if (audioSection) {
      audioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#1a0f0a] via-[#0a0a0a] to-black">
      {/* Floating Flower Petals */}
      <FloatingPetals count={25} />
      
      {/* Sacred Om Symbol */}
      <SacredOm position="top-right" />
      
      {/* Temple Bells */}
      <TempleBell side="left" />
      <TempleBell side="right" />
      
      {/* Diya Flames in Corners */}
      <DiyaFlame position="top-10 left-10" />
      <DiyaFlame position="top-10 right-10" />
      <DiyaFlame position="bottom-20 left-20" />
      <DiyaFlame position="bottom-20 right-20" />

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #d4af37 1px, transparent 0)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating Temple Lamps (Vilakku) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {vilakkuParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Temple Lamp SVG */}
            <svg width="40" height="60" viewBox="0 0 40 60" fill="none">
              {/* Hanging chain */}
              <line x1="20" y1="0" x2="20" y2="15" stroke="#d4af37" strokeWidth="1" opacity="0.5"/>
              {/* Top crown */}
              <circle cx="20" cy="18" r="4" fill="#d4af37" opacity="0.6"/>
              {/* Lamp body */}
              <path
                d="M12 22 Q12 30 20 30 Q28 30 28 22 L26 22 Q26 26 20 26 Q14 26 14 22 Z"
                fill="#d4af37"
                opacity="0.7"
              />
              {/* Flame */}
              <motion.ellipse
                cx="20"
                cy="20"
                rx="3"
                ry="5"
                fill="#ffdd77"
                animate={{
                  opacity: [0.6, 1, 0.6],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.ellipse
                cx="20"
                cy="18"
                rx="2"
                ry="4"
                fill="#fff9e6"
                animate={{
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Gradient Atmospheric Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#800020] rounded-full mix-blend-multiply filter blur-[120px] opacity-10"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[#d4af37] rounded-full mix-blend-multiply filter blur-[100px] opacity-10"
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          
          {/* LEFT SIDE: Artist Image with Frame */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[3/4] max-w-lg mx-auto">
              {/* Decorative Golden Frame Corners */}
              <div className="absolute -top-6 -left-6 w-24 h-24 border-t-4 border-l-4 border-[#d4af37] opacity-80" />
              <div className="absolute -top-6 -right-6 w-24 h-24 border-t-4 border-r-4 border-[#d4af37] opacity-80" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 border-b-4 border-l-4 border-[#d4af37] opacity-80" />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-4 border-r-4 border-[#d4af37] opacity-80" />

              {/* Inner Frame with Image */}
              <div className="relative h-full bg-gradient-to-br from-[#1a1a1a] to-black border-4 border-[#d4af37]/40 rounded-sm overflow-hidden group">
                {/* Artist Photo */}
                <img
                  src="/images/IMG_5748.JPG.jpeg"
                  alt="Vaidehi Suresh - Sopana Sangeetham Artist"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1610701061989-0d21853d1f82?w=600&h=800&fit=crop&q=80';
                  }}
                />

                {/* Bottom Label Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-8">
                  {/* Decorative Divider */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="h-px w-12 bg-[#d4af37]" />
                    <svg width="20" height="20" viewBox="0 0 20 20" className="mx-3">
                      <path
                        d="M10 2L12 8L18 8L13 12L15 18L10 14L5 18L7 12L2 8L8 8L10 2Z"
                        fill="#d4af37"
                      />
                    </svg>
                    <div className="h-px w-12 bg-[#d4af37]" />
                  </div>
                  
                  <p className="text-[#d4af37] text-xs tracking-[0.4em] uppercase text-center mb-2">
                    SOPANA SANGEETHAM
                  </p>
                  <h3 className="text-3xl font-bold text-white font-serif text-center">
                    Artist
                  </h3>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#d4af37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Content */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
            className="text-left order-1 lg:order-2"
          >
            {/* Artist Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-[#d4af37] font-serif leading-tight"
            >
              {t('hero.nameFirst')}<br />
              {t('hero.nameLast')}
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
            >
              {t('hero.tagline')}
            </motion.p>

            {/* Decorative Divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex items-center mb-8"
            >
              <div className="h-px flex-1 bg-gradient-to-r from-[#d4af37] to-transparent max-w-xs" />
              <span className="text-xs text-gray-500 tracking-[0.3em] uppercase mx-6">
                {t('hero.badge')}
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-gray-400 text-base md:text-lg leading-relaxed mb-10 max-w-2xl"
            >
              {t('hero.description')}
            </motion.p>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              onClick={scrollToAudio}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#800020] to-[#9b2335] text-white text-lg font-semibold rounded-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#800020]/50"
            >
              <Play className="relative z-10 h-5 w-5 fill-white group-hover:translate-x-1 transition-transform" />
              <span className="relative z-10">{t('hero.cta')}</span>
              
              {/* Animated Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#9b2335] to-[#800020] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="grid grid-cols-3 gap-12 mt-16"
            >
              <div className="text-center lg:text-left">
                <div className="text-5xl font-bold text-[#d4af37] mb-2 font-serif">
                  {artistInfo?.yearsOfExperience || 15}+
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-[0.2em]">
                  {t('hero.stats.years')}
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-5xl font-bold text-[#d4af37] mb-2 font-serif">
                  {artistInfo?.templesPerformed || 750}+
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-[0.2em]">
                  {t('hero.stats.temples')}
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-5xl font-bold text-[#d4af37] mb-2 font-serif">
                  50+
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-[0.2em]">
                  {t('hero.stats.ragas')}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating 3D Idakka - Right Side */}
      <motion.div
        className="hidden xl:block absolute right-16 top-1/2 -translate-y-1/2 z-20"
        initial={{ opacity: 0, x: 100 }}
        animate={{ 
          opacity: 1, 
          x: 0,
          y: [0, -15, 0],
          rotate: [0, 3, 0, -3, 0],
        }}
        transition={{
          opacity: { duration: 1, delay: 2 },
          x: { duration: 1, delay: 2 },
          y: {
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          rotate: {
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
      >
        <Idakka3D />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={scrollToAudio}
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-xs text-gray-500 uppercase tracking-[0.3em]">
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
