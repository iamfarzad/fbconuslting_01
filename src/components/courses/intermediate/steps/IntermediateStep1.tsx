
import React from 'react';
import StepCard from '@/components/StepCard';

interface IntermediateStepProps {
  number: number;
  onMarkComplete?: (number: number, isComplete: boolean) => void;
  completed?: boolean;
}

const IntermediateStep1 = ({ number, onMarkComplete, completed }: IntermediateStepProps) => (
  <StepCard 
    number={number} 
    title="Plan the enhanced use case and requirements"
    platforms={[
      {
        name: "Miro",
        url: "https://miro.com",
        description: "Visual collaboration platform for planning and brainstorming"
      },
      {
        name: "Notion",
        url: "https://notion.so",
        description: "All-in-one workspace for notes, planning and collaboration"
      },
      {
        name: "Trello",
        url: "https://trello.com",
        description: "Visual project management tool"
      }
    ]}
    onMarkComplete={onMarkComplete}
    completed={completed}
    tips={[
      "Create user stories to define exactly what your AI should accomplish",
      "Map out the user journey from start to finish",
      "Define clear success metrics for your project",
      "Consider potential limitations and edge cases early"
    ]}
  >
    Revisit your project goals with ambition. Identify new features or use cases to tackle, and consider 
    scale – will a few dozen internal users use this tool, or is it customer-facing?
  </StepCard>
);

export default IntermediateStep1;
