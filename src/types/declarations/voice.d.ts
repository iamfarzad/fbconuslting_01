declare interface VoiceConfig {
  enabled: boolean;
  language: string;
  voice?: string;
  pitch?: number;
  rate?: number;
  volume?: number;
}

declare interface VoiceCommand {
  id: string;
  command: string;
  action: string;
  params?: Record<string, any>;
  language: 'en' | 'no';
}

declare interface VoiceState {
  isListening: boolean;
  isProcessing: boolean;
  isSpeaking: boolean;
  lastCommand?: VoiceCommand;
  error?: string;
}

declare interface VoiceRecognitionResult {
  text: string;
  confidence: number;
  isFinal: boolean;
  language?: string;
}

declare interface VoiceSynthesisOptions {
  text: string;
  language?: string;
  voice?: string;
  pitch?: number;
  rate?: number;
  volume?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: Error) => void;
}

declare interface VoiceFeedback {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  language?: string;
  shouldSpeak?: boolean;
}

declare interface VoiceContext {
  config: VoiceConfig;
  state: VoiceState;
  startListening: () => Promise<void>;
  stopListening: () => void;
  speak: (options: VoiceSynthesisOptions) => void;
  cancelSpeech: () => void;
  isSupported: boolean;
}
