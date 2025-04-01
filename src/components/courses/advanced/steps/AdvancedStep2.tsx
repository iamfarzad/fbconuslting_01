
import React from 'react';
import StepCard from '@/components/StepCard';

interface AdvancedStepProps {
  number: number;
  onMarkComplete?: (number: number, isComplete: boolean) => void;
  completed?: boolean;
}

const AdvancedStep2 = ({ number, onMarkComplete, completed }: AdvancedStepProps) => (
  <StepCard 
    number={number} 
    title="Select an architecture and LLM approach"
    platforms={[
      {
        name: "Azure OpenAI Service",
        url: "https://azure.microsoft.com/en-us/products/ai-services/openai-service",
        description: "Enterprise-grade deployment of OpenAI models"
      },
      {
        name: "Weights & Biases",
        url: "https://wandb.ai",
        description: "MLOps platform for tracking experiments, models, and datasets"
      },
      {
        name: "Anyscale",
        url: "https://www.anyscale.com",
        description: "Platform for building scalable AI applications"
      },
      {
        name: "Databricks",
        url: "https://www.databricks.com",
        description: "Data and AI platform for large-scale model training"
      }
    ]}
    onMarkComplete={onMarkComplete}
    completed={completed}
    tips={[
      "Consider a hybrid approach using both proprietary and open-source models",
      "Design for model version changes and improvements over time",
      "Evaluate specialized models for specific components of your system",
      "Document architecture decisions and tradeoffs for future reference"
    ]}
  >
    Decide whether to use existing models, fine-tune foundation models, or implement Retrieval-Augmented 
    Generation (RAG) to combine models with your knowledge base.
  </StepCard>
);

export default AdvancedStep2;
