import React from 'react';

export interface EnhancedChatContainerProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  messages?: any[];
  onSendMessage?: (message: string) => Promise<void>;
  onClearChat?: () => void;
  isLoading?: boolean;
  isFullScreen?: boolean;
  onToggleFullScreen?: () => void;
  className?: string;
  isVoiceSupported?: boolean;
  onToggleVoice?: () => void;
  isListening?: boolean;
}

export const EnhancedChatContainer: React.FC<EnhancedChatContainerProps> = ({ 
  children,
  className = "",
  title = "Chat",
}) => {
  return (
    <div className={`relative border rounded-lg shadow-lg bg-white p-4 ${className}`}>
      {title && <h3 className="font-medium mb-4">{title}</h3>}
      {children}
    </div>
  );
};
