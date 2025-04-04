declare interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

declare interface ChatRequest {
  message: string;
  history?: ChatMessage[];
  language?: string;
}

declare interface ChatResponse {
  message: string;
  status: number;
  error?: string;
  details?: string;
}

declare interface GeminiConfig {
  apiKey: string;
  timeoutMs: number;
  model: string;
}

declare interface GeminiPart {
  text: string;
}

declare interface GeminiContent {
  parts: GeminiPart[];
}

declare interface GeminiCandidate {
  content: {
    parts: GeminiPart[];
  };
}

declare interface GeminiResponse {
  candidates: GeminiCandidate[];
}

declare interface StreamingChatResponse extends ChatResponse {
  isStreaming?: boolean;
  chunk?: string;
}
