
import React from 'react';
import StepCard from '@/components/StepCard';

interface AdvancedStepProps {
  number: number;
  onMarkComplete?: (number: number, isComplete: boolean) => void;
  completed?: boolean;
}

const AdvancedStep4 = ({ number, onMarkComplete, completed }: AdvancedStepProps) => (
  <StepCard 
    number={number} 
    title="Fine-tune and iterate on AI performance"
    platforms={[
      {
        name: "OpenAI Fine-tuning",
        url: "https://platform.openai.com/docs/guides/fine-tuning",
        description: "Guide to fine-tuning OpenAI models"
      },
      {
        name: "TensorFlow",
        url: "https://www.tensorflow.org",
        description: "Platform for building and training ML models"
      },
      {
        name: "PyTorch",
        url: "https://pytorch.org",
        description: "Open source machine learning framework"
      },
      {
        name: "Ragas",
        url: "https://docs.ragas.io",
        description: "Evaluation framework for RAG systems"
      }
    ]}
    onMarkComplete={onMarkComplete}
    completed={completed}
    tips={[
      "Create a systematic evaluation framework with objective metrics",
      "Collect and label real user interactions for improvement data",
      "Consider RLHF (Reinforcement Learning from Human Feedback) for advanced tuning",
      "Implement A/B testing to validate improvements objectively"
    ]}
  >
    Invest in domain-specific fine-tuning, optimize prompts with few-shot examples, and establish 
    feedback loops for continuous improvement.
  </StepCard>
);

export default AdvancedStep4;
