
import React from 'react';
import StepCard from '@/components/StepCard';

interface IntermediateStepProps {
  number: number;
  onMarkComplete?: (number: number, isComplete: boolean) => void;
  completed?: boolean;
}

const IntermediateStep10 = ({ number, onMarkComplete, completed }: IntermediateStepProps) => (
  <StepCard 
    number={number} 
    title="Documentation and training"
    platforms={[
      {
        name: "GitBook",
        url: "https://www.gitbook.com",
        description: "Platform for creating beautiful documentation"
      },
      {
        name: "ReadMe",
        url: "https://readme.com",
        description: "Developer hub for documentation and API references"
      },
      {
        name: "Notion",
        url: "https://notion.so",
        description: "All-in-one workspace for notes and documentation"
      }
    ]}
    onMarkComplete={onMarkComplete}
    completed={completed}
    tips={[
      "Include examples for common use cases",
      "Explain limitations and known issues clearly",
      "Create video tutorials for visual learners",
      "Update documentation as you improve your application"
    ]}
  >
    Document how the system works and provide guidance to users, setting proper expectations about 
    the AI's capabilities and limitations.
  </StepCard>
);

export default IntermediateStep10;
