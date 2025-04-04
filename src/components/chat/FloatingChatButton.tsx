import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export function FloatingChatButton() {
  const { language } = useLanguage();

  const text = {
    en: 'Chat with AI Assistant',
    no: 'Chat med AI-assistent'
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <button
        className="bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow group"
        aria-label={text[language]}
      >
        <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        <span className="sr-only">{text[language]}</span>
      </button>
    </motion.div>
  );
}
