import { useState } from 'react';
import { ChatServiceType } from '@/services/chat/ChatFactory';

// Add MOCK to ChatServiceType
export enum ExtendedChatServiceType {
  GEMINI = 'gemini',
  GPT = 'gpt',
  CLAUDE = 'claude',
  MOCK = 'mock'
}

interface EnhancedChatConfig {
  apiKey?: string;
  serviceType?: ExtendedChatServiceType | ChatServiceType;
  initialMessages?: any[];
  storageKey?: string;
  persistMessages?: boolean;
}

export const useEnhancedChat = (config?: EnhancedChatConfig) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const isVoiceSupported = typeof window !== 'undefined' && 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
  const [voiceError, setVoiceError] = useState<string | null>(null);

  const sendMessage = async (message: string) => {
    // Implementation would go here
    console.log("Sending message:", message);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const toggleListening = () => {
    setIsListening(prev => !prev);
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    isListening,
    toggleListening,
    voiceError,
    isVoiceSupported
  };
};
