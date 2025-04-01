
import React from 'react';
import StepCard from '@/components/StepCard';

interface BasicStepProps {
  number: number;
  onMarkComplete?: (number: number, isComplete: boolean) => void;
  completed?: boolean;
}

const BasicStep2 = ({ number, onMarkComplete, completed }: BasicStepProps) => (
  <StepCard 
    number={number} 
    title="Choose a large language model service for quick use"
    platforms={[
      {
        name: "ChatGPT",
        url: "https://chat.openai.com",
        description: "OpenAI's user-friendly chat interface for their GPT models"
      },
      {
        name: "Google's Gemini",
        url: "https://gemini.google.com",
        description: "Google's conversational AI with multimodal capabilities"
      },
      {
        name: "Anthropic's Claude",
        url: "https://claude.ai",
        description: "Anthropic's easy-to-use conversational AI assistant"
      },
      {
        name: "Hugging Face",
        url: "https://huggingface.co",
        description: "Platform with thousands of open-source models and spaces"
      }
    ]}
    onMarkComplete={onMarkComplete}
    completed={completed}
    tips={[
      "ChatGPT is great for beginners with its simple interface and good documentation",
      "Consider Claude if you need longer context windows or more nuanced responses",
      "Start with the free tiers before investing in paid plans",
      "Hugging Face offers many open source models if you prefer those over proprietary options"
    ]}
  >
    Start with easy-to-access LLMs: for instance, use ChatGPT via OpenAI (through the web UI or 
    the OpenAI API) or Google's Gemini if available. These services let you leverage powerful 
    models without setup.
  </StepCard>
);

export default BasicStep2;
