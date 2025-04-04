'use client';

import { useEffect } from 'react';
import { useCourseProgress } from '@/contexts/CourseProgressContext';
import { courseData } from '@/data/course/courseData';
import LevelSection from '@/components/courses/LevelSection';
import StepsList from '@/components/courses/StepsList';
import StepCard from '@/components/courses/StepCard'; // Import StepCard
import { useLocalization } from '@/hooks/useLocalization';
import type { StepWithProgress, Step } from '@/types/course'; // Add Step type

const CoursePage = () => {
  const { progress, setCurrentStep } = useCourseProgress();
  const { language } = useLocalization();

  const stepsWithProgress: StepWithProgress[] = courseData.levels.flatMap(level =>
    level.steps.map(step => ({
      ...step,
      isCompleted: progress.completedSteps.includes(step.id),
      isActive: progress.currentStep === step.id
    }))
  );

  // Set current step if none is selected
  useEffect(() => {
    if (!progress.currentStep && stepsWithProgress.length > 0) {
      setCurrentStep(stepsWithProgress[0].id);
    }
  }, [progress.currentStep, setCurrentStep, stepsWithProgress]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">
        {courseData.levels[0]?.title[language] || "Course Content"}
      </h1>
      {courseData.levels.map(level => (
        <LevelSection
          key={level.id}
          // Pass level.id which should match 'Basic', 'Intermediate', or 'Advanced'
          level={level.id as 'Basic' | 'Intermediate' | 'Advanced'}
          // Pass other necessary props from the level object
          id={level.id}
          title={level.title[language] || level.title['en']}
          subtitle={level.description[language] || level.description['en']}
        >
          {/* Map over steps and render StepCard as children of StepsList */}
          <StepsList totalSteps={level.steps.length}>
            {level.steps.map((step: Step, index: number) => (
              <StepCard
                key={step.id}
                number={index + 1} // Use index for step number
                title={step.title[language] || step.title['en']} // Pass localized title
                // levelId={level.id} // Removed - StepCard doesn't accept this prop
                // Pass other potential props from step object if needed by StepCard
                // platforms={step.platforms}
                // tips={step.tips}
                // completed and onMarkComplete are handled by StepsList cloning
              >
                {/* Pass localized description as children */}
                {step.description[language] || step.description['en']}
              </StepCard>
            ))}
          </StepsList>
        </LevelSection>
      ))}
    </div>
  );
};

export default CoursePage;
