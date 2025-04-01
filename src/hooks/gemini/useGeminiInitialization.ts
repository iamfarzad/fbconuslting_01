import { useState, useEffect } from 'react';

export const useGeminiInitialization = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Added fields to fix Hero.tsx
  const hasApiKey = true; // Mock value
  const getApiKey = () => process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
  
  useEffect(() => {
    const initializeGemini = async () => {
      try {
        // Simulation of initialization
        await new Promise(resolve => setTimeout(resolve, 500));
        setIsInitialized(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to initialize Gemini");
      }
    };
    
    initializeGemini();
  }, []);
  
  return { isInitialized, error, hasApiKey, getApiKey };
};
