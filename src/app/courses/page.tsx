import React from 'react';
import PageHeader from '@/components/PageHeader';
import LevelSection from '@/components/courses/LevelSection'; // Use alias
import BasicStepsList from '@/components/courses/basic/BasicStepsList'; // Use alias
import IntermediateStepsList from '@/components/courses/intermediate/IntermediateStepsList'; // Use alias
import AdvancedStepsList from '@/components/courses/advanced/AdvancedStepsList'; // Use alias

const CoursesPage = () => {
  return (
    <>
      <PageHeader
        title="AI Builder Courses"
        subtitle="Learn to build AI applications step-by-step, from basic concepts to advanced techniques."
      />
      
      <LevelSection
        id="basic"
        level="Basic"
        title="Basic AI Builder"
        subtitle="Start your AI journey here. Learn the fundamentals without complex coding."
      >
        <BasicStepsList />
      </LevelSection>

      <LevelSection
        id="intermediate"
        level="Intermediate"
        title="Intermediate AI Builder"
        subtitle="Build custom AI applications by integrating models and handling data."
      >
        <IntermediateStepsList />
      </LevelSection>

      <LevelSection
        id="advanced"
        level="Advanced"
        title="Advanced AI Engineering"
        subtitle="Master advanced techniques for scalable, reliable, and production-ready AI systems."
      >
        <AdvancedStepsList />
      </LevelSection>
    </>
  );
};

export default CoursesPage;
