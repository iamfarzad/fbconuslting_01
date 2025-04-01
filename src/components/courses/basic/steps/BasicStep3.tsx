
import React from 'react';
import StepCard from '@/components/StepCard';

interface BasicStepProps {
  number: number;
  onMarkComplete?: (number: number, isComplete: boolean) => void;
  completed?: boolean;
}

const BasicStep3 = ({ number, onMarkComplete, completed }: BasicStepProps) => (
  <StepCard 
    number={number} 
    title="Experiment with the model using prompts"
    platforms={[
      {
        name: "PromptPerfect",
        url: "https://promptperfect.jina.ai/",
        description: "AI tool to optimize and improve your prompts"
      },
      {
        name: "Learn Prompting",
        url: "https://learnprompting.org/",
        description: "Free, open-source course on prompt engineering"
      },
      {
        name: "Awesome ChatGPT Prompts",
        url: "https://github.com/f/awesome-chatgpt-prompts",
        description: "Collection of prompt examples for ChatGPT"
      }
    ]}
    onMarkComplete={onMarkComplete}
    completed={completed}
    tips={[
      "Include clear instructions and constraints in your prompts",
      "Break complex tasks into smaller steps for the AI",
      "Use examples (few-shot prompting) to guide the AI's responses",
      "Experiment with system messages to set the AI's persona or role"
    ]}
  >
    In the chat interface, try asking the LLM to perform your task. Refine your prompts to get better 
    results (this is "prompt engineering"). For example, if creating a content assistant, prompt it 
    with "You are a helpful writing assistant. Help me draft an email about X."
  </StepCard>
);

export default BasicStep3;
