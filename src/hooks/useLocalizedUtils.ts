import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalization } from '@/hooks/useLocalization';
import { LocalizedContent } from '@/types/localization';
import {
  formatLocalizedDate,
  formatLocalizedPrice,
  formatLocalizedNumber,
  getLocalizedError,
  getLocalizedMetadata,
  getSocialShareText
} from '@/utils/language';

export function useLocalizedUtils() {
  const { language } = useLanguage();
  const { getLocalizedContent } = useLocalization();

  return {
    // Basic language utilities
    language,
    getLocalizedContent,
    t: (content: LocalizedContent) => getLocalizedContent(content),

    // Formatting utilities
    formatDate: (date: Date) => formatLocalizedDate(date, language),
    formatPrice: (amount: number) => formatLocalizedPrice(amount, language),
    formatNumber: (num: number) => formatLocalizedNumber(num, language),

    // Content utilities
    getError: (error: Error) => getLocalizedError(error, language),
    getMetadata: (key: string) => getLocalizedMetadata(key, language),
    getSocialShareText: (title: string) => getSocialShareText(title, language),

    // Helper for checking current language
    isNorwegian: language === 'no',
    isEnglish: language === 'en',

    // Helper for currency symbol
    currencySymbol: language === 'no' ? 'kr' : '$',

    // Helper for full language name
    languageName: language === 'no' ? 'Norsk' : 'English'
  };
}

// Example usage:
/*
function PricingCard({ price, title }: { price: number; title: LocalizedContent }) {
  const { t, formatPrice, currencySymbol, isNorwegian } = useLocalizedUtils();

  return (
    <div>
      <h3>{t(title)}</h3>
      <p>{formatPrice(price)}</p>
      <small>
        {isNorwegian ? 'Priser inkl. mva.' : 'Prices include VAT'}
      </small>
    </div>
  );
}
*/
