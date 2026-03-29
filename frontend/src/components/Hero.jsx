import { motion } from 'framer-motion';
import { Play, ChevronDown, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useArtistInfo } from '../context/ArtistInfoContext';
import Idakka3D from './Idakka3D';

const Hero = () => {
  const { language, content } = useLanguage();
  const { artistInfo } = useArtistInfo();

  // ✅ SAFE LANGUAGE ACCESS
  const t = content?.[language] || {};

  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generatedParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 15
    }));
    setParticles(generatedParticles);
  }, []);

  const scrollToAudio = () => {
    document.getElementById('audio-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1a0a0a] to-[#0a0a0a]" />

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-10">

        {/* LEFT IMAGE */}
        <div className="w-full lg:w-1/2">
          <img
            src="/images/IMG_5748.JPG.jpeg"
            alt="Artist"
            className="w-full h-[500px] object-cover"
          />
        </div>

        {/* RIGHT TEXT */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">

          {/* ✅ NAME (Sanity + Malayalam support) */}
          <h1 className={`text-5xl font-bold text-[#d4af37] ${language === 'ml' ? 'malayalam-text' : ''}`}>
            {artistInfo?.name?.[language] || artistInfo?.name || t?.name || 'Artist Name'}
          </h1>

          {/* ✅ TAGLINE */}
          <p className={`text-xl text-gray-300 mt-4 ${language === 'ml' ? 'malayalam-text' : ''}`}>
            {artistInfo?.tagline?.[language] || artistInfo?.tagline || t?.tagline}
          </p>

          {/* ✅ DESCRIPTION */}
          <p className={`text-gray-400 mt-4 ${language === 'ml' ? 'malayalam-text' : ''}`}>
            {artistInfo?.description?.[language] || artistInfo?.description || t?.description}
          </p>

          {/* BUTTON */}
          <div className="mt-6">
            <Button onClick={scrollToAudio}>
              <Play className="mr-2" />
              {t?.buttons?.listenNow || "Listen"}
            </Button>
          </div>

          {/* ✅ STATS */}
          <div className="flex gap-6 mt-8 justify-center lg:justify-start">

            <div>
              <h2 className="text-3xl text-[#d4af37]">
                {artistInfo?.yearsOfExperience || t?.yearsOfExperience || 0}+
              </h2>
              <p>{t?.stats?.years || "Years"}</p>
            </div>

            <div>
              <h2 className="text-3xl text-[#d4af37]">
                {artistInfo?.templesPerformed || t?.templesPerformed || 0}+
              </h2>
              <p>{t?.stats?.temples || "Temples"}</p>
            </div>

          </div>

        </div>
      </div>

      {/* Scroll */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity }}
      >
        <ChevronDown className="text-[#d4af37]" />
      </motion.div>

    </section>
  );
};

export default Hero;