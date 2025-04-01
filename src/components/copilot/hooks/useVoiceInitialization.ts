export const useVoiceInitialization = () => {
  return {
    isSpeechSupported: false,
    isListening: false,
    startListening: () => {},
    stopListening: () => {},
    transcript: '',
    resetTranscript: () => {},
    browserSupportsSpeechRecognition: false
  };
};
