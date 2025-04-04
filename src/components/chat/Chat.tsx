"use client";

import React, { useRef, useState, useCallback, useEffect } from 'react'; // Import useEffect
import { CardHeader } from '@/components/ui/card'; // Assuming CardHeader is reusable
import { useToast } from '@/hooks/use-toast'; // Assuming useToast is available
import ChatHeader from '@/components/chat/ui/ChatHeader'; // Updated import path
import ChatMessages from '@/components/chat/ui/ChatMessages'; // Updated import path
import { Button } from '@/components/ui/button';
import { Send, Mic, Square } from 'lucide-react'; // Add Mic icons
import { Textarea } from '@/components/ui/textarea';
import ErrorDisplay from '@/components/chat/ui/ErrorDisplay'; // Updated import path
import { useChat } from '@/providers/chat/ChatProvider'; // Use the new unified hook
import { cn } from '@/lib/utils';

interface ChatProps {
  className?: string;
  // Add other props as needed, e.g., initial suggestions, expanded state control
}

export const Chat: React.FC<ChatProps> = ({ className = '' }) => {
  const { toast } = useToast();
  const { 
    sendMessage,
    messages,
    isLoading, 
    error,
    isRecording,
    transcript,
    toggleListening,
  } = useChat(); 
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);

  // Send transcript when voice input stops and transcript exists
  useEffect(() => {
    if (transcript && !isRecording) {
      sendMessage(transcript);
    }
  }, [transcript, isRecording, sendMessage]);

  // Handle text input submission
  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim() || isLoading) return;
    const messageToSend = inputValue.trim();
    setInputValue(''); // Clear input immediately

    try {
      await sendMessage(messageToSend);
    } catch (err) {
      console.error("Failed to send message:", err);
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to send message",
        variant: "destructive"
      });
      // Optionally restore input value on error:
      // setInputValue(messageToSend); 
    }
  }, [inputValue, isLoading, sendMessage, toast]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  return (
    <div className={cn(
      "fixed bottom-6 right-6 rounded-lg border bg-card text-card-foreground shadow-xl overflow-hidden flex flex-col",
      "w-[400px] z-50 transition-all duration-200",
      isMinimized ? "h-[60px]" : "h-[600px]",
      className
    )}>
      <CardHeader 
        className={cn(
          "p-4 border-b cursor-pointer",
          isMinimized && "border-b-0"
        )}
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <ChatHeader
          title="AI Assistant" 
          subtitle={error ? "Error" : (isLoading ? "Processing..." : "Ready")}
          onClose={() => setIsMinimized(!isMinimized)}
          status={isLoading ? "connecting" : error ? "error" : "connected"}
        />
      </CardHeader>

      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto bg-background/50 dark:bg-background/80 p-4">
            <ChatMessages
              messages={messages}
              isLoading={isLoading}
              error={error}
              messagesEndRef={messagesEndRef}
            />
          </div>

          {error && <ErrorDisplay error={error} />} 

          <div className="border-t p-4 flex items-end gap-2 bg-card">
            <Textarea
              placeholder="Type your message or use voice..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-[44px] max-h-32 flex-1 resize-none bg-background rounded-lg border p-2"
              rows={1}
              disabled={isLoading || isRecording}
            />
            <Button 
              onClick={toggleListening}
              variant="outline" 
              size="icon"
              disabled={isLoading}
              className={cn(
                "transition-colors", 
                isRecording ? "bg-red-500 hover:bg-red-600 text-white animate-pulse" : "hover:bg-muted"
              )}
              aria-label={isRecording ? "Stop recording" : "Start recording"}
            >
              {isRecording ? <Square className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
            <Button 
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              size="icon"
              aria-label="Send message"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
