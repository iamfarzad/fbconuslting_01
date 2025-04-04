export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: number;
}

export type ConnectionStatus = 'connected' | 'connecting' | 'disconnected' | 'error';

export interface ConnectionStatusIndicatorProps {
  status: ConnectionStatus;
  className?: string;
}

export interface ChatConfig {
  apiKey?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}

export interface ChatOptionsProps {
  onRegenerate?: () => void;
  onClear?: () => void;
  onCopy?: () => void;
  isMobile?: boolean;
}
