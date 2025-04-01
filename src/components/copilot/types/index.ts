export interface SpatialContext {
  location?: {
    country?: string;
    city?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  device?: {
    type: 'mobile' | 'tablet' | 'desktop';
    browser?: string;
    os?: string;
  };
  time?: {
    timezone?: string;
    localTime?: string;
  };
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: number;
}

export interface WebSocketMessage {
  type: string;
  payload?: any;
}

export interface MessageHandler {
  (message: WebSocketMessage): void;
}

export interface VoiceConfig {
  enabled: boolean;
  autoStart: boolean;
  language: string;
}

export interface ChatConfig {
  defaultMessages: Message[];
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
}
