import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ChatMessage } from '@/types/chat';

export interface GeminiContextType {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  userInfo: any | null;
  step?: string;
  proposal?: any;
  isRecording?: boolean;
  stopAudio?: () => void;
  sendMessage: (message: string) => Promise<void>;
  setUserInfo: (info: any) => void;
  setStep: (step: string) => void;
  setProposal: (proposal: any) => void;
  resetConversation: () => void;
}

const defaultContext: GeminiContextType = {
  messages: [],
  isLoading: false,
  error: null,
  userInfo: null,
  step: undefined,
  proposal: undefined,
  isRecording: false,
  stopAudio: () => {},
  sendMessage: async () => {},
  setUserInfo: () => {},
  setStep: () => {},
  setProposal: () => {},
  resetConversation: () => {}
};

const GeminiCopilotContext = createContext<GeminiContextType>(defaultContext);

interface GeminiCopilotProviderProps {
  children: ReactNode;
}

type State = {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  userInfo: any | null;
  step?: string;
  proposal?: any;
};

type Action = 
  | { type: 'SET_MESSAGES'; payload: ChatMessage[] }
  | { type: 'ADD_MESSAGE'; payload: ChatMessage }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_USER_INFO'; payload: any }
  | { type: 'SET_STEP'; payload: string }
  | { type: 'SET_PROPOSAL'; payload: any }
  | { type: 'RESET' };

const initialState: State = {
  messages: [],
  isLoading: false,
  error: null,
  userInfo: null
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_USER_INFO':
      return { ...state, userInfo: action.payload };
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'SET_PROPOSAL':
      return { ...state, proposal: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export const GeminiCopilotProvider: React.FC<GeminiCopilotProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const sendMessage = async (message: string) => {
    if (!message.trim()) return;
    
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: message,
        timestamp: Date.now()
      };
      
      dispatch({ type: 'ADD_MESSAGE', payload: userMessage });
      
      // Simulate response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `This is a simulated response to: "${message}"`,
        timestamp: Date.now()
      };
      
      dispatch({ type: 'ADD_MESSAGE', payload: assistantMessage });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to send message' 
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };
  
  const setUserInfo = (info: any) => {
    dispatch({ type: 'SET_USER_INFO', payload: info });
  };
  
  const setStep = (step: string) => {
    dispatch({ type: 'SET_STEP', payload: step });
  };
  
  const setProposal = (proposal: any) => {
    dispatch({ type: 'SET_PROPOSAL', payload: proposal });
  };
  
  const resetConversation = () => {
    dispatch({ type: 'RESET' });
  };
  
  return (
    <GeminiCopilotContext.Provider value={{
      ...state,
      isRecording: false,
      stopAudio: () => {},
      sendMessage,
      setUserInfo,
      setStep,
      setProposal,
      resetConversation
    }}>
      {children}
    </GeminiCopilotContext.Provider>
  );
};

export const useGeminiCopilot = () => useContext(GeminiCopilotContext);
