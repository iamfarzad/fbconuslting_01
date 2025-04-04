import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalization } from '@/hooks/useLocalization';
import { Language, LocalizedContent } from '@/types/localization';
import { formatLocalizedDate, formatLocalizedPrice, getLocalizedError } from '@/utils/language';

export interface WithLocalizationProps {
  language: Language;
  getLocalizedContent: (content: LocalizedContent) => string;
  formatDate: (date: Date) => string;
  formatPrice: (amount: number) => string;
  getError: (error: Error) => string;
}

export function withLocalization<P extends WithLocalizationProps>(
  WrappedComponent: React.ComponentType<P>
): React.FC<Omit<P, keyof WithLocalizationProps>> {
  return function WithLocalizationWrapper(props: Omit<P, keyof WithLocalizationProps>) {
    const { language } = useLanguage();
    const { getLocalizedContent } = useLocalization();

    const localizationProps: WithLocalizationProps = {
      language,
      getLocalizedContent,
      formatDate: (date: Date) => formatLocalizedDate(date, language),
      formatPrice: (amount: number) => formatLocalizedPrice(amount, language),
      getError: (error: Error) => getLocalizedError(error, language),
    };

    return <WrappedComponent {...(props as P)} {...localizationProps} />;
  };
}

// Example usage:
/*
interface MyComponentProps extends WithLocalizationProps {
  title: LocalizedContent;
  price: number;
}

function MyComponent({ title, price, getLocalizedContent, formatPrice }: MyComponentProps) {
  return (
    <div>
      <h1>{getLocalizedContent(title)}</h1>
      <p>Price: {formatPrice(price)}</p>
    </div>
  );
}

export default withLocalization(MyComponent);
*/
