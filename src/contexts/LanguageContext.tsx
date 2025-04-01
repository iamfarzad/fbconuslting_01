import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'no';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  availableLanguages: Language[];
}

const translations = {
  en: {
    // Add English translations here
    'hero.title': 'Welcome to FB Consulting',
    'hero.subtitle': 'AI Solutions for Business',
    // Add more translations as needed
  },
  no: {
    // Add Norwegian translations here
    'hero.title': 'Velkommen til FB Consulting',
    'hero.subtitle': 'AI-løsninger for bedrifter',
    // Add more translations as needed
  },
};

const availableLanguages: Language[] = ['en', 'no'];

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
  availableLanguages
});

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
