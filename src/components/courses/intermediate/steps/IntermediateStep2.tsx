
import React from 'react';
import StepCard from '@/components/StepCard';

interface IntermediateStepProps {
  number: number;
  onMarkComplete?: (number: number, isComplete: boolean) => void;
  completed?: boolean;
}

const IntermediateStep2 = ({ number, onMarkComplete, completed }: IntermediateStepProps) => (
  <StepCard 
    number={number} 
    title="Choose the right LLM and platform for your needs"
    platforms={[
      {
        name: "OpenAI Models",
        url: "https://platform.openai.com/docs/models",
        description: "Overview of all available OpenAI models"
      },
      {
        name: "Anthropic Models",
        url: "https://docs.anthropic.com/claude/docs/models-overview",
        description: "Overview of Claude model capabilities"
      },
      {
        name: "HuggingFace Model Hub",
        url: "https://huggingface.co/models",
        description: "Repository of thousands of pre-trained models"
      },
      {
        name: "Replicate",
        url: "https://replicate.com",
        description: "Run open-source models with a cloud API"
      }
    ]}
    onMarkComplete={onMarkComplete}
    completed={completed}
    tips={[
      "Compare token pricing across different providers",
      "Check context window limits for your specific use case needs",
      "Some models excel at certain tasks (coding, reasoning, creative writing)",
      "Consider open source models if you need more customization or lower costs"
    ]}
  >
    Evaluate providers beyond the basic options, considering factors like cost, performance, and any 
    domain-specific strengths. Consider OpenAI, Google's Gemini, Anthropic Claude, or emerging models.
  </StepCard>
);

export default IntermediateStep2;
