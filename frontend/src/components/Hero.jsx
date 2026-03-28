import { motion, AnimatePresence } from 'framer-motion';
import { Play, ChevronDown, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useArtistInfo } from '../context/ArtistInfoContext';
import Idakka3D from './Idakka3D';

const Hero = () => {
  const { language, content } = useLanguage();
  const { artistInfo, loading } = useArtistInfo();
  const t = content[language];
  const [particles, setParticles] = useState([]);
  const [jasminePetals, setJasminePetals] = useState([]);
  const [diyas, setDiyas] = useState([]);
  const [templeMotifs, setTempleMotifs] = useState([]);

  useEffect(() => {
    // Lotus petals (reduced for balance)
    const particleCount = 20;
    const generatedParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 15,
      size: 15 + Math.random() * 25
    }));
    setParticles(generatedParticles);

    // Jasmine flowers (reduced)
    const jasmineCount = 15;
    const generatedJasmine = Array.from({ length: jasmineCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 12 + Math.random() * 10,
      size: 8 + Math.random() * 12
    }));
    setJasminePetals(generatedJasmine);

    // Floating diyas/oil lamps (reduced)
    const diyaCount = 6;
    const generatedDiyas = Array.from({ length: diyaCount }, (_, i) => ({
      id: i,
      left: 10 + (i * 80) / diyaCount,
      delay: Math.random() * 3,
      yOffset: Math.random() * 200
    }));
    setDiyas(generatedDiyas);

    // Temple architectural motifs (reduced)
    const motifCount = 4;
    const generatedMotifs = Array.from({ length: motifCount }, (_, i) => ({
      id: i,
      left: (i * 100) / motifCount,
      delay: Math.random() * 4,
      duration: 15 + Math.random() * 10
    }));
    setTempleMotifs(generatedMotifs);
  }, []);

  const scrollToAudio = () => {
    const audioSection = document.getElementById('audio-section');
    audioSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Base Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1a0a0a] to-[#0a0a0a]">
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-[#800020]/20 via-[#0a3d0a]/10 to-[#d4af37]/10"
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

      {/* Video Grid Background */}
      <div className="absolute inset-0 grid grid-cols-3 gap-1 opacity-10">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            className="relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#800020]/20 to-transparent" />
            <img
              src={`https://images.unsplash.com/photo-${[
                '1598000938546-d8b840f69952',
                '1604608672516-f1b9b1a0b0f0',
                '1582510003544-4d00b7f74220',
                '1599930113854-d6d7fd521f10',
                '1610118370450-0881b2f5ccb5',
                '1584714268709-c3dd9c92b378'
              ][i - 1]}?w=600&h=800&fit=crop`}
              alt="Temple"
              className="w-full h-full object-cover blur-sm"
            />
          </motion.div>
        ))}
      </div>

      {/* Kerala Temple Architecture Silhouettes */}
      <div className="absolute bottom-0 left-0 right-0 h-48 opacity-20">
        <svg viewBox="0 0 1920 200" className="w-full h-full" preserveAspectRatio="none">
          <path
            d="M0,100 L200,80 L240,60 L280,80 L400,100 L500,90 L540,70 L580,90 L700,100 L800,85 L840,65 L880,85 L1000,100 L1100,90 L1140,70 L1180,90 L1300,100 L1400,85 L1440,65 L1480,85 L1600,100 L1700,90 L1740,70 L1780,90 L1920,100 L1920,200 L0,200 Z"
            fill="#d4af37"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Lotus Petals (Reduced) */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={`lotus-${particle.id}`}
            className="absolute"
            style={{
              left: `${particle.left}%`,
              top: '-10%',
              width: `${particle.size}px`,
              height: `${particle.size}px`
            }}
            animate={{
              y: ['0vh', '110vh'],
              x: [0, Math.sin(particle.id) * 80, 0],
              rotate: [0, 360],
              opacity: [0, 0.7, 0]
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
                opacity="0.6"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Jasmine Flowers (Reduced) */}
      <div className="absolute inset-0 pointer-events-none">
        {jasminePetals.map((petal) => (
          <motion.div
            key={`jasmine-${petal.id}`}
            className="absolute"
            style={{
              left: `${petal.left}%`,
              top: '-5%',
              width: `${petal.size}px`,
              height: `${petal.size}px`
            }}
            animate={{
              y: ['0vh', '110vh'],
              x: [0, Math.cos(petal.id) * 60, 0],
              rotate: [0, 180, 360],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <div className="w-full h-full rounded-full bg-white shadow-lg shadow-white/50" />
          </motion.div>
        ))}
      </div>

      {/* Floating Diyas (Reduced) */}
      <div className="absolute inset-0 pointer-events-none">
        {diyas.map((diya) => (
          <motion.div
            key={`diya-${diya.id}`}
            className="absolute"
            style={{
              left: `${diya.left}%`,
              top: `${20 + diya.yOffset}px`
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 3,
              delay: diya.delay,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            {/* Nilavilakku (Kerala Lamp) */}
            <svg width="30" height="40" viewBox="0 0 30 40">
              {/* Lamp base */}
              <ellipse cx="15" cy="35" rx="8" ry="3" fill="#d4af37" opacity="0.8" />
              <rect x="13" y="25" width="4" height="10" fill="#d4af37" opacity="0.8" />
              {/* Lamp bowl */}
              <ellipse cx="15" cy="25" rx="10" ry="5" fill="#d4af37" opacity="0.9" />
              {/* Flame */}
              <motion.path
                d="M15,20 Q13,15 15,10 Q17,15 15,20 Z"
                fill="#ff6b35"
                opacity="0.9"
                animate={{
                  d: [
                    'M15,20 Q13,15 15,10 Q17,15 15,20 Z',
                    'M15,20 Q12,15 15,8 Q18,15 15,20 Z',
                    'M15,20 Q13,15 15,10 Q17,15 15,20 Z'
                  ],
                  opacity: [0.9, 1, 0.9]
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Flame glow */}
              <motion.circle
                cx="15"
                cy="12"
                r="6"
                fill="#ffd700"
                opacity="0.3"
                className="blur-md"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Temple Bell Motifs (Reduced) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {templeMotifs.map((motif) => (
          <motion.div
            key={`motif-${motif.id}`}
            className="absolute top-10"
            style={{ left: `${motif.left}%` }}
            animate={{
              y: [0, 30, 0],
              rotate: [-5, 5, -5],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: motif.duration,
              delay: motif.delay,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <Sparkles className="h-8 w-8 text-[#d4af37]" />
          </motion.div>
        ))}
      </div>

      {/* 3D Idakka Animation - Top Right */}
      <div className="absolute top-20 right-10 lg:right-20 w-32 h-48 lg:w-40 lg:h-56 pointer-events-none z-20 hidden md:block">
        <Idakka3D />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left: Artist Photo */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full lg:flex-1 lg:max-w-xl order-2 lg:order-1"
        >
          <div className="relative group max-w-md mx-auto lg:max-w-none">
            {/* Decorative frame */}
            <motion.div
              className="absolute -inset-4 sm:-inset-6 lg:-inset-8 border-2 sm:border-4 border-[#d4af37]/30"
              animate={{
                boxShadow: [
                  '0 0 30px rgba(212, 175, 55, 0.3)',
                  '0 0 60px rgba(212, 175, 55, 0.5)',
                  '0 0 30px rgba(212, 175, 55, 0.3)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            {/* Corner decorations (Kerala temple style) */}
            <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 lg:-top-4 lg:-left-4 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 border-t-2 border-l-2 sm:border-t-4 sm:border-l-4 border-[#d4af37]" />
            <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 lg:-top-4 lg:-right-4 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 border-t-2 border-r-2 sm:border-t-4 sm:border-r-4 border-[#d4af37]" />
            <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 lg:-bottom-4 lg:-left-4 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 border-b-2 border-l-2 sm:border-b-4 sm:border-l-4 border-[#d4af37]" />
            <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 lg:-bottom-4 lg:-right-4 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 border-b-2 border-r-2 sm:border-b-4 sm:border-r-4 border-[#d4af37]" />

            {/* Main photo */}
            <div className="relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-[#800020]/60 via-transparent to-transparent z-10"
                animate={{ opacity: [0.6, 0.8, 0.6] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <img
                src="/images/IMG_5748.JPG.jpeg"
                alt="Vaidehi Suresh - Sopana Sangeetham Artist"
                className="w-full h-[450px] sm:h-[550px] lg:h-[600px] object-cover object-center relative z-0"
              />
              
              {/* Bottom gradient overlay with name */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 sm:p-6 lg:p-8 z-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div className="w-8 sm:w-10 lg:w-12 h-px bg-[#d4af37]" />
                    <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-[#d4af37]" />
                    <div className="w-8 sm:w-10 lg:w-12 h-px bg-[#d4af37]" />
                  </div>
                  <p className="text-white/80 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-1">Sopana Sangeetham</p>
                  <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#d4af37]">Artist</h3>
                </motion.div>
              </div>
            </div>

            {/* Floating accent elements - hide on mobile */}
            <motion.div
              className="hidden lg:block absolute -right-6 top-1/4 w-20 h-20"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full opacity-30">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#d4af37" strokeWidth="1" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="#d4af37" strokeWidth="1" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="#d4af37" strokeWidth="1" />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Right: Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full lg:flex-1 lg:max-w-2xl order-1 lg:order-2 text-center lg:text-left"
        >
          <motion.div
            className="inline-block mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
              <div className="w-20 h-px bg-gradient-to-r from-[#d4af37] to-transparent" />
            </div>
          </motion.div>

          <h1 className={`font-cormorant text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#d4af37] mb-4 sm:mb-6 tracking-wide leading-tight ${language === 'ml' ? 'malayalam-text' : ''}`}>
            {t.name}
          </h1>

          <motion.p
            className={`text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-4 sm:mb-6 font-light leading-relaxed ${language === 'ml' ? 'malayalam-text' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {t.tagline}
          </motion.p>

          <motion.div
            className="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-8 justify-center lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="h-px flex-1 lg:flex-1 bg-gradient-to-r from-[#800020] via-[#d4af37] to-transparent" />
            <span className="text-gray-500 text-xs sm:text-sm tracking-widest">KERALA TRADITION</span>
            <div className="h-px flex-1 lg:hidden bg-gradient-to-l from-[#800020] via-[#d4af37] to-transparent" />
          </motion.div>

          <motion.p
            className={`text-gray-400 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 ${language === 'ml' ? 'malayalam-text' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            {t.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="flex justify-center lg:justify-start gap-4"
          >
            <Button
              onClick={scrollToAudio}
              className="bg-gradient-to-r from-[#800020] to-[#9b2335] hover:from-[#9b2335] hover:to-[#800020] text-white px-6 sm:px-10 py-5 sm:py-7 text-base sm:text-lg border-2 border-[#d4af37]/30 shadow-2xl shadow-[#d4af37]/20 hover:shadow-[#d4af37]/40 group relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-[#d4af37]/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
              <Play className="mr-2 h-5 w-5 sm:h-6 sm:w-6 relative z-10" />
              <span className={`relative z-10 ${language === 'ml' ? 'malayalam-text' : ''}`}>{t.buttons.listenNow}</span>
            </Button>
          </motion.div>

          {/* Stats inline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="flex gap-4 sm:gap-8 mt-8 sm:mt-10 pt-8 sm:pt-10 border-t border-[#d4af37]/20 justify-center lg:justify-start"
          >
            <div>
              <div className="font-cormorant text-3xl sm:text-4xl font-bold text-[#d4af37] mb-1">
                {artistInfo?.yearsOfExperience || t.yearsOfExperience}+
              </div>
              <div className={`text-gray-500 text-xs tracking-wider uppercase ${language === 'ml' ? 'malayalam-text' : ''}`}>{t.stats.years}</div>
            </div>
            <div>
              <div className="font-cormorant text-3xl sm:text-4xl font-bold text-[#d4af37] mb-1">
                {artistInfo?.templesPerformed || t.templesPerformed}+
              </div>
              <div className={`text-gray-500 text-xs tracking-wider uppercase ${language === 'ml' ? 'malayalam-text' : ''}`}>{t.stats.temples}</div>
            </div>
            <div>
              <div className="font-cormorant text-3xl sm:text-4xl font-bold text-[#d4af37] mb-1">50+</div>
              <div className={`text-gray-500 text-xs tracking-wider uppercase ${language === 'ml' ? 'malayalam-text' : ''}`}>{t.stats.ragas}</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 13, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[#d4af37] text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="h-6 w-6 text-[#d4af37]/70" />
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />
    </section>
  );
};

export default Hero;
