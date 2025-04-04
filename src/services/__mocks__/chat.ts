export const mockChatResponse = {
  candidates: [
    {
      content: {
        parts: [
          {
            text: "Hello! I'm Farzad's AI assistant. I can help you with AI strategy, implementation, and automation. How can I assist you today?"
          }
        ]
      }
    }
  ]
};

export const mockStreamingResponse = [
  { chunk: "Hello! " },
  { chunk: "I'm Farzad's " },
  { chunk: "AI assistant. " },
  { chunk: "I can help you with " },
  { chunk: "AI strategy, implementation, " },
  { chunk: "and automation. " },
  { chunk: "How can I assist you today?" },
  { complete: true, fullText: "Hello! I'm Farzad's AI assistant. I can help you with AI strategy, implementation, and automation. How can I assist you today?" }
];

export const mockErrorResponse = {
  error: {
    message: "An error occurred while processing your request.",
    code: "INTERNAL_ERROR"
  }
};

export const mockRateLimitResponse = {
  error: {
    message: "Rate limit exceeded. Please try again later.",
    code: "RATE_LIMIT_EXCEEDED"
  }
};
