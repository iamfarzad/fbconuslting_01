
"use client";

import React, { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Chat } from "../chat/Chat"; // Import the actual Chat component
import { UnifiedChat } from "../chat/UnifiedChat";
import UnifiedFullScreenChat from "../chat/UnifiedFullScreenChat";

interface AIChatInputProps {
  placeholderText?: string;
  autoFullScreen?: boolean;
  apiKey?: string;
  modelName?: string;
}

export function AIChatInput({ 
  placeholderText = "Ask me anything...",
  autoFullScreen = false,
  apiKey,
  modelName
}: AIChatInputProps) {
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const isMobile = useIsMobile();

  // If autoFullScreen is true, go to fullscreen after a delay when mobile
  useEffect(() => {
    if (autoFullScreen && isMobile) {
      const timer = setTimeout(() => {
        setIsFullScreen(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [autoFullScreen, isMobile]);

  // Handle toggling fullscreen mode
  const toggleFullScreen = () => {
    setIsFullScreen(prev => !prev);
  };

  return (
    <> {/* Wrap content in a React Fragment */}
      {/* Wrap with ChatProvider if not already done higher up the tree */}
      {/* Assuming ChatProvider is wrapping this component or its parent */}
      <AnimatePresence mode="wait">
        {isFullScreen ? (
          <UnifiedFullScreenChat
          isOpen={true} // Control visibility
          onClose={toggleFullScreen} // Map toggle to onClose
          title="AI Chat" // Optional: Pass title
        >
          {/* Render the actual chat inside */}
          <Chat /> 
        </UnifiedFullScreenChat>
      ) : (
        <UnifiedChat
          title="AI Chat" // Optional: Pass title
          // Add a button or mechanism here if needed to trigger toggleFullScreen
        >
          {/* Render the actual chat inside */}
          <Chat /> 
          </UnifiedChat>
        )}
      </AnimatePresence>
    </>
  );
}

export default AIChatInput;
