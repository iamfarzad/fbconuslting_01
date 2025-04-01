
import React from 'react';
import StepCard from '@/components/StepCard';

interface AdvancedStepProps {
  number: number;
  onMarkComplete?: (number: number, isComplete: boolean) => void;
  completed?: boolean;
}

const AdvancedStep8 = ({ number, onMarkComplete, completed }: AdvancedStepProps) => (
  <StepCard 
    number={number} 
    title="Ongoing maintenance and integration"
    platforms={[
      {
        name: "MLflow",
        url: "https://mlflow.org",
        description: "Platform for managing the ML lifecycle"
      },
      {
        name: "Grafana",
        url: "https://grafana.com",
        description: "Analytics and monitoring solution"
      },
      {
        name: "Prometheus",
        url: "https://prometheus.io",
        description: "Monitoring system and time series database"
      },
      {
        name: "GitHub",
        url: "https://github.com",
        description: "Platform for version control and collaboration"
      }
    ]}
    onMarkComplete={onMarkComplete}
    completed={completed}
    tips={[
      "Establish a regular cadence for model updates and evaluations",
      "Create a knowledge base of common issues and solutions",
      "Monitor for data drift and model performance degradation",
      "Build a feedback loop with end users for continuous improvement"
    ]}
  >
    Monitor model performance over time, update models and data regularly, expand capabilities as 
    needed, and manage costs at scale.
  </StepCard>
);

export default AdvancedStep8;
