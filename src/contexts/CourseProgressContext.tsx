'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const initialProgress: CourseProgress = {
  completedSteps: [],
  currentStep: undefined,
  lastAccessed: {},
  progress: 0
};

interface CourseProgressContextType {
  progress: CourseProgress;
  setProgress: React.Dispatch<React.SetStateAction<CourseProgress>>;
  completeStep: (stepId: string, totalSteps: number) => void;
  isStepCompleted: (stepId: string) => boolean;
  setCurrentStep: (stepId: string) => void;
  calculateProgress: (completedCount: number, totalSteps: number) => void;
}

const CourseProgressContext = createContext<CourseProgressContextType | undefined>(undefined);

export const CourseProgressProvider = ({ children }: { children: React.ReactNode }) => {
  const [progress, setProgress] = useState<CourseProgress>(initialProgress);

  useEffect(() => {
    // Load saved progress from localStorage
    const savedProgress = localStorage.getItem('courseProgress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  useEffect(() => {
    // Save progress to localStorage when it changes
    localStorage.setItem('courseProgress', JSON.stringify(progress));
  }, [progress]);

  const completeStep = (stepId: string, totalSteps: number) => {
    setProgress(prev => {
      const newCompletedSteps = prev.completedSteps.includes(stepId)
        ? prev.completedSteps
        : [...prev.completedSteps, stepId];
      
      return {
        ...prev,
        completedSteps: newCompletedSteps,
        lastAccessed: {
          ...prev.lastAccessed,
          [stepId]: new Date().toISOString()
        },
        progress: (newCompletedSteps.length / totalSteps) * 100
      };
    });
  };

  const isStepCompleted = (stepId: string) => {
    return progress.completedSteps.includes(stepId);
  };

  const setCurrentStep = (stepId: string) => {
    setProgress(prev => ({
      ...prev,
      currentStep: stepId,
      lastAccessed: {
        ...prev.lastAccessed,
        [stepId]: new Date().toISOString()
      }
    }));
  };

  const calculateProgress = (completedCount: number, totalSteps: number) => {
    setProgress(prev => ({
      ...prev,
      progress: (completedCount / totalSteps) * 100
    }));
  };

  return (
    <CourseProgressContext.Provider value={{
      progress,
      setProgress,
      completeStep,
      isStepCompleted,
      setCurrentStep,
      calculateProgress
    }}>
      {children}
    </CourseProgressContext.Provider>
  );
};

export const useCourseProgress = () => {
  const context = useContext(CourseProgressContext);
  if (context === undefined) {
    throw new Error('useCourseProgress must be used within a CourseProgressProvider');
  }
  return context;
};
