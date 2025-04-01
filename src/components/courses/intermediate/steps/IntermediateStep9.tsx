
import React from 'react';
import StepCard from '@/components/StepCard';

interface IntermediateStepProps {
  number: number;
  onMarkComplete?: (number: number, isComplete: boolean) => void;
  completed?: boolean;
}

const IntermediateStep9 = ({ number, onMarkComplete, completed }: IntermediateStepProps) => (
  <StepCard 
    number={number} 
    title="Deploy on a scalable platform"
    platforms={[
      {
        name: "AWS",
        url: "https://aws.amazon.com",
        description: "Cloud computing services for deploying scalable applications"
      },
      {
        name: "Google Cloud",
        url: "https://cloud.google.com",
        description: "Suite of cloud computing services for app deployment"
      },
      {
        name: "Vercel",
        url: "https://vercel.com",
        description: "Platform optimized for frontend frameworks and static sites"
      },
      {
        name: "Heroku",
        url: "https://www.heroku.com",
        description: "Cloud platform for building and deploying applications"
      }
    ]}
    onMarkComplete={onMarkComplete}
    completed={completed}
    tips={[
      "Set up proper monitoring and alerting from day one",
      "Implement CI/CD pipelines for smooth deployment workflows",
      "Start with a staging environment before production",
      "Plan for scaling both horizontally and vertically"
    ]}
  >
    Choose robust deployment options like Vercel, cloud platforms (AWS, Heroku), or app stores for 
    mobile apps. Set up monitoring and ensure security.
  </StepCard>
);

export default IntermediateStep9;
