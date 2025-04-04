import { LocalizedContent, Language } from '@/types/localization';

export function getLanguageDirection(language: Language): 'ltr' | 'rtl' {
  // For now, both English and Norwegian are LTR
  // This function is ready for when we add RTL languages
  return 'ltr';
}

export function formatLocalizedNumber(number: number, language: Language): string {
  const locale = language === 'no' ? 'nb-NO' : 'en-US';
  return new Intl.NumberFormat(locale).format(number);
}

export function formatLocalizedDate(date: Date, language: Language): string {
  const locale = language === 'no' ? 'nb-NO' : 'en-US';
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export function formatLocalizedPrice(amount: number, language: Language): string {
  const locale = language === 'no' ? 'nb-NO' : 'en-US';
  const currency = language === 'no' ? 'NOK' : 'USD';
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getLocalizedError(error: Error, language: Language): string {
  const errorMessages: Record<string, LocalizedContent> = {
    'NOT_FOUND': {
      en: 'The requested resource was not found.',
      no: 'Den forespurte ressursen ble ikke funnet.'
    },
    'NETWORK_ERROR': {
      en: 'A network error occurred. Please check your connection.',
      no: 'En nettverksfeil oppstod. Vennligst sjekk tilkoblingen din.'
    },
    'UNAUTHORIZED': {
      en: 'You are not authorized to perform this action.',
      no: 'Du har ikke tillatelse til å utføre denne handlingen.'
    },
    'DEFAULT': {
      en: 'An error occurred. Please try again.',
      no: 'En feil oppstod. Vennligst prøv igjen.'
    }
  };

  const errorKey = Object.keys(errorMessages).find(key => 
    error.message.includes(key)
  ) || 'DEFAULT';

  return errorMessages[errorKey][language];
}

export function getLocalizedMetadata(key: string, language: Language): LocalizedContent {
  const metadata: Record<string, LocalizedContent> = {
    'site_name': {
      en: 'AI Builder',
      no: 'AI Builder Norge'
    },
    'tagline': {
      en: 'Build Smarter Solutions',
      no: 'Bygg Smartere Løsninger'
    },
    'cookie_notice': {
      en: 'We use cookies to improve your experience.',
      no: 'Vi bruker informasjonskapsler for å forbedre din opplevelse.'
    }
  };

  return metadata[key] || { en: key, no: key };
}

export function getSocialShareText(title: string, language: Language): string {
  const templates: LocalizedContent = {
    en: 'Check out this amazing article:',
    no: 'Se denne interessante artikkelen:'
  };

  return `${templates[language]} ${title}`;
}
