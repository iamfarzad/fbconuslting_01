import React from "react";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundaryWrapper from '@/components/ErrorBoundaryWrapper';
import ThemeProvider from '@/components/ThemeProvider';
import { LanguageProvider } from '@/contexts/LanguageContext';
// Remove old providers
// import { CopilotProvider } from "@/components/copilot/CopilotProvider";
// import { GeminiAPIProvider } from '@/providers/GeminiAPIProvider';
import { ChatProvider } from '@/providers/chat/ChatProvider'; // Import the new provider

interface ProvidersWrapperProps {
  children: React.ReactNode;
}

/**
 * Wraps the application with all required providers in the correct order.
 * Each provider is wrapped in an ErrorBoundaryWrapper to isolate failures.
 */
const ProvidersWrapper: React.FC<ProvidersWrapperProps> = ({ children }) => {
  return (
    <ErrorBoundaryWrapper>
      <HelmetProvider>
        <ThemeProvider>
          <ErrorBoundaryWrapper>
            <LanguageProvider>
              <ErrorBoundaryWrapper>
                {/* Replace old providers with the new ChatProvider */}
                <ChatProvider>
                  {children}
                </ChatProvider>
              </ErrorBoundaryWrapper>
            </LanguageProvider>
          </ErrorBoundaryWrapper>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundaryWrapper>
  );
};

export default ProvidersWrapper;
