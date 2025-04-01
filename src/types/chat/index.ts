export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: number;
}

export interface ConnectionStatusIndicatorProps {
  status: "connected" | "connecting" | "disconnected" | "error";
  className?: string;
}

export interface AIMessage {
  id: string;
  content: string;
  role: string;
}
