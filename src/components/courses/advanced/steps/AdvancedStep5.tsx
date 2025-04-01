
import React from 'react';
import StepCard from '@/components/StepCard';

interface AdvancedStepProps {
  number: number;
  onMarkComplete?: (number: number, isComplete: boolean) => void;
  completed?: boolean;
}

const AdvancedStep5 = ({ number, onMarkComplete, completed }: AdvancedStepProps) => (
  <StepCard 
    number={number} 
    title="Ensure scalability and reliability"
    platforms={[
      {
        name: "Kubernetes",
        url: "https://kubernetes.io",
        description: "Container orchestration system for automating deployment and scaling"
      },
      {
        name: "Terraform",
        url: "https://www.terraform.io",
        description: "Infrastructure as code tool for provisioning and managing resources"
      },
      {
        name: "Datadog",
        url: "https://www.datadoghq.com",
        description: "Monitoring and security platform for cloud applications"
      },
      {
        name: "New Relic",
        url: "https://newrelic.com",
        description: "Observability platform for monitoring applications"
      }
    ]}
    onMarkComplete={onMarkComplete}
    completed={completed}
    tips={[
      "Implement circuit breakers for dependent services",
      "Design for graceful degradation when AI services are overloaded",
      "Create a caching strategy for common queries",
      "Plan for regional redundancy for mission-critical systems"
    ]}
  >
    Plan for high availability with containerization, auto-scaling, global distribution via CDNs, 
    comprehensive monitoring, and fallback mechanisms.
  </StepCard>
);

export default AdvancedStep5;
