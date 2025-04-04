import { ComponentBase } from './ui';

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: string;
  media?: {
    type: 'image' | 'audio' | 'video';
    url: string;
  }[];
}

export interface ChatBubbleProps extends ComponentBase {
  message: ChatMessage;
  isLoading?: boolean;
}

export interface ChatInputProps extends ComponentBase {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  onMediaUpload?: (files: FileList) => Promise<void>;
}

export interface ChatContextValue {
  messages: ChatMessage[];
  isLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => void;
}
