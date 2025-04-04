'use client';

import { useEffect } from 'react';
import { useLocalizedUtils } from '@/hooks/useLocalizedUtils';
import { motion } from 'framer-motion';

export default function LocalizationError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLocalizedUtils();

  useEffect(() => {
    // Log the error to your error reporting service
    console.error(error);
  }, [error]);

  const errorContent = {
    title: {
      en: 'Something went wrong!',
      no: 'Noe gikk galt!'
    },
    description: {
      en: 'An error occurred while loading the localization examples.',
      no: 'Det oppstod en feil under lasting av lokaliseringseksemplene.'
    },
    tryAgain: {
      en: 'Try again',
      no: 'Prøv igjen'
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="p-6 bg-card rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4 text-red-500">
              {t(errorContent.title)}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t(errorContent.description)}
            </p>
            <button
              onClick={reset}
              className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity"
            >
              {t(errorContent.tryAgain)}
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
