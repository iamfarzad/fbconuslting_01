import React, { createContext, useContext, ReactNode } from "react";

type GeminiAPIContextType = {
  apiKey: string | null;
  setApiKey: (key: string) => void;
};

const GeminiAPIContext = createContext<GeminiAPIContextType>({
  apiKey: null,
  setApiKey: () => {},
});

export const GeminiAPIProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [apiKey, setApiKeyState] = React.useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("gemini-api-key") : null
  );

  const setApiKey = (key: string) => {
    setApiKeyState(key);
    if (typeof window !== "undefined") {
      localStorage.setItem("gemini-api-key", key);
    }
  };

  return (
    <GeminiAPIContext.Provider value={{ apiKey, setApiKey }}>
      {children}
    </GeminiAPIContext.Provider>
  );
};

export const useGeminiAPI = () => useContext(GeminiAPIContext);
