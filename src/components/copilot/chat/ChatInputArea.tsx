import React, { useState } from 'react';

interface ChatInputAreaProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  isVoiceEnabled?: boolean;
  onToggleVoice?: () => void;
  isListening?: boolean;
}

export const ChatInputArea: React.FC<ChatInputAreaProps> = ({
  onSendMessage,
  placeholder = "Type your message...",
  isLoading = false,
  isVoiceEnabled = false,
  onToggleVoice,
  isListening = false
}) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center mt-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={placeholder}
        disabled={isLoading}
        className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      
      {isVoiceEnabled && onToggleVoice && (
        <button
          type="button"
          onClick={onToggleVoice}
          className={`p-2 ${isListening ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
        >
          🎤
        </button>
      )}
      
      <button
        type="submit"
        disabled={!message.trim() || isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 disabled:bg-gray-300"
      >
        {isLoading ? "..." : "Send"}
      </button>
    </form>
  );
};
