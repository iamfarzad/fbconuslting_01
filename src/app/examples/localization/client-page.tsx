import React from 'react';
import { LocalizedExample } from '@/components/examples/LocalizedExample';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLocalizedUtils } from '@/hooks/useLocalizedUtils';
import { withLocalization, WithLocalizationProps } from '@/components/hoc/withLocalization';
import { motion } from 'framer-motion';

const pageContent = {
  title: {
    en: 'Localization System Examples',
    no: 'Eksempler på lokaliseringssystem'
  },
  description: {
    en: 'Explore our comprehensive localization system with real-world examples.',
    no: 'Utforsk vårt omfattende lokaliseringssystem med praktiske eksempler.'
  },
  codeExample: {
    en: 'Implementation Example',
    no: 'Implementeringseksempel'
  },
  features: {
    en: 'Key Features',
    no: 'Hovedfunksjoner'
  }
};

const features = [
  {
    title: {
      en: 'Auto-detection',
      no: 'Auto-deteksjon'
    },
    description: {
      en: 'Automatically detects user language preferences',
      no: 'Oppdager automatisk brukerens språkpreferanser'
    }
  },
  {
    title: {
      en: 'Number Formatting',
      no: 'Tallformatering'
    },
    description: {
      en: 'Locale-aware number and currency formatting',
      no: 'Lokaliseringsbevisst tall- og valutaformatering'
    }
  },
  {
    title: {
      en: 'Date Handling',
      no: 'Datohåndtering'
    },
    description: {
      en: 'Localized date formatting and timezone support',
      no: 'Lokalisert datoformatering og tidssone-støtte'
    }
  }
];

function LocalizationExamplesClientPage({ getLocalizedContent }: WithLocalizationProps) {
  const { t } = useLocalizedUtils();

  const codeSnippet = `
// Using the hook in your components
function MyComponent() {
  const { 
    t,
    formatPrice,
    formatDate,
    isNorwegian 
  } = useLocalizedUtils();

  return (
    <div>
      <h1>{t(title)}</h1>
      <p>{formatPrice(1000)}</p>
      <time>{formatDate(new Date())}</time>
    </div>
  );
}
`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background py-12"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="text-3xl font-bold"
          >
            {t(pageContent.title)}
          </motion.h1>
          <LanguageSwitcher />
        </div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground max-w-2xl mb-12"
        >
          {t(pageContent.description)}
        </motion.p>

        <div className="max-w-4xl mx-auto">
          {/* Interactive Example */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-16"
          >
            <LocalizedExample />
          </motion.div>

          {/* Code Examples */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-4">
              {t(pageContent.codeExample)}
            </h2>
            <pre className="bg-card p-4 rounded-lg overflow-x-auto">
              <code className="text-sm">{codeSnippet}</code>
            </pre>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6">
              {t(pageContent.features)}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold mb-2">{t(feature.title)}</h3>
                  <p className="text-muted-foreground text-sm">
                    {t(feature.description)}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default withLocalization(LocalizationExamplesClientPage);
