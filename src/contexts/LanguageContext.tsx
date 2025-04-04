"use client";

import { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "no";

interface LanguageContextType {
  language: Language;
  locale: string; // Add locale string (e.g., 'en-US', 'nb-NO')
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    // Try to get language from localStorage first
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "no")) {
      setLanguage(savedLanguage);
      return;
    }

    // Otherwise detect from browser
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("no")) {
      setLanguage("no");
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
  };

  // Determine locale string based on language state
  const locale = language === 'no' ? 'nb-NO' : 'en-US';

  return (
    <LanguageContext.Provider
      value={{
        language,
        locale, // Provide the locale string
        setLanguage: handleSetLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
