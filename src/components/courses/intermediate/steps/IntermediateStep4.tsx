
import React from 'react';
import StepCard from '@/components/StepCard';

interface IntermediateStepProps {
  number: number;
  onMarkComplete?: (number: number, isComplete: boolean) => void;
  completed?: boolean;
}

const IntermediateStep4 = ({ number, onMarkComplete, completed }: IntermediateStepProps) => (
  <StepCard 
    number={number} 
    title="Integrate the LLM into a custom application"
    platforms={[
      {
        name: "LangChain",
        url: "https://www.langchain.com",
        description: "Framework for developing applications powered by language models"
      },
      {
        name: "LlamaIndex",
        url: "https://www.llamaindex.ai",
        description: "Data framework for LLM applications"
      },
      {
        name: "Vercel AI SDK",
        url: "https://sdk.vercel.ai/docs",
        description: "Library for building AI-powered user interfaces"
      },
      {
        name: "Streamlit",
        url: "https://streamlit.io",
        description: "Framework for rapidly building ML and data science web apps"
      }
    ]}
    onMarkComplete={onMarkComplete}
    completed={completed}
    tips={[
      "Start with example code from official documentation",
      "Implement error handling for API failures and rate limits",
      "Create a simple caching mechanism to reduce API calls",
      "Sanitize user inputs and validate outputs before displaying"
    ]}
  >
    Write code to handle user queries, send them to the LLM API, and process the responses. Incorporate 
    business rules and test with sample inputs.
  </StepCard>
);

export default IntermediateStep4;
