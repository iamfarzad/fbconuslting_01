import React from 'react';

interface Step {
  id: string;
  title: string;
  description: string;
}

interface StepsListProps {
  steps?: Step[];
  children?: React.ReactNode;
  onSelectStep?: (stepId: string) => void;
  currentStepId?: string;
  totalSteps?: number;
}

const StepsList: React.FC<StepsListProps> = ({ 
  steps = [],
  children,
  onSelectStep,
  currentStepId,
  totalSteps
}) => {
  if (children) {
    return <div className="space-y-4">{children}</div>;
  }
  
  return (
    <div className="space-y-4">
      {steps.map((step) => (
        <div 
          key={step.id}
          className={`p-4 border rounded-lg cursor-pointer hover:border-primary transition-colors ${
            currentStepId === step.id ? 'border-primary bg-primary/5' : 'border-gray-200'
          }`}
          onClick={() => onSelectStep?.(step.id)}
        >
          <h3 className="font-medium">{step.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{step.description}</p>
        </div>
      ))}
    </div>
  );
};

export default StepsList;
