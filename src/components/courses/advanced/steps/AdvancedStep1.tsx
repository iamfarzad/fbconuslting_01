
import React from 'react';
import StepCard from '@/components/StepCard';

interface AdvancedStepProps {
  number: number;
  onMarkComplete?: (number: number, isComplete: boolean) => void;
  completed?: boolean;
}

const AdvancedStep1 = ({ number, onMarkComplete, completed }: AdvancedStepProps) => (
  <StepCard 
    number={number} 
    title="Align AI projects with business strategy"
    platforms={[
      {
        name: "BCG AI Strategy",
        url: "https://www.bcg.com/capabilities/digital-technology-data/artificial-intelligence",
        description: "Consulting on AI business strategy and implementation"
      },
      {
        name: "Accenture AI",
        url: "https://www.accenture.com/us-en/services/artificial-intelligence-index",
        description: "Strategic consulting for enterprise AI implementation"
      },
      {
        name: "McKinsey AI",
        url: "https://www.mckinsey.com/capabilities/quantumblack/how-we-help-clients",
        description: "AI consulting and implementation for enterprises"
      }
    ]}
    onMarkComplete={onMarkComplete}
    completed={completed}
    tips={[
      "Perform a thorough cost-benefit analysis before starting",
      "Identify KPIs that directly connect to business objectives",
      "Get buy-in from key stakeholders across departments",
      "Consider both short-term wins and long-term strategic value"
    ]}
  >
    Identify high-impact use cases, engage stakeholders to define success metrics, and address 
    compliance or policy requirements for your AI deployment.
  </StepCard>
);

export default AdvancedStep1;
