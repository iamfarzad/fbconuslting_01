import { Metadata } from 'next';
import LocalizationExamplesClientPage from './client-page';

export const metadata: Metadata = {
  title: {
    default: 'Localization Examples | AI Builder',
    template: '%s | AI Builder'
  },
  description: 'Explore our comprehensive localization system with real-world examples and interactive demos.',
  openGraph: {
    title: 'Localization Examples | AI Builder',
    description: 'Interactive demos and examples of our bilingual localization system.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'nb_NO',
  },
};

export default function LocalizationExamplesPage() {
  return <LocalizationExamplesClientPage />;
}
