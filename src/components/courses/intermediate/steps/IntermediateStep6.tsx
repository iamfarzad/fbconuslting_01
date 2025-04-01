
import React from 'react';
import StepCard from '@/components/StepCard';

interface IntermediateStepProps {
  number: number;
  onMarkComplete?: (number: number, isComplete: boolean) => void;
  completed?: boolean;
}

const IntermediateStep6 = ({ number, onMarkComplete, completed }: IntermediateStepProps) => (
  <StepCard 
    number={number} 
    title="Incorporate memory or simple data storage"
    platforms={[
      {
        name: "Supabase",
        url: "https://supabase.com",
        description: "Open source Firebase alternative with PostgreSQL database"
      },
      {
        name: "Firebase",
        url: "https://firebase.google.com",
        description: "Google's platform for building web and mobile applications"
      },
      {
        name: "Redis",
        url: "https://redis.com",
        description: "In-memory data structure store, used as database and cache"
      },
      {
        name: "MongoDB",
        url: "https://www.mongodb.com",
        description: "Document-oriented NoSQL database"
      }
    ]}
    onMarkComplete={onMarkComplete}
    completed={completed}
    tips={[
      "Start with a simple conversation history mechanism",
      "Consider storing embeddings for semantic search capabilities",
      "Implement a TTL (time to live) for stored data",
      "Plan for data growth with proper indexing strategies"
    ]}
  >
    Implement methods to store context between interactions, using conversation history or a database 
    to give your AI a "memory" of past interactions or user preferences.
  </StepCard>
);

export default IntermediateStep6;
