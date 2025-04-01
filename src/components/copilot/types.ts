import { ChatMessage } from "@/types/chat";

export interface GeminiReducerState {
  messages: ChatMessage[];
  isLoading: boolean;
  chatError: string | null;
  userInfo: any | null;
  step?: string;
  proposal?: any;
}

export type GeminiReducerAction = 
  | { type: 'SET_MESSAGES'; payload: ChatMessage[] }
  | { type: 'ADD_MESSAGE'; payload: ChatMessage }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_USER_INFO'; payload: any }
  | { type: 'SET_STEP'; payload: string }
  | { type: 'SET_PROPOSAL'; payload: any }
  | { type: 'RESET' };
