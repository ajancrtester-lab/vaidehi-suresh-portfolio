import { motion } from 'framer-motion';
import { Play, ArrowDown } from 'lucide-react';
import { Button } from './ui/button';
import { artistInfo } from '../mock';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [floatingElements, setFloatingElements] = useState([]);

  useEffect(() => {
    // Minimal floating elements (just 8 subtle dots)
    const elements = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: 10 + (i * 80) / 8,
      delay: i * 0.5,
      duration: 8 + Math.random() * 4
    }));
    setFloatingElements(elements);
  }, []);

  const scrollToAudio = () => {
    const audioSection = document.getElementById('audio-section');
    audioSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen bg-[#f5f1e8] overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f5f1e8] via-white to-[#f5f1e8]" />

      {/* Minimal floating dots */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements.map((el) => (
          <motion.div
            key={el.id}
            className="absolute w-2 h-2 rounded-full bg-[#c9a961]/20"
            style={{
              left: `${el.left}%`,
              top: '20%'
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: el.duration,
              delay: el.delay,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-8 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Large Typography */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-2 lg:order-1"
            >
              {/* Small accent line */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '60px' }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="h-px bg-black mb-8"
              />

              {/* Name - Extra Large */}
              <h1 className="font-cormorant text-7xl lg:text-8xl xl:text-9xl font-light text-black mb-6 leading-none tracking-tight">
                {artistInfo.name}
              </h1>

              {/* Role */}
              <p className="text-xl text-gray-600 mb-8 tracking-wide uppercase font-light">
                Sopana Sangeetham Artist
              </p>

              {/* Tagline */}
              <p className="text-2xl text-gray-800 mb-12 leading-relaxed font-light max-w-lg">
                {artistInfo.tagline}
              </p>

              {/* CTA Button - Minimal */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <Button
                  onClick={scrollToAudio}
                  className="bg-black text-white hover:bg-gray-800 px-10 py-7 text-base font-light tracking-wider uppercase transition-all duration-300 shadow-lg hover:shadow-2xl"
                >
                  <Play className="mr-3 h-4 w-4" fill="white" />
                  Listen
                </Button>
              </motion.div>

              {/* Stats - Minimal */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="flex gap-12 mt-16 pt-12 border-t border-black/10"
              >
                <div>
                  <div className="text-4xl font-light text-black mb-1">{artistInfo.yearsOfExperience}</div>
                  <div className="text-xs text-gray-500 tracking-widest uppercase">Years</div>
                </div>
                <div>
                  <div className="text-4xl font-light text-black mb-1">{artistInfo.templesPerformed}+</div>
                  <div className="text-xs text-gray-500 tracking-widest uppercase">Temples</div>
                </div>
                <div>
                  <div className="text-4xl font-light text-black mb-1">50+</div>
                  <div className="text-xs text-gray-500 tracking-widest uppercase">Ragas</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Large Artist Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                {/* Main Image */}
                <div className="relative overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1598000938546-d8b840f69952?w=800&h=1000&fit=crop"
                    alt="Vaidehi Suresh"
                    className="w-full h-[700px] object-cover"
                  />
                  
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Floating label */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                  className="absolute -left-8 bottom-12 bg-white shadow-xl px-8 py-6"
                >
                  <p className="text-xs tracking-widest uppercase text-gray-500 mb-1">Kerala</p>
                  <p className="text-lg font-light text-black">Thrissur</p>
                </motion.div>

                {/* Accent square */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  className="absolute -right-6 -top-6 w-32 h-32 border border-[#c9a961]/30"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Minimal */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-px h-12 bg-black/20" />
          <ArrowDown className="h-5 w-5 text-black/30" strokeWidth={1} />
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};

export default Hero;