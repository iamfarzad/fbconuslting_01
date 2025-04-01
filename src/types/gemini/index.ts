export interface ProviderMessage {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'error';
  content: string;
  timestamp?: number;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: number;
}

export interface GeminiState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  userInfo: any;
  step?: string;
  proposal?: any;
}

export interface AIMessage {
  id: string;
  content: string;
  role: string;
  timestamp?: number;
}
