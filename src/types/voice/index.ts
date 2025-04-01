export interface VoiceUIProps {
  isListening?: boolean;
  onStart?: () => void;
  onStop?: () => void;
  transcript?: string;
  isTranscribing?: boolean;
  error?: string | null;
}

export interface VoiceConfig {
  enabled: boolean;
  autoStart: boolean;
  language: string;
  continuous?: boolean;
}
