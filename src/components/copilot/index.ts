// Core Components - REMOVED Legacy/Non-existent paths
// export { CopilotChat } from '@/components/copilot/core/CopilotChat';
// export { VoiceUI } from '@/components/copilot/core/VoiceUI';
// export { useCopilot } from '@/components/copilot/hooks/useCopilot';
// export { useCopilotAction } from '@/components/copilot/hooks/useCopilotAction'; // Causes duplicate identifier error
// export { useCopilotReadable } from '@/components/copilot/hooks/useCopilotReadable';
// export { GeminiCopilotProvider, useGeminiCopilot } from '@/components/copilot/GeminiCopilotProvider'; // Likely deprecated

// Core UI Components - REMOVED Duplicates/Non-existent paths
// export { Button } from '@/components/copilot/core/ui/button';
// export { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/copilot/core/ui/dialog';
// export { Textarea } from '@/components/copilot/core/ui/textarea';

// Chat specific UI - REMOVED Legacy/Non-existent paths
// export { ChatInput } from '@/components/copilot/chat/ChatInputArea';

// Types - REMOVED as paths/exports are incorrect or types are unused here
// export type { Message, WebSocketMessage, MessageHandler, VoiceConfig, ChatConfig } from '@/types/chat';

// API Types - REMOVED as paths/exports are incorrect or types are unused here
// export type {
//   StreamResponse,
//   AudioResponse,
//   VisionResponse,
//   ChatRequest,
//   AudioRequest,
//   VisionRequest,
//   WebSocketRequest,
//   WebSocketResponse,
//   FluidComputeConfig,
//   APIError,
//   HealthCheckResponse
// } from '@/types/gemini';

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
