
import React from 'react';
import StepCard from '@/components/StepCard';

interface BasicStepProps {
  number: number;
  onMarkComplete?: (number: number, isComplete: boolean) => void;
  completed?: boolean;
}

const BasicStep1 = ({ number, onMarkComplete, completed }: BasicStepProps) => (
  <StepCard 
    number={number} 
    title="Define your AI's purpose and use case"
    platforms={[
      {
        name: "AI Use Case Generator",
        url: "https://theapplaunchpad.com/ai-use-case-generator/",
        description: "A tool that helps you brainstorm potential AI use cases for your specific needs"
      },
      {
        name: "Anthropic's Claude",
        url: "https://claude.ai",
        description: "Ask Claude to help you define scope and purpose for your AI assistant"
      }
    ]}
    onMarkComplete={onMarkComplete}
    completed={completed}
    tips={[
      "Start with a very specific problem rather than a broad one",
      "Think about repetitive tasks in your workflow that could be automated",
      "Consider tasks where you need to process large amounts of text or data",
      "Focus on one core functionality first before expanding"
    ]}
  >
    Decide what you want your AI to do – for example, a personal writing assistant, a customer 
    support chatbot, an idea generator, or a simple business automation. Keep the scope simple 
    (e.g. answering FAQs or scheduling help) to match a beginner's capability.
  </StepCard>
);

export default BasicStep1;
