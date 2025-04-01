
import React from 'react';
import StepCard from '@/components/StepCard';

interface IntermediateStepProps {
  number: number;
  onMarkComplete?: (number: number, isComplete: boolean) => void;
  completed?: boolean;
}

const IntermediateStep7 = ({ number, onMarkComplete, completed }: IntermediateStepProps) => (
  <StepCard 
    number={number} 
    title="Consider fine-tuning or customizing the model"
    platforms={[
      {
        name: "OpenAI Fine-tuning",
        url: "https://platform.openai.com/docs/guides/fine-tuning",
        description: "Guide to fine-tuning OpenAI models"
      },
      {
        name: "Hugging Face Transfer Learning",
        url: "https://huggingface.co/docs/transformers/training",
        description: "Fine-tune pre-trained models on your datasets"
      },
      {
        name: "Vector Databases",
        url: "https://www.pinecone.io",
        description: "Vector database for storing and querying embeddings"
      },
      {
        name: "LlamaIndex RAG",
        url: "https://docs.llamaindex.ai/en/stable/examples/retrievers/",
        description: "Implement retrieval augmented generation"
      }
    ]}
    onMarkComplete={onMarkComplete}
    completed={completed}
    tips={[
      "RAG is often simpler and more cost-effective than fine-tuning",
      "Prepare a clean, diverse dataset before attempting fine-tuning",
      "Start with a smaller model for faster fine-tuning iterations",
      "Evaluate your fine-tuned model with objective metrics"
    ]}
  >
    If the base model isn't meeting specific needs, explore fine-tuning on your custom dataset or use 
    techniques like Retrieval Augmented Generation to combine the model with your proprietary data.
  </StepCard>
);

export default IntermediateStep7;
