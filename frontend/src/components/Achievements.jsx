import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Trophy, Star, Medal, Music2, Heart } from 'lucide-react';

const Achievements = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const achievements = [
    {
      icon: Award,
      year: "2023",
      title: "Kerala Sangeetha Nataka Akademi Recognition",
      description: "Honored for outstanding contribution to preserving and promoting Sopana Sangeetham and traditional Kerala temple music."
    },
    {
      icon: Trophy,
      year: "2022",
      title: "Best Temple Music Performance Award",
      description: "Received at the Annual Kerala Classical Music Festival for exemplary rendition of traditional ragas at Thrissur Pooram."
    },
    {
      icon: Star,
      year: "2021",
      title: "Cultural Heritage Ambassador",
      description: "Appointed as cultural ambassador for promoting Kerala's intangible heritage of Sopana Sangeetham to national and international audiences."
    },
    {
      icon: Medal,
      year: "2020",
      title: "Excellence in Traditional Arts",
      description: "Recognized by the Ministry of Culture for dedication to maintaining the authentic tradition of temple music across Kerala's major temples."
    },
    {
      icon: Music2,
      year: "2019",
      title: "Guruvayur Temple Lifetime Performer",
      description: "Selected for permanent association with Guruvayur Sri Krishna Temple for annual festival performances and special ceremonies."
    },
    {
      icon: Heart,
      year: "2018",
      title: "Devotional Music Excellence Award",
      description: "Honored for bringing spiritual depth and technical mastery to performances at Sabarimala and other major pilgrimage centers."
    }
  ];

  const milestones = [
    { number: "50+", label: "Temples Performed", description: "Across Kerala and South India" },
    { number: "500+", label: "Performances", description: "Temple ceremonies and cultural events" },
    { number: "15+", label: "Years Experience", description: "Dedicated to Sopana Sangeetham" },
    { number: "20+", label: "Ragas Mastered", description: "Traditional and rare compositions" }
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

          <h2 className="font-cormorant text-5xl md:text-6xl font-bold text-[#d4af37] mb-6">
            Achievements & Recognition
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
                  <div className="text-white font-semibold mb-1">{milestone.label}</div>
                  <div className="text-xs text-gray-500">{milestone.description}</div>
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

                      <h3 className="font-cormorant text-2xl font-semibold text-[#d4af37] mb-2">
                        {achievement.title}
                      </h3>

                      <p className="text-gray-400 leading-relaxed">
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
          <p className="text-gray-500 text-sm max-w-4xl mx-auto leading-relaxed">
            <strong className="text-[#d4af37]">Award-winning Sopana Sangeetham artist</strong> Vaidehi Suresh has been recognized 
            by Kerala's cultural institutions for excellence in traditional temple music. Her performances at prestigious venues like 
            Guruvayur Temple, Sabarimala, and Thrissur Pooram have earned critical acclaim. She continues to preserve and promote 
            the authentic tradition of Kerala temple music through performances and teaching.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;