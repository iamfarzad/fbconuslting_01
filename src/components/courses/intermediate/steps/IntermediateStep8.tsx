
import React from 'react';
import StepCard from '@/components/StepCard';

interface IntermediateStepProps {
  number: number;
  onMarkComplete?: (number: number, isComplete: boolean) => void;
  completed?: boolean;
}

const IntermediateStep8 = ({ number, onMarkComplete, completed }: IntermediateStepProps) => (
  <StepCard 
    number={number} 
    title="Test extensively with target users"
    platforms={[
      {
        name: "UserTesting",
        url: "https://www.usertesting.com",
        description: "Platform for getting feedback from real users"
      },
      {
        name: "Maze",
        url: "https://maze.co",
        description: "Rapid testing platform for user research"
      },
      {
        name: "Hotjar",
        url: "https://www.hotjar.com",
        description: "Behavior analytics and feedback platform"
      }
    ]}
    onMarkComplete={onMarkComplete}
    completed={completed}
    tips={[
      "Create specific tasks for users to accomplish with your AI",
      "Observe users without guiding them to see natural interactions",
      "Collect both quantitative metrics and qualitative feedback",
      "Prioritize fixes based on frequency and severity of issues"
    ]}
  >
    Gather feedback on the AI's answers, interface convenience, and handling of edge cases. Iterate 
    based on this feedback.
  </StepCard>
);

export default IntermediateStep8;
