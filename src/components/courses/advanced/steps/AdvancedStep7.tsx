
import React from 'react';
import StepCard from '@/components/StepCard';

interface AdvancedStepProps {
  number: number;
  onMarkComplete?: (number: number, isComplete: boolean) => void;
  completed?: boolean;
}

const AdvancedStep7 = ({ number, onMarkComplete, completed }: AdvancedStepProps) => (
  <StepCard 
    number={number} 
    title="Deploy to production and distribute"
    platforms={[
      {
        name: "GitLab CI/CD",
        url: "https://docs.gitlab.com/ee/ci",
        description: "Continuous integration and deployment platform"
      },
      {
        name: "GitHub Actions",
        url: "https://github.com/features/actions",
        description: "CI/CD and automation platform integrated with GitHub"
      },
      {
        name: "CircleCI",
        url: "https://circleci.com",
        description: "Continuous integration and delivery platform"
      },
      {
        name: "Spinnaker",
        url: "https://spinnaker.io",
        description: "Multi-cloud continuous delivery platform"
      }
    ]}
    onMarkComplete={onMarkComplete}
    completed={completed}
    tips={[
      "Implement feature flags for controlled rollout",
      "Create a rollback plan for each deployment",
      "Establish clear communication channels for deployment updates",
      "Automate as much of the deployment process as possible"
    ]}
  >
    Use staged rollout strategies, ensure consistency across platforms, and provide training to help 
    users adapt to the new AI system.
  </StepCard>
);

export default AdvancedStep7;
