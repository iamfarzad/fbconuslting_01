export const useGeminiSpeechRecognition = (apiKey: string, handleCommand: (command: string) => void) => {
  // Implementation would go here
  
  return {
    isListening: false,
    startListening: () => {},
    stopListening: () => {},
    transcript: "",
    resetTranscript: () => {},
    error: null
  };
};

export const getApiKey = () => {
  return process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
};
