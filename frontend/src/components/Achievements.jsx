import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Trophy, Star, Medal, Music2, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Achievements = () => {
  const { language, content } = useLanguage();
  const t = content[language];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const achievementIcons = [Award];
  const achievements = t.achievements.items.map((item, index) => ({
    icon: achievementIcons[index] || Award,
    ...item
  }));

  const milestones = [
    { number: t.templesPerformed + '+', label: t.achievements.milestones.temples, description: language === 'en' ? "Across Kerala and South India" : "കേരളത്തിലും ദക്ഷിണേന്ത്യയിലും" },
    { number: "1000+", label: t.achievements.milestones.performances || (language === 'en' ? 'Performances' : 'അവതരണങ്ങൾ'), description: language === 'en' ? "Temple ceremonies and cultural events" : "ക്ഷേത്ര ചടങ്ങുകളും സാംസ്കാരിക പരിപാടികളും" },
    { number: t.yearsOfExperience + '+', label: t.achievements.milestones.years, description: language === 'en' ? "Dedicated to Sopana Sangeetham" : "സോപാന സംഗീതത്തിന് സമർപ്പിച്ചത്" },
    { number: "50+", label: t.achievements.milestones.ragas, description: language === 'en' ? "Traditional and rare compositions" : "പരമ്പരാഗതവും അപൂർവവുമായ രചനകൾ" }
  ];

  return (
    <section
      ref={ref}
      className="relative py-32 px-6 bg-gradient-to-b from-[#1a0a0a] to-[#0a0a0a] overflow-hidden"
    >
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
            {t.achievements.title}
          </h2>

          <p className="text-gray-400 text-sm tracking-[0.3em] uppercase">
            Honors in Preserving Traditional Temple Music
          </p>
        </motion.div>

        {/* Milestones */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="text-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#800020]/20 to-[#d4af37]/20 blur-xl" />
                <div className="relative border-2 border-[#d4af37]/30 bg-black/50 p-6 hover:border-[#d4af37]/60 transition-colors duration-300">
                  <div className="text-4xl md:text-5xl font-bold text-[#d4af37] mb-2 font-cormorant">
                    {milestone.number}
                  </div>
                  <div className={`text-white font-semibold mb-1 ${language === 'ml' ? 'malayalam-text' : ''}`}>{milestone.label}</div>
                  <div className={`text-xs text-gray-500 ${language === 'ml' ? 'malayalam-text' : ''}`}>{milestone.description}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Awards Timeline */}
        <div className="space-y-6">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="relative group"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-[#800020]/10 to-[#d4af37]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative border border-[#d4af37]/30 bg-black/50 p-6 hover:border-[#d4af37]/60 transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 border-2 border-[#d4af37]/50 flex items-center justify-center group-hover:border-[#d4af37] group-hover:scale-110 transition-all duration-300">
                        <Icon className="h-8 w-8 text-[#d4af37]" strokeWidth={1.5} />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="px-3 py-1 bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#d4af37] text-sm font-semibold">
                          {achievement.year}
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-r from-[#d4af37]/50 to-transparent" />
                      </div>

                      <h3 className={`font-cormorant text-2xl font-semibold text-[#d4af37] mb-2 ${language === 'ml' ? 'malayalam-text' : ''}`}>
                        {achievement.title}
                      </h3>

                      <p className={`text-gray-400 leading-relaxed ${language === 'ml' ? 'malayalam-text' : ''}`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* SEO-rich footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 2 }}
          className="mt-16 text-center"
        >
          <p className={`text-gray-300 text-base max-w-4xl mx-auto leading-relaxed ${language === 'ml' ? 'malayalam-text' : ''}`}>
            {t.achievements.introParagraph}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;