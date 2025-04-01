
import React from 'react';
import StepCard from '@/components/StepCard';

interface BasicStepProps {
  number: number;
  onMarkComplete?: (number: number, isComplete: boolean) => void;
  completed?: boolean;
}

const BasicStep9 = ({ number, onMarkComplete, completed }: BasicStepProps) => (
  <StepCard 
    number={number} 
    title="Learn from the experience"
    platforms={[
      {
        name: "Deeplearning.ai",
        url: "https://www.deeplearning.ai/courses/",
        description: "Online courses in AI and deep learning"
      },
      {
        name: "Coursera AI Courses",
        url: "https://www.coursera.org/courses?query=artificial%20intelligence",
        description: "Online courses on AI fundamentals and applications"
      },
      {
        name: "OpenAI Cookbook",
        url: "https://cookbook.openai.com/",
        description: "Examples and guides for building with OpenAI's API"
      }
    ]}
    onMarkComplete={onMarkComplete}
    completed={completed}
    tips={[
      "Keep a log of what worked and what didn't",
      "Join communities like Hugging Face forums or OpenAI Discord to learn from others",
      "Take a more structured course if you want to deepen your knowledge",
      "Try implementing the same solution with a different approach or model"
    ]}
  >
    Note what the limitations are. Does the AI give wrong answers on certain topics? Does it struggle 
    with very long inputs? Use these observations to plan improvements.
  </StepCard>
);

export default BasicStep9;
