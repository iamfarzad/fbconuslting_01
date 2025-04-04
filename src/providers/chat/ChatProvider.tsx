"use client";

import React, { createContext, useContext, useReducer, ReactNode, useEffect, useCallback } from 'react';
import { ChatMessage } from '@/types/chat'; 
import { useSpeechRecognition } from '@/hooks/chat/useSpeechRecognition';
import { useSpeechSynthesis } from '@/hooks/chat/useSpeechSynthesis';

// Define the shape of the context state
export interface ChatContextType {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  userInfo: any | null; 
  step?: string;
  proposal?: any; 
  // Voice/Audio state
  isRecording: boolean; 
  transcript: string;
  isPlayingAudio: boolean; 
  audioError: string | null;
  isSpeechRecognitionSupported: boolean;
  isSpeechSynthesisSupported: boolean;

  // Actions 
  sendMessage: (message: string) => Promise<void>;
  setUserInfo: (info: any) => void;
  setStep: (step: string) => void;
  setProposal: (proposal: any) => void;
  resetConversation: () => void;
  // Voice/Audio actions
  toggleListening: () => Promise<void>; // Made async based on GeminiChat usage
  stopAudio: () => void;
  generateAndPlayAudio: (text: string, lang?: string) => Promise<void>; // Add optional lang
}

// Default context value - Add defaults for new properties
const defaultChatContext: ChatContextType = {
  messages: [],
  isLoading: false,
  error: null,
  userInfo: null,
  step: undefined,
  proposal: undefined,
  isRecording: false,
  transcript: '',
  isPlayingAudio: false,
  audioError: null,
  isSpeechRecognitionSupported: false, // Default to false until checked
  isSpeechSynthesisSupported: false, // Default to false until checked
  sendMessage: async () => {},
  setUserInfo: () => {},
  setStep: () => {},
  setProposal: () => {},
  resetConversation: () => {},
  toggleListening: async () => {},
  stopAudio: () => {},
  generateAndPlayAudio: async () => {},
};

// Create the context
const ChatContext = createContext<ChatContextType>(defaultChatContext);

// Define the state structure for the reducer
type State = {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  userInfo: any | null;
  step?: string;
  proposal?: any;
  // Add voice state to reducer state
  isRecording: boolean; // Managed by useSpeechRecognition hook now
  transcript: string; // Managed by useSpeechRecognition hook now
  isPlayingAudio: boolean; // Managed by useSpeechSynthesis hook now
  audioError: string | null; // Managed by useSpeechSynthesis hook now
};

// Define the possible actions for the reducer
type Action = 
  | { type: 'SET_MESSAGES'; payload: ChatMessage[] }
  | { type: 'ADD_MESSAGE'; payload: ChatMessage }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_USER_INFO'; payload: any }
  | { type: 'SET_STEP'; payload: string }
  | { type: 'SET_PROPOSAL'; payload: any }
  | { type: 'RESET' }
  // Add voice actions
  | { type: 'SET_RECORDING'; payload: boolean }
  | { type: 'SET_TRANSCRIPT'; payload: string }
  | { type: 'SET_PLAYING_AUDIO'; payload: boolean }
  | { type: 'SET_AUDIO_ERROR'; payload: string | null }
  | { type: 'UPDATE_LAST_ASSISTANT_MESSAGE'; payload: string }; // New action for streaming chunks

// Initial state for the reducer
const initialState: State = {
  messages: [],
  isLoading: false,
  error: null,
  userInfo: null,
  // Add initial voice state back, even if managed by hooks, to satisfy the State type
  isRecording: false,
  transcript: '',
  isPlayingAudio: false,
  audioError: null,
};

// Reducer function to manage chat state
function chatReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };
    case 'ADD_MESSAGE':
      // Prevent adding duplicate messages (simple check based on id)
      if (state.messages.some(msg => msg.id === action.payload.id)) {
        return state;
      }
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
      // Reset voice state as well, but keep userInfo etc.
      return { 
        ...initialState, 
        userInfo: state.userInfo, 
        step: state.step, 
        proposal: state.proposal 
      }; 
    // Add voice reducers
    case 'SET_RECORDING':
      return { ...state, isRecording: action.payload };
    case 'SET_TRANSCRIPT':
      // Append or replace transcript based on requirements (appending here)
      // return { ...state, transcript: state.transcript + action.payload }; 
      return { ...state, transcript: action.payload }; // Replacing for simplicity now
    case 'SET_PLAYING_AUDIO':
      return { ...state, isPlayingAudio: action.payload };
    case 'SET_AUDIO_ERROR':
      return { ...state, audioError: action.payload };
    default:
      // Ensure exhaustive check
      // const _exhaustiveCheck: never = action;
      return state;
    // Add reducer for updating the last message
    case 'UPDATE_LAST_ASSISTANT_MESSAGE':
      if (state.messages.length === 0 || state.messages[state.messages.length - 1].role !== 'assistant') {
        // If no messages or last message isn't assistant, add a new one (should ideally not happen with streaming)
         const newMessage: ChatMessage = {
           id: `assistant-${Date.now()}`,
           role: 'assistant',
           content: action.payload,
           timestamp: new Date().toISOString()
         };
         return { ...state, messages: [...state.messages, newMessage] };
      }
      // Update the content of the last assistant message
      const updatedMessages = [...state.messages];
      const lastMessageIndex = updatedMessages.length - 1;
      updatedMessages[lastMessageIndex] = {
        ...updatedMessages[lastMessageIndex],
        content: updatedMessages[lastMessageIndex].content + action.payload,
      };
      return { ...state, messages: updatedMessages };
  }
  // Remove voice state reducers as they are handled by hooks now
  // case 'SET_RECORDING': ...
  // case 'SET_TRANSCRIPT': ...
  // case 'SET_PLAYING_AUDIO': ...
  // case 'SET_AUDIO_ERROR': ...
}

// Provider component props
interface ChatProviderProps {
  children: ReactNode;
}

// The ChatProvider component
export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  // --- Integrate Speech Hooks ---
  const {
    isListening: isRecording, // Map hook state to context state name
    transcript,
    error: recognitionError,
    isSupported: isSpeechRecognitionSupported,
    startListening,
    stopListening,
    resetTranscript
  } = useSpeechRecognition(); // Use the STT hook

  const {
    speak,
    cancel: stopAudio, // Map hook function to context action name
    isPlaying: isPlayingAudio, // Map hook state to context state name
    isSupported: isSpeechSynthesisSupported,
    error: synthesisError,
    // voices // Expose voices if needed for selection UI
  } = useSpeechSynthesis(); // Use the TTS hook

  // --- Update Error State based on Hooks ---
  useEffect(() => {
    if (recognitionError) {
      dispatch({ type: 'SET_ERROR', payload: `Recognition Error: ${recognitionError}` });
    } else if (synthesisError) {
      dispatch({ type: 'SET_ERROR', payload: `Synthesis Error: ${synthesisError}` });
    } else {
       // Clear error if hooks are okay now (optional, depends on desired behavior)
       // if (state.error?.startsWith('Recognition Error:') || state.error?.startsWith('Synthesis Error:')) {
       //   dispatch({ type: 'SET_ERROR', payload: null });
       // }
    }
  }, [recognitionError, synthesisError]);

  // --- Action Implementations ---
  // Updated sendMessage to handle SSE stream
  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`, // More robust ID generation needed
      role: 'user',
      content: message,
      timestamp: new Date().toISOString() // Use ISO string for consistency
    };
    dispatch({ type: 'ADD_MESSAGE', payload: userMessage });
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    // Add a placeholder for the assistant message immediately
    const assistantMessageId = `assistant-${Date.now()}`;
    const initialAssistantMessage: ChatMessage = {
      id: assistantMessageId,
      role: 'assistant',
      content: '', // Start with empty content
      timestamp: new Date().toISOString()
    };
    dispatch({ type: 'ADD_MESSAGE', payload: initialAssistantMessage });

    try {
      const response = await fetch('/api/chat/streaming', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          history: state.messages.slice(0, -1) // Send history excluding the new assistant placeholder
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API error: ${response.status}`);
      }

      if (!response.body) {
        throw new Error('Response body is null');
      }

      // Process the stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Keep the last partial line in buffer

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const jsonData = JSON.parse(line.slice(5));
              if (jsonData.error) {
                console.error("Streaming API Error:", jsonData.error, jsonData.details);
                dispatch({ type: 'SET_ERROR', payload: jsonData.error });
                // Optionally update the last message content with an error indicator
                dispatch({ type: 'UPDATE_LAST_ASSISTANT_MESSAGE', payload: ` [Error: ${jsonData.error}]` });
                return; // Stop processing on error
              } else if (jsonData.chunk) {
                dispatch({ type: 'UPDATE_LAST_ASSISTANT_MESSAGE', payload: jsonData.chunk });
              } else if (jsonData.complete) {
                // Optional: Could verify fullText matches accumulated content
                console.log("Stream complete.");
                // Potentially trigger TTS here if desired:
                // generateAndPlayAudio(jsonData.fullText); 
                break; // Exit loop on complete message
              }
            } catch (e) {
              console.error("Error parsing SSE data:", e, line);
              // Decide how to handle parse errors, maybe dispatch an error state
            }
          }
        }
      }

    } catch (error) {
      console.error("Error in sendMessage stream:", error);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to send message' 
      });
      // Optionally add an error message to the chat
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'system', // Or a specific 'error' role if defined
        content: `Error: ${error instanceof Error ? error.message : 'Failed to get response'}`,
        timestamp: new Date().toISOString()
      };
      dispatch({ type: 'ADD_MESSAGE', payload: errorMessage });
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
    stopListening(); // Stop recording if active
    stopAudio(); // Stop playback if active
    resetTranscript(); // Clear transcript
  };

  // --- Voice Actions using Hooks ---
  const toggleListening = useCallback(async (): Promise<void> => {
    if (isRecording) {
      stopListening();
    } else {
      // Stop any TTS before starting recording
      stopAudio(); 
      startListening();
    }
  }, [isRecording, startListening, stopListening, stopAudio]);

  // generateAndPlayAudio now uses the speak function from the hook
  const generateAndPlayAudio = useCallback(async (text: string, lang: string = 'en-US'): Promise<void> => {
     // Stop listening before speaking
     if (isRecording) {
       stopListening();
     }
     speak(text, lang); // Use the hook's speak function
  }, [speak, isRecording, stopListening]);

  // --- Send Transcript Effect ---
  // Send message automatically when recording stops and transcript is available
  useEffect(() => {
    if (!isRecording && transcript) {
      sendMessage(transcript);
      resetTranscript(); // Clear transcript after sending
    }
  }, [isRecording, transcript, sendMessage, resetTranscript]);

  // --- Context Value ---
  // Combine reducer state and hook state/actions for the context
  const contextValue: ChatContextType = {
    ...state, // messages, isLoading, error, userInfo, step, proposal
    isRecording,
    transcript,
    isPlayingAudio,
    audioError: synthesisError || recognitionError, // Combine errors
    isSpeechRecognitionSupported,
    isSpeechSynthesisSupported,
    sendMessage,
    setUserInfo,
    setStep,
    setProposal,
    resetConversation,
    toggleListening,
    stopAudio,
    generateAndPlayAudio,
  };
  
  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook to use the ChatContext
export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
