
import React from 'react';
import StepCard from '@/components/StepCard';

interface BasicStepProps {
  number: number;
  onMarkComplete?: (number: number, isComplete: boolean) => void;
  completed?: boolean;
}

const BasicStep5 = ({ number, onMarkComplete, completed }: BasicStepProps) => (
  <StepCard 
    number={number} 
    title="Set up access to the AI model's API (if needed)"
    platforms={[
      {
        name: "OpenAI API",
        url: "https://platform.openai.com",
        description: "API access to GPT models and other OpenAI services"
      },
      {
        name: "Google AI Studio",
        url: "https://ai.google.dev/",
        description: "Platform to experiment with and deploy Google's AI models"
      },
      {
        name: "Anthropic Claude API",
        url: "https://console.anthropic.com",
        description: "API access to Claude models"
      },
      {
        name: "Hugging Face Inference API",
        url: "https://huggingface.co/inference-api",
        description: "Run machine learning models as a service"
      }
    ]}
    onMarkComplete={onMarkComplete}
    completed={completed}
    tips={[
      "Store your API keys securely and never expose them in client-side code",
      "Start with the cheapest model that meets your needs to control costs",
      "Set up usage limits to avoid unexpected charges",
      "Read the documentation for rate limits and token limitations"
    ]}
  >
    If your use case goes beyond the chat UI, sign up for the model's API such as OpenAI API, 
    Google Cloud Vertex AI, or others depending on your chosen model.
  </StepCard>
);

export default BasicStep5;
