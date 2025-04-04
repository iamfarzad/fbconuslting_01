import React from 'react';
import LevelSection from '@/components/courses/LevelSection';
import StepsList from '@/components/courses/StepsList';
import BasicStepsList from '@/components/courses/basic/BasicStepsList';
import IntermediateStepsList from '@/components/courses/intermediate/IntermediateStepsList';
import AdvancedStepsList from '@/components/courses/advanced/AdvancedStepsList';
import PageHeader from '@/components/PageHeader'; // Corrected import for default export

const WorkshopPage = () => {
  // Calculate total steps (adjust based on actual number of steps)
  const totalBasicSteps = 10;
  const totalIntermediateSteps = 10;
  const totalAdvancedSteps = 8;

  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="AI Builder Workshop"
        subtitle="Hands-on guides to building and integrating AI into your projects."
      />

      <LevelSection
        id="basic"
        title="Basic Level: Foundations"
        subtitle="Start your AI journey with fundamental concepts and simple implementations."
        level="Basic"
        className="mb-16"
      >
        <StepsList totalSteps={totalBasicSteps}>
          <BasicStepsList />
        </StepsList>
      </LevelSection>

      <LevelSection
        id="intermediate"
        title="Intermediate Level: Practical Applications"
        subtitle="Dive deeper into practical AI techniques and build more complex applications."
        level="Intermediate"
        className="mb-16"
      >
        <StepsList totalSteps={totalIntermediateSteps}>
          <IntermediateStepsList />
        </StepsList>
      </LevelSection>

      <LevelSection
        id="advanced"
        title="Advanced Level: Cutting-Edge Techniques"
        subtitle="Explore advanced AI models, optimization strategies, and deployment."
        level="Advanced"
      >
        <StepsList totalSteps={totalAdvancedSteps}>
          <AdvancedStepsList />
        </StepsList>
      </LevelSection>
    </div>
  );
};

export default WorkshopPage;
