
import React from 'react';
import StepCard from '@/components/StepCard';

interface AdvancedStepProps {
  number: number;
  onMarkComplete?: (number: number, isComplete: boolean) => void;
  completed?: boolean;
}

const AdvancedStep3 = ({ number, onMarkComplete, completed }: AdvancedStepProps) => (
  <StepCard 
    number={number} 
    title="Develop with robust engineering practices"
    platforms={[
      {
        name: "LangChain",
        url: "https://www.langchain.com",
        description: "Framework for developing applications powered by language models"
      },
      {
        name: "Haystack",
        url: "https://haystack.deepset.ai",
        description: "Open-source framework for building NLP pipelines"
      },
      {
        name: "FastAPI",
        url: "https://fastapi.tiangolo.com",
        description: "Framework for building high-performance APIs"
      },
      {
        name: "Docker",
        url: "https://www.docker.com",
        description: "Platform for developing, shipping, and running applications in containers"
      }
    ]}
    onMarkComplete={onMarkComplete}
    completed={completed}
    tips={[
      "Implement comprehensive logging for model inputs, outputs, and errors",
      "Use dependency injection patterns for swappable model providers",
      "Design for multiple interface types (API, chat, voice) from the start",
      "Create a fallback strategy for when primary models are unavailable"
    ]}
  >
    Implement modular design with microservices, multiple interface types, sophisticated context 
    management, and integration with external tools through agent frameworks.
  </StepCard>
);

export default AdvancedStep3;
