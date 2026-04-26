import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

/**
 * SEO Content Component
 * Adds keyword-rich content for Google Search and AI Overview
 * WITHOUT changing the existing UI/UX design
 */
const SEOContent = () => {
  const { language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Only show English content for SEO (Malayalam handled by existing components)
  if (language !== 'en') return null;

  return (
    <section
      ref={ref}
      id="sopana-sangeetham-kerala"
      className="relative py-20 px-6 bg-gradient-to-b from-[#0a0a0a] via-[#1a0f0a] to-[#0a0a0a] overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #d4af37 1px, transparent 0)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-8 text-gray-300"
        >
          {/* Main SEO Heading */}
          <div className="text-center mb-12">
            <motion.div
              className="inline-block mb-4"
              initial={{ width: 0 }}
              animate={isInView ? { width: '100px' } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
            </motion.div>
            
            <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-[#d4af37] mb-4">
              Sopana Sangeetham Artist in Kerala
            </h2>
            <p className="text-gray-400 text-sm tracking-[0.3em] uppercase">
              Preserving Kerala's Sacred Musical Heritage
            </p>
          </div>

          {/* Introduction Paragraph with Keywords */}
          <div className="prose prose-invert max-w-none">
            <p className="text-lg leading-relaxed mb-6">
              <strong className="text-[#d4af37]">Vaidehi Suresh</strong> is a renowned <strong>Sopana Sangeetham artist in Kerala</strong>, specializing in authentic temple music performances across Thrissur, Guruvayur, and temples throughout India. With over 13 years of dedicated practice and performances in more than 750 temples, Vaidehi has established herself as one of the leading <strong>Sopana Sangeetham artists in Thrissur</strong> and Kerala.
            </p>

            <h3 className="text-2xl font-cormorant text-[#d4af37] mt-10 mb-4">
              What is Sopana Sangeetham?
            </h3>
            <p className="text-base leading-relaxed mb-6">
              Sopana Sangeetham (സോപാന സംഗീതം) is a unique form of classical music that originated in the temples of Kerala. The term "Sopana" refers to the sacred steps (sopanam) leading to the sanctum sanctorum of Kerala temples, where this divine music was traditionally performed. This ancient art form combines elements of Carnatic classical music with Kerala's rich temple traditions, creating a deeply devotional and spiritually uplifting musical experience.
            </p>

            <h3 className="text-2xl font-cormorant text-[#d4af37] mt-10 mb-4">
              Sopana Sangeetham Artist in Thrissur
            </h3>
            <p className="text-base leading-relaxed mb-6">
              Based in Thrissur, the cultural capital of Kerala, Vaidehi Suresh brings authentic temple music to sacred spaces and cultural events. As a dedicated <strong>Sopana Sangeetham artist in Thrissur</strong>, she has performed at prestigious venues including Guruvayur Temple, Vadakkunnathan Temple, Thruvambady Temple, and numerous other sacred sites across the district. Her deep understanding of Kerala's temple music traditions, combined with rigorous training in Carnatic classical music, makes her performances truly exceptional.
            </p>

            <h3 className="text-2xl font-cormorant text-[#d4af37] mt-10 mb-4">
              Temple Music Performances Across India
            </h3>
            <p className="text-base leading-relaxed mb-6">
              While rooted in Kerala's temple traditions, Vaidehi's artistry has transcended regional boundaries. She has performed as a <strong>Sopana Sangeetham artist in India</strong> at temples and cultural events across multiple states including Mumbai, Delhi, Gujarat, Karnataka, and Tamil Nadu. Her performances at famous Kerala temples like Guruvayur, Vadakkunnathan, Ambalappuzha, Ettumanoor, Paramekkavu, and Mookambika have been highly acclaimed by audiences and temple authorities alike.
            </p>

            <h3 className="text-2xl font-cormorant text-[#d4af37] mt-10 mb-4">
              Idakka Artist Kerala - Traditional Instrumentation
            </h3>
            <p className="text-base leading-relaxed mb-6">
              As an accomplished <strong>Idakka artist in Kerala</strong>, Vaidehi specializes in the traditional hourglass drum that is integral to Sopana Sangeetham performances. The Idakka, along with other percussion instruments like Chenda and Maddalam, forms the rhythmic foundation of temple music. Her expertise in both vocal Sopana Sangeetham and Idakka performances makes her a versatile temple music artist capable of delivering comprehensive traditional programs.
            </p>

            <h3 className="text-2xl font-cormorant text-[#d4af37] mt-10 mb-4">
              Book Sopana Sangeetham Artist for Your Event
            </h3>
            <p className="text-base leading-relaxed mb-6">
              Are you looking to <strong>book a Sopana Sangeetham artist</strong> for your temple festival, cultural event, or devotional program? Vaidehi Suresh offers authentic Kerala temple music performances that bring spiritual depth and cultural authenticity to any occasion. With experience performing at over 750 temples and a deep understanding of traditional compositions and ragas, she can customize performances to suit your specific requirements.
            </p>

            <div className="bg-gradient-to-br from-[#800020]/10 to-[#d4af37]/10 border border-[#d4af37]/30 p-6 rounded-lg mt-8 mb-8">
              <h4 className="text-xl font-cormorant text-[#d4af37] mb-3">
                Why Choose Vaidehi Suresh for Temple Music?
              </h4>
              <ul className="space-y-2 text-base">
                <li>✓ <strong>13+ Years</strong> of dedicated practice and performance experience</li>
                <li>✓ <strong>750+ Temple Performances</strong> across Kerala and India</li>
                <li>✓ Expertise in traditional <strong>Sopana Sangeetham</strong> and <strong>Idakka</strong> performances</li>
                <li>✓ Performed at prestigious temples: Guruvayur, Vadakkunnathan, Ambalappuzha</li>
                <li>✓ Mastery of <strong>50+ devotional ragas</strong> and traditional compositions</li>
                <li>✓ Authentic Kerala temple music tradition preserved and performed</li>
                <li>✓ Available for temple festivals, cultural events, and devotional programs</li>
              </ul>
            </div>

            <h3 className="text-2xl font-cormorant text-[#d4af37] mt-10 mb-4">
              Famous Temples Where Performances Have Been Held
            </h3>
            <p className="text-base leading-relaxed mb-4">
              Vaidehi Suresh has had the honor of performing Sopana Sangeetham at some of Kerala's most revered temples:
            </p>
            <ul className="grid md:grid-cols-2 gap-3 text-base mb-6">
              <li>• Guruvayur Sri Krishna Temple</li>
              <li>• Vadakkunnathan Temple, Thrissur</li>
              <li>• Ambalappuzha Sri Krishna Temple</li>
              <li>• Ettumanoor Mahadeva Temple</li>
              <li>• Thruvambady Sri Krishna Temple</li>
              <li>• Paramekkavu Bagavathi Temple</li>
              <li>• Mookambika Temple</li>
              <li>• Chottanikkara Devi Temple</li>
              <li>• Temples in Mumbai, Delhi, Gujarat</li>
              <li>• Temples in Kanyakumari, Tiruchirappalli</li>
            </ul>

            <h3 className="text-2xl font-cormorant text-[#d4af37] mt-10 mb-4">
              Sopana Sangeetham Booking Process
            </h3>
            <p className="text-base leading-relaxed mb-6">
              To <strong>book Sopana Sangeetham performances</strong> by Vaidehi Suresh for your temple event or cultural program, simply reach out via WhatsApp or the booking form below. Share details about your event including date, venue, type of program, and duration. Whether you need traditional temple sankirtanam, devotional concerts, or festival performances, Vaidehi can tailor the program to meet your spiritual and cultural requirements while maintaining the authentic essence of Kerala temple music.
            </p>

            <div className="text-center mt-10">
              <a 
                href="#contact"
                className="inline-block px-8 py-3 bg-[#d4af37] hover:bg-[#b8941f] text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Book Sopana Sangeetham Artist Now
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SEOContent;
