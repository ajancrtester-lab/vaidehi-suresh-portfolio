import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { fetchTestimonials } from '../services/api';
import { Quote } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch testimonials from API
  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setLoading(true);
        const data = await fetchTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error('Failed to load testimonials:', error);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="relative py-32 px-6 bg-gradient-to-b from-[#0a0a0a] via-[#1a0a0a] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-[#d4af37] text-xl">Loading testimonials...</div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null; // Hide section if no testimonials
  }

  return (
    <section
      ref={ref}
      className="relative py-32 px-6 bg-gradient-to-b from-[#0a0a0a] via-[#1a0a0a] to-[#0a0a0a] overflow-hidden"
    >
      {/* Background glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[120px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

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
            Testimonials
          </h2>

          <p className="text-gray-400 text-sm tracking-[0.3em] uppercase">
            Voices of Appreciation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <Card className="border-[#d4af37]/30 bg-black/50 hover:border-[#d4af37]/60 transition-all duration-300 h-full group">
                <CardContent className="p-8">
                  <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                    <Quote className="h-16 w-16 text-[#d4af37]" />
                  </div>

                  <div className="relative z-10">
                    <p className="text-gray-300 text-lg leading-relaxed font-light italic mb-6">
                      "{testimonial.quote}"
                    </p>

                    <div className="h-px w-full bg-gradient-to-r from-[#d4af37]/50 via-transparent to-transparent mb-6" />

                    <div className="flex items-center gap-4">
                      <Avatar className="w-14 h-14 border-2 border-[#d4af37]/50">
                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                        <AvatarFallback className="bg-[#800020] text-white">
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <h4 className="font-cormorant text-xl font-semibold text-[#d4af37]">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-400">{testimonial.role}</p>
                        <p className="text-xs text-gray-500">{testimonial.temple}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;