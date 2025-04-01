import { useState, useEffect } from 'react';

export const useGeminiAPI = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);

  // Load API key from localStorage on initial render
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedKey = localStorage.getItem('gemini-api-key');
      if (savedKey) {
        setApiKey(savedKey);
      }
    }
  }, []);

  // Save API key to localStorage when it changes
  const saveApiKey = (key: string) => {
    setApiKey(key);
    if (typeof window !== 'undefined') {
      localStorage.setItem('gemini-api-key', key);
    }
  };

  return {
    apiKey,
    setApiKey: saveApiKey,
  };
};
