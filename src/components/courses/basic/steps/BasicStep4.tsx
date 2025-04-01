
import React from 'react';
import StepCard from '@/components/StepCard';

interface BasicStepProps {
  number: number;
  onMarkComplete?: (number: number, isComplete: boolean) => void;
  completed?: boolean;
}

const BasicStep4 = ({ number, onMarkComplete, completed }: BasicStepProps) => (
  <StepCard 
    number={number} 
    title="Use no-code tools to prototype an app"
    platforms={[
      {
        name: "Lovable",
        url: "https://lovable.dev",
        description: "Build web applications with AI assistance"
      },
      {
        name: "Vercel v0",
        url: "https://v0.dev",
        description: "Generate UI components with AI"
      },
      {
        name: "Bubble",
        url: "https://bubble.io",
        description: "Visual programming for web apps"
      },
      {
        name: "FlutterFlow",
        url: "https://flutterflow.io",
        description: "Build native mobile apps without code"
      }
    ]}
    onMarkComplete={onMarkComplete}
    completed={completed}
    tips={[
      "Start with a simple wireframe or sketch of your interface",
      "Focus on core functionality first, add bells and whistles later",
      "Take screenshots of your prototype to share with potential users for feedback",
      "Don't worry about perfection - this is just to test your concept"
    ]}
  >
    If you want a custom interface (like a simple web app or chatbot UI) without coding everything, 
    leverage AI app builders like Vercel's V0.dev, Lovable.dev, or other no-code platforms that can 
    help you build a functional application.
  </StepCard>
);

export default BasicStep4;
