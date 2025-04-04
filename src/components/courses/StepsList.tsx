
"use client"; // Add the directive here

import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

interface StepsListProps {
  totalSteps: number;
  children: React.ReactNode;
}

const StepsList = ({ totalSteps, children }: StepsListProps) => {
  const [completedSteps, setCompletedSteps] = useState<{[key: number]: boolean}>({});
  const [progress, setProgress] = useState(0);
  
  const handleMarkComplete = (stepNumber: number, isComplete: boolean) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepNumber]: isComplete
    }));
  };
  
  useEffect(() => {
    const completedCount = Object.values(completedSteps).filter(Boolean).length;
    setProgress(Math.round((completedCount / totalSteps) * 100));
  }, [completedSteps, totalSteps]);

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Your progress: {progress}% complete</span>
          <span className="text-sm text-muted-foreground">{Object.values(completedSteps).filter(Boolean).length}/{totalSteps} steps</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            onMarkComplete: handleMarkComplete,
            completed: completedSteps[child.props.number] || false
          } as any);
        }
        return child;
      })}
    </div>
  );
};

export default StepsList;
