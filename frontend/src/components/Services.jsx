import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Music, Users, Home, GraduationCap, Sparkles, Calendar } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    {
      icon: Music,
      title: "Temple Ceremonies & Festivals",
      description: "Authentic Sopana Sangeetham performances for temple rituals, daily poojas, and major festivals. Specializing in traditional Kerala temple music that enhances the divine atmosphere of sacred ceremonies.",
      keywords: "Temple music, Kerala festivals, Sopana Sangeetham, Religious ceremonies"
    },
    {
      icon: Users,
      title: "Cultural Events & Concerts",
      description: "Classical music concerts for cultural organizations, sangeetha sabhas, and heritage events. Presenting the rich tradition of Kerala's temple music to wider audiences with authentic renditions of classical ragas.",
      keywords: "Classical concert, Cultural events, Kerala music, Traditional performance"
    },
    {
      icon: Home,
      title: "Private Performances",
      description: "Intimate devotional music sessions for private functions, family ceremonies, and special occasions. Bringing the sacred melodies of temple music to your home with personalized performances.",
      keywords: "Private concert, Home ceremony, Devotional music, Family event"
    },
    {
      icon: GraduationCap,
      title: "Music Workshops & Training",
      description: "Conducting workshops and training sessions on Sopana Sangeetham, teaching the traditional techniques, ragas, and spiritual aspects of Kerala temple music to aspiring musicians and devotees.",
      keywords: "Music training, Sopana Sangeetham lessons, Kerala music education, Classical training"
    },
    {
      icon: Calendar,
      title: "Annual Temple Performances",
      description: "Regular annual performances at major Kerala temples including Sabarimala, Guruvayur, and Thrissur Pooram. Maintaining the living tradition of temple music through consistent yearly engagements.",
      keywords: "Sabarimala music, Guruvayur performance, Thrissur Pooram, Annual temple events"
    },
    {
      icon: Sparkles,
      title: "Special Occasion Music",
      description: "Devotional music for weddings, housewarming ceremonies, and auspicious occasions. Traditional Sopana Sangeetham renditions that invoke blessings and create a sacred atmosphere for important life events.",
      keywords: "Wedding music, Auspicious ceremony, Kerala wedding, Traditional blessing music"
    }
  ];

  return (
    <section
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

          <h2 className="font-cormorant text-5xl md:text-6xl font-bold text-[#d4af37] mb-6">
            Services Offered
          </h2>

          <p className="text-gray-400 text-sm tracking-[0.3em] uppercase mb-4">
            Bringing Sacred Temple Music to Every Occasion
          </p>
          
          <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
            As a dedicated Sopana Sangeetham artist, I offer authentic Kerala temple music performances for various occasions. 
            With 15+ years of experience, I bring the divine melodies of traditional ragas to temples, cultural events, and private ceremonies across Kerala.
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

                    <h3 className="font-cormorant text-2xl font-semibold text-[#d4af37] mb-3">
                      {service.title}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>

                    <div className="pt-4 border-t border-[#d4af37]/20">
                      <p className="text-xs text-gray-500 italic">
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
          <p className="text-gray-500 text-sm max-w-4xl mx-auto leading-relaxed">
            <strong className="text-[#d4af37]">Vaidehi Suresh</strong> is a renowned Sopana Sangeetham artist from Thrissur, Kerala, 
            specializing in traditional temple music performances. With expertise in classical ragas like Madhyamavati, Mohana, and Bhairavi, 
            she brings authentic devotional music to temples across Kerala including Sabarimala, Guruvayur, and Padmanabhaswamy Temple. 
            Available for bookings throughout Kerala and India.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;