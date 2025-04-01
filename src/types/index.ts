export interface GeminiState {
  messages: ChatMessage[];
  isLoading: boolean;
  chatError: string | null;
}

export interface GeminiUserInfo {
  name?: string;
  email?: string;
  preferences?: Record<string, any>;
}

export interface ChatStep {
  id: string;
  title: string;
  description: string;
}

export interface ProposalData {
  title: string;
  description: string;
  elements: string[];
}

export interface GeminiAction {
  type: string;
  payload?: any;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: number;
}
