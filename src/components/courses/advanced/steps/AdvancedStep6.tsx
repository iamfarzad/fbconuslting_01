
import React from 'react';
import StepCard from '@/components/StepCard';

interface AdvancedStepProps {
  number: number;
  onMarkComplete?: (number: number, isComplete: boolean) => void;
  completed?: boolean;
}

const AdvancedStep6 = ({ number, onMarkComplete, completed }: AdvancedStepProps) => (
  <StepCard 
    number={number} 
    title="Address security, privacy, and compliance"
    platforms={[
      {
        name: "AWS Security Hub",
        url: "https://aws.amazon.com/security-hub",
        description: "Security and compliance center for AWS"
      },
      {
        name: "Auth0",
        url: "https://auth0.com",
        description: "Authentication and authorization platform"
      },
      {
        name: "OpenAI Moderation API",
        url: "https://platform.openai.com/docs/guides/moderation",
        description: "Tool to detect harmful content"
      },
      {
        name: "Vault",
        url: "https://www.vaultproject.io",
        description: "Tool for securely storing and accessing secrets"
      }
    ]}
    onMarkComplete={onMarkComplete}
    completed={completed}
    tips={[
      "Implement role-based access control for sensitive operations",
      "Conduct regular security audits of your AI system",
      "Create a data retention and deletion policy",
      "Have legal experts review your privacy policy and terms of service"
    ]}
  >
    Implement data privacy measures, access controls, compliance with industry standards, and content 
    filtering to prevent harmful outputs.
  </StepCard>
);

export default AdvancedStep6;
