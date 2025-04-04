import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
// Removed unused StepCard import
import { Skeleton } from '@/components/ui/skeleton';

// Dynamically import all step components
// NOTE: This approach might load all components initially. Consider optimizing if needed.
const stepComponents = {
  basic: {
    '1': React.lazy(() => import('@/components/courses/basic/steps/BasicStep1')),
    '2': React.lazy(() => import('@/components/courses/basic/steps/BasicStep2')),
    '3': React.lazy(() => import('@/components/courses/basic/steps/BasicStep3')),
    '4': React.lazy(() => import('@/components/courses/basic/steps/BasicStep4')),
    '5': React.lazy(() => import('@/components/courses/basic/steps/BasicStep5')),
    '6': React.lazy(() => import('@/components/courses/basic/steps/BasicStep6')),
    '7': React.lazy(() => import('@/components/courses/basic/steps/BasicStep7')),
    '8': React.lazy(() => import('@/components/courses/basic/steps/BasicStep8')),
    '9': React.lazy(() => import('@/components/courses/basic/steps/BasicStep9')),
    '10': React.lazy(() => import('@/components/courses/basic/steps/BasicStep10')),
  },
  intermediate: {
    '1': React.lazy(() => import('@/components/courses/intermediate/steps/IntermediateStep1')),
    '2': React.lazy(() => import('@/components/courses/intermediate/steps/IntermediateStep2')),
    '3': React.lazy(() => import('@/components/courses/intermediate/steps/IntermediateStep3')),
    '4': React.lazy(() => import('@/components/courses/intermediate/steps/IntermediateStep4')),
    '5': React.lazy(() => import('@/components/courses/intermediate/steps/IntermediateStep5')),
    '6': React.lazy(() => import('@/components/courses/intermediate/steps/IntermediateStep6')),
    '7': React.lazy(() => import('@/components/courses/intermediate/steps/IntermediateStep7')),
    '8': React.lazy(() => import('@/components/courses/intermediate/steps/IntermediateStep8')),
    '9': React.lazy(() => import('@/components/courses/intermediate/steps/IntermediateStep9')),
    '10': React.lazy(() => import('@/components/courses/intermediate/steps/IntermediateStep10')),
  },
  advanced: {
     '1': React.lazy(() => import('@/components/courses/advanced/steps/AdvancedStep1')),
     '2': React.lazy(() => import('@/components/courses/advanced/steps/AdvancedStep2')),
     '3': React.lazy(() => import('@/components/courses/advanced/steps/AdvancedStep3')),
     '4': React.lazy(() => import('@/components/courses/advanced/steps/AdvancedStep4')),
     '5': React.lazy(() => import('@/components/courses/advanced/steps/AdvancedStep5')),
     '6': React.lazy(() => import('@/components/courses/advanced/steps/AdvancedStep6')),
     '7': React.lazy(() => import('@/components/courses/advanced/steps/AdvancedStep7')),
     '8': React.lazy(() => import('@/components/courses/advanced/steps/AdvancedStep8')),
  },
};

interface WorkshopStepPageProps {
  params: {
    level: keyof typeof stepComponents;
    stepId: string;
  };
}

// Helper function to get the component based on params
const getStepComponent = (level: keyof typeof stepComponents, stepId: string) => {
  const levelSteps = stepComponents[level];
  if (!levelSteps) return null;
  
  const StepComponent = levelSteps[stepId as keyof typeof levelSteps];
  return StepComponent || null;
};

const WorkshopStepPage = ({ params }: WorkshopStepPageProps) => {
  const { level, stepId } = params;
  const StepComponent = getStepComponent(level, stepId);

  if (!StepComponent) {
    notFound(); // Show 404 if level or stepId is invalid
  }

  // Capitalize level for display
  const displayLevel = level.charAt(0).toUpperCase() + level.slice(1);
  const stepNumber = parseInt(stepId, 10);

  return (
    <div className="container mx-auto px-4 py-12">
       <PageHeader
        title={`${displayLevel} Workshop - Step ${stepNumber}`}
        subtitle={`Detailed guide for step ${stepNumber} of the ${level} level.`}
      />
      
      <div className="max-w-4xl mx-auto mt-8">
        {/* Wrap the dynamically loaded component in Suspense */}
        <Suspense fallback={<StepSkeleton />}>
           {/* 
             We assume the StepComponent itself doesn't need props like title/number 
             as it's self-contained content. If StepCard is needed as a wrapper, 
             We assume the StepComponent itself doesn't need props like title/number 
            as it's self-contained content. If StepCard is needed as a wrapper, 
            adjust this structure. For now, rendering the step content directly.
            --> This assumption was wrong. Passing the required number prop now.
           */}
          <StepComponent number={stepNumber} />
        </Suspense>
      </div>
    </div>
  );
};

// Simple skeleton loader for the step content
const StepSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-8 w-3/4" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
    <Skeleton className="h-10 w-1/4 mt-4" />
  </div>
);


export default WorkshopStepPage;

// Optional: Generate static paths if the number of steps is fixed
// export async function generateStaticParams() {
//   const paths: { level: string; stepId: string }[] = [];
//   Object.keys(stepComponents).forEach((level) => {
//     Object.keys(stepComponents[level as keyof typeof stepComponents]).forEach((stepId) => {
//       paths.push({ level, stepId });
//     });
//   });
//   return paths;
// }
