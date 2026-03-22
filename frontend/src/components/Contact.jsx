import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { contactInfo, artistInfo } from '../mock';
import { MessageCircle, MapPin, Mail } from 'lucide-react';
import BookingForm from './BookingForm';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative py-32 px-6 bg-gradient-to-b from-[#0a0a0a] to-black overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
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
            Get in Touch
          </h2>

          <p className="text-gray-400 text-sm tracking-[0.3em] uppercase">
            Book a Performance
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-cormorant text-3xl font-semibold text-[#d4af37] mb-6">
                Connect With Me
              </h3>
              <p className="text-gray-400 leading-relaxed mb-8">
                For temple performances, cultural events, or devotional concerts, feel free to reach out. 
                I bring the sacred melodies of Kerala's ancient traditions to your sacred spaces.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 border border-[#d4af37]/30 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-[#d4af37]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Location</h4>
                  <p className="text-gray-400 text-sm">{contactInfo.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 border border-[#d4af37]/30 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-[#d4af37]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Email</h4>
                  <p className="text-gray-400 text-sm">{contactInfo.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 border border-[#d4af37]/30 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-[#d4af37]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">WhatsApp</h4>
                  <p className="text-gray-400 text-sm">{contactInfo.whatsapp}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 border border-[#d4af37]/20 bg-black/50">
              <p className="text-gray-400 text-sm text-center italic">
                "Every performance is a prayer, every note a blessing. 
                Let us create sacred musical moments together."
              </p>
              <p className="text-[#d4af37] text-center mt-4 font-cormorant text-lg">
                - {artistInfo.name}
              </p>
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <BookingForm />
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 pt-12 border-t border-[#d4af37]/20 text-center"
        >
          <div className="h-px w-20 bg-[#d4af37] mx-auto mb-6" />
          <p className="text-gray-500 text-sm">
            © 2025 {artistInfo.name}. Preserving the Sacred Traditions of Sopana Sangeetham.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Website crafted with devotion
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;