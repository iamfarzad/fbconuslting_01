
import React from 'react';
import StepCard from '@/components/StepCard';

interface IntermediateStepProps {
  number: number;
  onMarkComplete?: (number: number, isComplete: boolean) => void;
  completed?: boolean;
}

const IntermediateStep5 = ({ number, onMarkComplete, completed }: IntermediateStepProps) => (
  <StepCard 
    number={number} 
    title="Build a user interface (web, mobile, or voice)"
    platforms={[
      {
        name: "React",
        url: "https://react.dev",
        description: "JavaScript library for building user interfaces"
      },
      {
        name: "Next.js",
        url: "https://nextjs.org",
        description: "React framework for production-grade applications"
      },
      {
        name: "Flutter",
        url: "https://flutter.dev",
        description: "UI toolkit for building natively compiled applications"
      },
      {
        name: "Voiceflow",
        url: "https://www.voiceflow.com",
        description: "Design, prototype, and build voice apps"
      }
    ]}
    onMarkComplete={onMarkComplete}
    completed={completed}
    tips={[
      "Focus on usability and clear feedback for AI interactions",
      "Design for loading states and uncertainty in responses",
      "Make the interface adaptable to various response types",
      "Create clear error states when the AI can't provide an answer"
    ]}
  >
    Create an interface that suits your users, whether it's a web app, mobile app, or voice interface. 
    Ensure good user experience with loading states and error handling.
  </StepCard>
);

export default IntermediateStep5;
