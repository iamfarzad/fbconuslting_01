
import React from 'react';
import StepCard from '@/components/StepCard';

interface IntermediateStepProps {
  number: number;
  onMarkComplete?: (number: number, isComplete: boolean) => void;
  completed?: boolean;
}

const IntermediateStep3 = ({ number, onMarkComplete, completed }: IntermediateStepProps) => (
  <StepCard 
    number={number} 
    title="Set up your development environment"
    platforms={[
      {
        name: "VS Code",
        url: "https://code.visualstudio.com",
        description: "Powerful code editor with GitHub Copilot integration"
      },
      {
        name: "GitHub Copilot",
        url: "https://github.com/features/copilot",
        description: "AI pair programmer that suggests code as you type"
      },
      {
        name: "Replit",
        url: "https://replit.com",
        description: "Browser-based IDE with AI assistance"
      },
      {
        name: "JupyterLab",
        url: "https://jupyter.org",
        description: "Web-based interactive development environment for notebooks"
      }
    ]}
    onMarkComplete={onMarkComplete}
    completed={completed}
    tips={[
      "Set up a virtual environment to manage dependencies",
      "Use version control from the start, even for small projects",
      "Configure AI coding assistants to boost productivity",
      "Create a consistent project structure to keep organized"
    ]}
  >
    Use an IDE with AI coding assistant like VS Code with GitHub Copilot or Replit with Ghostwriter. 
    Pick a stack you're comfortable with and use version control for tracking code changes.
  </StepCard>
);

export default IntermediateStep3;
