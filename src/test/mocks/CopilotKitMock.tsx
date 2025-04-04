import React from 'react';

export const MockCopilotProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const MockCopilotChat = ({ children }: { children?: React.ReactNode }) => {
  return <div data-testid="copilot-chat">{children || 'Mock Copilot Chat'}</div>;
};

export const MockCopilotTextarea = ({ placeholder }: { placeholder?: string }) => {
  return <textarea placeholder={placeholder || 'Type your message...'} />;
};

export const useCopilotChat = () => {
  return {
    messages: [],
    setMessages: () => {},
    isLoading: false,
    error: null,
    sendMessage: async () => {},
    clearMessages: () => {}
  };
};

export const useCopilotAction = (action: string) => {
  return async (params: any) => {
    console.log(`Mock copilot action executed: ${action}`, params);
    return { success: true, data: { mockResult: 'Test result' } };
  };
};
