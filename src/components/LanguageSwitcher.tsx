import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/types/localization';
import { motion, AnimatePresence } from 'framer-motion';

const languages: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'no', label: 'Norsk' },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage(); // Remove languageName

  const handleLanguageChange = () => {
    const currentIndex = languages.findIndex(lang => lang.code === language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex].code);
  };

  return (
    <motion.button
      onClick={handleLanguageChange}
      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors relative group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      // Update aria-label to use language code
      aria-label={`Current language: ${language}. Click to switch language`} 
    >
      <Globe className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
      <AnimatePresence mode="wait">
        <motion.span
          key={language}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="text-sm font-medium min-w-[48px]"
        >
          {/* Display language code or label directly */}
          {languages.find(lang => lang.code === language)?.label || language.toUpperCase()} 
        </motion.span>
      </AnimatePresence>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
        {language === 'en' ? 'Bytt til norsk' : 'Switch to English'}
      </div>
    </motion.button>
  );
}
