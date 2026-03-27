import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed top-8 right-24 sm:right-32 z-50"
    >
      <button
        onClick={toggleLanguage}
        className="flex items-center gap-2 bg-black/50 backdrop-blur-sm border border-[#d4af37]/30 px-4 py-2 rounded-full hover:border-[#d4af37]/60 transition-all duration-300 group"
        aria-label="Toggle Language"
      >
        <span
          className={`text-sm font-semibold transition-colors duration-300 ${
            language === 'en' ? 'text-[#d4af37]' : 'text-gray-500'
          }`}
        >
          EN
        </span>
        <span className="text-gray-500">|</span>
        <span
          className={`text-sm font-semibold transition-colors duration-300 ${
            language === 'ml' ? 'text-[#d4af37]' : 'text-gray-500'
          }`}
        >
          മ
        </span>
      </button>
    </motion.div>
  );
};

export default LanguageToggle;
