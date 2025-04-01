
import React from 'react';
import StepCard from '@/components/StepCard';

interface BasicStepProps {
  number: number;
  onMarkComplete?: (number: number, isComplete: boolean) => void;
  completed?: boolean;
}

const BasicStep8 = ({ number, onMarkComplete, completed }: BasicStepProps) => (
  <StepCard 
    number={number} 
    title="Deploy and share"
    platforms={[
      {
        name: "Vercel",
        url: "https://vercel.com",
        description: "Platform for frontend frameworks and static sites"
      },
      {
        name: "Netlify",
        url: "https://netlify.com",
        description: "Web hosting and automation platform"
      },
      {
        name: "Replit Deployments",
        url: "https://replit.com/site/hosting",
        description: "Deploy websites directly from Replit"
      },
      {
        name: "Hugging Face Spaces",
        url: "https://huggingface.co/spaces",
        description: "Host ML demos for free"
      }
    ]}
    onMarkComplete={onMarkComplete}
    completed={completed}
    tips={[
      "Start with a soft launch to a small group before wider release",
      "Create a simple landing page explaining what your AI tool does",
      "Add a feedback mechanism for users to report issues",
      "Monitor usage and performance after deployment"
    ]}
  >
    Once satisfied, deploy your basic AI system so you (or others) can use it. Use simple hosting 
    platforms like Vercel, Replit hosting, or the built-in deployment features of no-code solutions.
  </StepCard>
);

export default BasicStep8;
