import React from 'react';
import { motion } from 'framer-motion';
import { useLocalizedUtils } from '@/hooks/useLocalizedUtils';
import { LocalizedContent } from '@/types/localization';

interface ExampleData {
  title: LocalizedContent;
  description: LocalizedContent;
  price: number;
  lastUpdated: Date;
  features: LocalizedContent[];
}

const exampleData: ExampleData = {
  title: {
    en: 'Enterprise AI Solution',
    no: 'AI-løsning for bedrifter'
  },
  description: {
    en: 'Advanced AI solution for enterprise businesses with dedicated support.',
    no: 'Avansert AI-løsning for bedrifter med dedikert støtte.'
  },
  price: 9999,
  lastUpdated: new Date(),
  features: [
    {
      en: 'Custom AI model development',
      no: 'Utvikling av tilpassede AI-modeller'
    },
    {
      en: '24/7 Technical support',
      no: '24/7 Teknisk støtte'
    },
    {
      en: 'Advanced analytics dashboard',
      no: 'Avansert analysepanel'
    }
  ]
};

export function LocalizedExample() {
  const {
    t,
    formatPrice,
    formatDate,
    isNorwegian,
    currencySymbol
  } = useLocalizedUtils();

  return (
    <div className="max-w-md mx-auto p-6 rounded-xl bg-card shadow-lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4">
          {t(exampleData.title)}
        </h2>

        <p className="text-muted-foreground mb-6">
          {t(exampleData.description)}
        </p>

        <div className="flex justify-between items-baseline mb-6">
          <div className="text-3xl font-bold">
            {formatPrice(exampleData.price)}
          </div>
          <div className="text-sm text-muted-foreground">
            {isNorwegian ? 'per måned' : 'per month'}
          </div>
        </div>

        <ul className="space-y-3 mb-6">
          {exampleData.features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2"
            >
              <svg className="w-5 h-5 text-green-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M5 13l4 4L19 7"></path>
              </svg>
              {t(feature)}
            </motion.li>
          ))}
        </ul>

        <div className="text-sm text-muted-foreground text-center">
          {isNorwegian ? 'Sist oppdatert: ' : 'Last updated: '}
          {formatDate(exampleData.lastUpdated)}
        </div>

        <button className="w-full mt-6 bg-primary text-primary-foreground hover:opacity-90 py-3 px-6 rounded-lg transition-opacity">
          {isNorwegian ? 'Kom i gang' : 'Get Started'}
        </button>
      </motion.div>
    </div>
  );
}
