import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Music, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useArtistInfo } from '../context/ArtistInfoContext';

const About = () => {
  const { language, content } = useLanguage();
  const { artistInfo } = useArtistInfo();
  const t = content[language];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { icon: Music, label: language === 'en' ? 'Years of Practice' : 'വർഷത്തെ പരിശീലനം', value:t.yearsOfExperience },
    { icon: Award, label: language === 'en' ? 'Temples Performed' : 'ക്ഷേത്രങ്ങളിൽ അവതരണം', value: `${artistInfo?.templesPerformed || t.templesPerformed}+` },
    { icon: Heart, label: language === 'en' ? 'Devotional Ragas' : 'ഭക്തി രാഗങ്ങൾ', value: '50+' }
  ];

  return (
    <section
      ref={ref}
      className="relative py-32 px-6 bg-gradient-to-b from-[#0a0a0a] via-[#1a0a0a] to-[#0a0a0a] overflow-hidden"
    >
      {/* Decorative mandala background */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-5">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#d4af37" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="#d4af37" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="40" fill="none" stroke="#d4af37" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="20" fill="none" stroke="#d4af37" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ width: 0 }}
            animate={isInView ? { width: '100px' } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
          </motion.div>

          <h2 className={`font-cormorant text-5xl md:text-6xl font-bold text-[#d4af37] mb-6 ${language === 'ml' ? 'malayalam-text' : ''}`}>
            {t.about.title}
          </h2>

          <p className={`text-gray-400 text-sm tracking-[0.3em] uppercase ${language === 'ml' ? 'malayalam-text' : ''}`}>
            {t.about.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#800020]/20 to-[#d4af37]/20 blur-2xl" />
              <img
                src="/images/vaidhu_03.jpeg"
                alt="Vaidehi Suresh"
                className="relative w-full h-[500px] object-cover border border-[#d4af37]/30 shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-[#d4af37]/50" />
              <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-[#800020]/50" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-6"
          >
            <p className={`text-gray-300 text-lg leading-relaxed font-light ${language === 'ml' ? 'malayalam-text' : ''}`}>
              {t.description}
            </p>

            <p className={`text-gray-300 text-lg leading-relaxed font-light ${language === 'ml' ? 'malayalam-text' : ''}`}>
              {t.performance.description}
            </p>

            <p className={`text-gray-300 text-lg leading-relaxed font-light ${language === 'ml' ? 'malayalam-text' : ''}`}>
              {t.performance.national}
            </p>

            <div className="pt-6">
              <div className="h-px w-full bg-gradient-to-r from-[#d4af37]/50 via-transparent to-transparent mb-6" />
              <p className={`text-[#d4af37] italic font-cormorant text-xl ${language === 'ml' ? 'malayalam-text' : ''}`}>
                "{t.about.quote}"
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#800020]/10 to-[#d4af37]/10 blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative border border-[#d4af37]/30 p-8 text-center hover:border-[#d4af37]/60 transition-colors duration-300">
                  <Icon className="h-12 w-12 text-[#d4af37] mx-auto mb-4" strokeWidth={1.5} />
                  <div className="text-4xl font-bold text-white mb-2 font-cormorant">
                    {stat.value}
                  </div>
                  <div className={`text-gray-400 text-sm tracking-wider uppercase ${language === 'ml' ? 'malayalam-text' : ''}`}>
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default About;