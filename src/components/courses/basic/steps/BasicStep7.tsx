
import React from 'react';
import StepCard from '@/components/StepCard';

interface BasicStepProps {
  number: number;
  onMarkComplete?: (number: number, isComplete: boolean) => void;
  completed?: boolean;
}

const BasicStep7 = ({ number, onMarkComplete, completed }: BasicStepProps) => (
  <StepCard 
    number={number} 
    title="Test with real examples"
    platforms={[
      {
        name: "GPTSandbox",
        url: "https://gptsandbox.com",
        description: "Test your AI assistant with different prompts and scenarios"
      },
      {
        name: "LangSmith",
        url: "https://smith.langchain.com",
        description: "Debug, test and evaluate your LLM applications"
      }
    ]}
    onMarkComplete={onMarkComplete}
    completed={completed}
    tips={[
      "Create a test set of diverse inputs that covers your use cases",
      "Try edge cases and unusual inputs to test robustness",
      "Get feedback from someone who hasn't been involved in building the system",
      "Track where the AI struggles to identify improvement areas"
    ]}
  >
    Try out your AI system end-to-end. Verify the answers make sense and the system is user-friendly. 
    Tweak your prompts or rules to handle common issues.
  </StepCard>
);

export default BasicStep7;
