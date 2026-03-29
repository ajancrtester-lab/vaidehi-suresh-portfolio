import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MessageCircle, MapPin, Mail, Instagram, Youtube, Facebook } from 'lucide-react';
import BookingForm from './BookingForm';
import { useLanguage } from '../context/LanguageContext';
import { useArtistInfo } from '../context/ArtistInfoContext';

const Contact = () => {
  const { language, content } = useLanguage();
  const { contactInfo, artistInfo } = useArtistInfo();
  const t = content[language];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Default contact info as fallback
  const defaultContact = {
    location: 'Thrissur, Kerala, India',
    email: 'contact@example.com',
    whatsapp: '917559926388'
  };

  const defaultArtist = {
    name: 'Vaidehi Suresh'
  };

  const contact = contactInfo || defaultContact;
  const artist = artistInfo || defaultArtist;

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

          <h2 className={`font-cormorant text-5xl md:text-6xl font-bold text-[#d4af37] mb-6 ${language === 'ml' ? 'malayalam-text' : ''}`}>
            {t.contact.title}
          </h2>

          <p className={`text-gray-400 text-sm tracking-[0.3em] uppercase ${language === 'ml' ? 'malayalam-text' : ''}`}>
            {t.contact.subtitle}
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
              <h3 className={`font-cormorant text-3xl font-semibold text-[#d4af37] mb-6 ${language === 'ml' ? 'malayalam-text' : ''}`}>
                {t.contact.connectTitle}
              </h3>
              <p className={`text-gray-400 leading-relaxed mb-8 ${language === 'ml' ? 'malayalam-text' : ''}`}>
                {t.contact.description}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 border border-[#d4af37]/30 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-[#d4af37]" />
                </div>
                <div>
                  <h4 className={`text-white font-semibold mb-1 ${language === 'ml' ? 'malayalam-text' : ''}`}>{t.contact.location}</h4>
                  <p className="text-gray-400 text-sm">{contact.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 border border-[#d4af37]/30 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-[#d4af37]" />
                </div>
                <div>
                  <h4 className={`text-white font-semibold mb-1 ${language === 'ml' ? 'malayalam-text' : ''}`}>{t.contact.email}</h4>
                  <p className="text-gray-400 text-sm">{contact.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 border border-[#d4af37]/30 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-[#d4af37]" />
                </div>
                <div>
                  <h4 className={`text-white font-semibold mb-1 ${language === 'ml' ? 'malayalam-text' : ''}`}>{t.contact.whatsapp}</h4>
                  <p className="text-gray-400 text-sm">{contact.whatsapp}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 border border-[#d4af37]/20 bg-black/50">
              <p className={`text-gray-400 text-sm text-center italic ${language === 'ml' ? 'malayalam-text' : ''}`}>
                "{t.contact.quote}"
              </p>
              <p className={`text-[#d4af37] text-center mt-4 font-cormorant text-lg ${language === 'ml' ? 'malayalam-text' : ''}`}>
                - {language === 'en' ? artist.name : t.name}
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
          
          {/* Social Media Icons */}
          <div className="flex justify-center items-center gap-6 mb-6">
            <motion.a
              href="https://www.instagram.com/iraneesam_vaidehi_suresh/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -3 }}
              className="w-12 h-12 rounded-full border-2 border-[#d4af37]/30 hover:border-[#d4af37] bg-black/50 hover:bg-[#d4af37]/10 flex items-center justify-center transition-all duration-300 group"
            >
              <Instagram className="h-5 w-5 text-[#d4af37] group-hover:text-white transition-colors" />
            </motion.a>
            
            <motion.a
              href="https://www.youtube.com/@sureshnairiranikulam3072"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -3 }}
              className="w-12 h-12 rounded-full border-2 border-[#d4af37]/30 hover:border-[#d4af37] bg-black/50 hover:bg-[#d4af37]/10 flex items-center justify-center transition-all duration-300 group"
            >
              <Youtube className="h-5 w-5 text-[#d4af37] group-hover:text-white transition-colors" />
            </motion.a>
            
            <motion.a
              href="https://www.facebook.com/vaidehi.suresh"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -3 }}
              className="w-12 h-12 rounded-full border-2 border-[#d4af37]/30 hover:border-[#d4af37] bg-black/50 hover:bg-[#d4af37]/10 flex items-center justify-center transition-all duration-300 group"
            >
              <Facebook className="h-5 w-5 text-[#d4af37] group-hover:text-white transition-colors" />
            </motion.a>
          </div>

          <p className={`text-gray-500 text-sm ${language === 'ml' ? 'malayalam-text' : ''}`}>
            © 2025 {language === 'en' ? artist.name : t.name}. {t.contact.copyright}
          </p>
          <p className={`text-gray-600 text-xs mt-2 ${language === 'ml' ? 'malayalam-text' : ''}`}>
            {t.contact.crafted}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;