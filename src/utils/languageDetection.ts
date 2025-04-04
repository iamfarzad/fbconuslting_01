import { Language } from '@/types/localization';

export function getInitialLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'en'; // Default to English on server-side
  }

  // Check local storage first
  const savedLanguage = localStorage.getItem('preferredLanguage') as Language;
  if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'no')) {
    return savedLanguage;
  }

  // Check browser language settings
  const browserLanguages = navigator.languages || [navigator.language];
  
  // Look for Norwegian language codes
  const norwegianCodes = ['no', 'nb', 'nn', 'nb-NO', 'nn-NO', 'no-NO'];
  const hasNorwegianPreference = browserLanguages.some(lang => 
    norwegianCodes.some(code => lang.toLowerCase().startsWith(code))
  );

  return hasNorwegianPreference ? 'no' : 'en';
}

export function getBrowserLocale(): string {
  if (typeof window === 'undefined') {
    return 'en-US';
  }

  const browserLanguage = navigator.language || 'en-US';
  return browserLanguage;
}

export function formatDate(date: Date, language: Language): string {
  const locale = language === 'no' ? 'nb-NO' : 'en-US';
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export function formatNumber(num: number, language: Language): string {
  const locale = language === 'no' ? 'nb-NO' : 'en-US';
  return new Intl.NumberFormat(locale).format(num);
}

export function getLanguageName(code: Language): string {
  const names = {
    en: 'English',
    no: 'Norsk'
  };
  return names[code];
}
