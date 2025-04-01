export const useVoiceSetup = () => {
  return {
    isRecording: false,
    startRecording: () => {},
    stopRecording: () => {},
    transcript: '',
    transcribeAudio: async () => '',
    stopAudio: () => {},
    isVoiceSupported: false
  };
};
