import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, User, BookOpen, Music, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Training = () => {
  const { language, content } = useLanguage();
  const t = content[language];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const educationIcons = [GraduationCap, BookOpen, Music];
  const education = t.training.education.map((item, index) => ({
    icon: educationIcons[index] || GraduationCap,
    ...item
  }));

  const gurus = t.training.gurus;

  return (
    <section
      ref={ref}
      className="relative py-32 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#1a0a0a] overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 border border-[#d4af37]/10 rounded-full" />
      <div className="absolute bottom-20 left-20 w-48 h-48 border border-[#800020]/10 rounded-full" />

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
            {t.training.title}
          </h2>

          <p className={`text-gray-400 text-sm tracking-[0.3em] uppercase ${language === 'ml' ? 'malayalam-text' : ''}`}>
            {t.training.subtitle}
          </p>
        </motion.div>

        {/* Education Section */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="font-cormorant text-3xl font-semibold text-[#d4af37] mb-8 text-center"
          >
            Formal Education
          </motion.h3>

          <div className="space-y-6">
            {education.map((edu, index) => {
              const Icon = edu.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#d4af37]/5 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative border border-[#d4af37]/30 bg-black/50 p-6 hover:border-[#d4af37]/60 transition-all duration-300">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 border-2 border-[#d4af37]/50 flex items-center justify-center">
                          <Icon className="h-7 w-7 text-[#d4af37]" strokeWidth={1.5} />
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className={`font-cormorant text-xl font-semibold text-[#d4af37] ${language === 'ml' ? 'malayalam-text' : ''}`}>
                            {edu.title}
                          </h4>
                        </div>

                        <p className={`text-gray-400 text-sm mb-2 ${language === 'ml' ? 'malayalam-text' : ''}`}>{edu.institution}</p>
                        <p className={`text-gray-500 text-sm leading-relaxed ${language === 'ml' ? 'malayalam-text' : ''}`}>{edu.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Gurus Section */}
        <div>
          <motion.h3
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className={`font-cormorant text-3xl font-semibold text-[#d4af37] mb-8 text-center ${language === 'ml' ? 'malayalam-text' : ''}`}
          >
            {t.training.gurusTitle}
          </motion.h3>

          <div className="grid md:grid-cols-1 gap-6">
            {gurus.map((guru, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-[#800020]/10 to-[#d4af37]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative border-2 border-[#d4af37]/30 bg-black/50 p-8 hover:border-[#d4af37]/60 transition-all duration-300">
                  <div className="flex items-start gap-4 mb-4">
                    <User className="h-6 w-6 text-[#d4af37] flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h4 className={`font-cormorant text-2xl font-bold text-[#d4af37] mb-1 ${language === 'ml' ? 'malayalam-text' : ''}`}>
                        {guru.name}
                      </h4>
                      <p className={`text-gray-400 text-sm mb-2 ${language === 'ml' ? 'malayalam-text' : ''}`}>{guru.title}</p>
                    </div>
                  </div>

                  <p className={`text-gray-400 leading-relaxed mb-4 ${language === 'ml' ? 'malayalam-text' : ''}`}>{guru.description}</p>

                  <div className="flex items-center gap-2 pt-4 border-t border-[#d4af37]/20">
                    <Sparkles className="h-4 w-4 text-[#d4af37]" />
                    <span className={`text-xs text-gray-500 italic ${language === 'ml' ? 'malayalam-text' : ''}`}>{guru.specialization}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SEO-rich footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 2 }}
          className="mt-16 text-center"
        >
          <p className={`text-gray-300 text-base max-w-4xl mx-auto leading-relaxed ${language === 'ml' ? 'malayalam-text' : ''}`}>
            {t.training.introParagraph}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Training;