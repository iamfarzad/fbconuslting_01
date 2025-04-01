// Core Components
export { CopilotChat } from '@/components/copilot/core/CopilotChat';
export { CopilotConfig } from '@/components/copilot/core/CopilotConfig';
export { GeminiChat } from '@/components/copilot/core/GeminiChat';

// Providers - explicit paths to avoid confusion
export { CopilotProvider } from '@/components/copilot/providers/CopilotProvider';
export { GeminiProvider, useGemini } from '@/components/copilot/providers/GeminiProvider';
export { GoogleGenAIConfig } from '@/components/copilot/providers/GoogleGenAIConfig';

// UI Components
export { ConnectionStatusIndicator } from '@/components/copilot/ui/ConnectionStatusIndicator';
export { DocumentPreview } from '@/components/copilot/ui/DocumentPreview';
export { AnimatedBars } from '@/components/copilot/ui/AnimatedBars';

// Chat Components
export { ChatHeader } from '@/components/copilot/chat/ChatHeader';
export { ChatMessages } from '@/components/copilot/chat/ChatMessages';
export { ChatInputArea } from '@/components/copilot/chat/ChatInputArea';
export { ErrorDisplay } from '@/components/copilot/chat/ErrorDisplay';

// Common Types
export type { Message, WebSocketMessage, MessageHandler, VoiceConfig, ChatConfig } from '@/components/copilot/types';

// API Types
export type {
  StreamResponse,
  AudioResponse,
  VisionResponse,
  ChatRequest,
  AudioRequest,
  VisionRequest,
  WebSocketRequest,
  WebSocketResponse,
  FluidComputeConfig,
  APIError,
  HealthCheckResponse
} from '@/components/copilot/api/types';

// Re-export necessary CopilotKit types and hooks
export {
  useCopilotChat,
  useCopilotAction
} from '@copilotkit/react-core';

// Initialization utilities
export const initializeCopilotWithGoogleAI = (options: {
  apiKey: string;
  modelName?: string;
  temperature?: number;
  maxOutputTokens?: number;
}) => {
  console.log('Initializing CopilotKit with Google GenAI', {
    ...options,
    apiKey: '[REDACTED]'
  });
  return {
    isInitialized: true,
    options: {
      ...options,
      apiKey: '[REDACTED]'
    }
  };
};
