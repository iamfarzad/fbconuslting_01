
import React from 'react';
import StepCard from '@/components/StepCard';

interface BasicStepProps {
  number: number;
  onMarkComplete?: (number: number, isComplete: boolean) => void;
  completed?: boolean;
}

const BasicStep6 = ({ number, onMarkComplete, completed }: BasicStepProps) => (
  <StepCard 
    number={number} 
    title="Build a simple integration or workflow"
    platforms={[
      {
        name: "Replit",
        url: "https://replit.com",
        description: "Code, create, and learn together with AI assistance"
      },
      {
        name: "Zapier",
        url: "https://zapier.com",
        description: "Connect apps and automate workflows"
      },
      {
        name: "IFTTT",
        url: "https://ifttt.com",
        description: "Connect services with simple if-this-then-that rules"
      },
      {
        name: "Make",
        url: "https://make.com",
        description: "Visual platform to design, build, and automate workflows"
      }
    ]}
    onMarkComplete={onMarkComplete}
    completed={completed}
    tips={[
      "Start with pre-built templates and modify them for your needs",
      "Test your workflows with simple test cases before scaling",
      "Document your workflow for future reference",
      "Consider error handling for when the AI service is unavailable"
    ]}
  >
    With an API key in hand, connect the LLM to your use case. Use integration platforms like Replit, 
    Zapier or IFTTT to create simple automations without extensive coding.
  </StepCard>
);

export default BasicStep6;
