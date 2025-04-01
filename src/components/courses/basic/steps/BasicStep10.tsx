
import React from 'react';
import StepCard from '@/components/StepCard';

interface BasicStepProps {
  number: number;
  onMarkComplete?: (number: number, isComplete: boolean) => void;
  completed?: boolean;
}

const BasicStep10 = ({ number, onMarkComplete, completed }: BasicStepProps) => (
  <StepCard 
    number={number} 
    title="Understand AI limitations and considerations"
    platforms={[
      {
        name: "OpenAI Safety Best Practices",
        url: "https://platform.openai.com/docs/guides/safety-best-practices",
        description: "Guidelines for responsible AI use"
      },
      {
        name: "AI Ethics Guidelines",
        url: "https://www.unesco.org/en/artificial-intelligence/recommendation-ethics",
        description: "UNESCO's ethical guidelines for AI"
      },
      {
        name: "Google's Responsible AI",
        url: "https://ai.google/responsibility/",
        description: "Google's approach to responsible AI development"
      },
      {
        name: "Fine-tuning Explained",
        url: "https://www.deeplearning.ai/short-courses/fine-tuning-large-language-models/",
        description: "Free course explaining fine-tuning in simple terms"
      }
    ]}
    onMarkComplete={onMarkComplete}
    completed={completed}
    tips={[
      "Remember that AI models can 'hallucinate' or provide incorrect information with confidence",
      "Start with small datasets for any fine-tuning experiments",
      "Never share sensitive personal data with AI models unless absolutely necessary",
      "Consider content filtering for user inputs to prevent abuse of your AI system",
      "Plan for regular updates as AI technology and best practices evolve quickly"
    ]}
  >
    <div className="space-y-4">
      <p>
        Even the most advanced AI models have important limitations you should understand:
      </p>
      
      <h4 className="text-sm font-semibold mt-3">What is fine-tuning?</h4>
      <p>
        Fine-tuning means customizing an AI model for specific tasks by training it on your own examples. 
        For beginners, this is usually unnecessary - pre-built models often work well. If needed later, 
        start with simple techniques like better prompts or "retrieval augmented generation" before attempting fine-tuning.
      </p>
      
      <h4 className="text-sm font-semibold mt-3">Security considerations:</h4>
      <p>
        1. Keep API keys private - never expose them in public code
        <br />
        2. Be careful about what data you share with AI models
        <br />
        3. Set usage limits to avoid unexpected costs
        <br />
        4. Consider implementing user authentication for public AI tools
      </p>
      
      <h4 className="text-sm font-semibold mt-3">Common limitations:</h4>
      <p>
        1. AI can make up facts or "hallucinate" information
        <br />
        2. Models have knowledge cutoffs (e.g., ChatGPT's knowledge ends at a specific date)
        <br />
        3. They may produce biased or inappropriate content without safeguards
        <br />
        4. Large inputs or outputs may cause errors or increased costs
      </p>
    </div>
  </StepCard>
);

export default BasicStep10;
