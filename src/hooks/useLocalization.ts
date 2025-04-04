import { useLanguage } from '@/contexts/LanguageContext'; // Import the hook
import { LocalizedContent } from '@/types/localization';

export function useLocalization() {
  const { language } = useLanguage(); // Use the hook

  const getLocalizedContent = (content: LocalizedContent): string => {
    return content[language] || content.en;
  };

  return {
    getLocalizedContent,
    language
  };
}
