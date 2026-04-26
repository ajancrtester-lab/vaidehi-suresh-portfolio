import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Music, Users, Home, GraduationCap, Sparkles, Calendar } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { useLanguage } from '../context/LanguageContext';

const Services = () => {
  const { language, content } = useLanguage();
  const t = content[language];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const serviceIcons = [Music, Users, Home, GraduationCap, Calendar, Sparkles];
  
  const services = t.services.items.map((item, index) => ({
    icon: serviceIcons[index],
    ...item
  }));

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-32 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#1a0a0a] overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#800020]/5 rounded-full blur-[100px]" />

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
            {t.services.title}
          </h2>

          <p className={`text-gray-400 text-sm tracking-[0.3em] uppercase mb-4 ${language === 'ml' ? 'malayalam-text' : ''}`}>
            {t.services.subtitle}
          </p>
          
          <p className={`text-gray-300 max-w-3xl mx-auto leading-relaxed ${language === 'ml' ? 'malayalam-text' : ''}`}>
            {t.services.intro}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <Card className="border-[#d4af37]/30 bg-black/50 hover:border-[#d4af37]/60 transition-all duration-300 h-full group">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className="w-14 h-14 border-2 border-[#d4af37]/50 flex items-center justify-center group-hover:border-[#d4af37] group-hover:scale-110 transition-all duration-300">
                        <Icon className="h-7 w-7 text-[#d4af37]" strokeWidth={1.5} />
                      </div>
                    </div>

                    <h3 className={`font-cormorant text-2xl font-semibold text-[#d4af37] mb-3 ${language === 'ml' ? 'malayalam-text' : ''}`}>
                      {service.title}
                    </h3>

                    <p className={`text-gray-400 text-sm leading-relaxed mb-4 ${language === 'ml' ? 'malayalam-text' : ''}`}>
                      {service.description}
                    </p>

                    <div className="pt-4 border-t border-[#d4af37]/20">
                      <p className={`text-xs text-gray-500 italic ${language === 'ml' ? 'malayalam-text' : ''}`}>
                        {service.keywords}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* SEO-rich footer text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
          className="mt-16 text-center"
        >
          <p className={`text-gray-500 text-sm max-w-4xl mx-auto leading-relaxed ${language === 'ml' ? 'malayalam-text' : ''}`}>
            <strong className="text-[#d4af37]">{t.name}</strong> {t.services.footer}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;