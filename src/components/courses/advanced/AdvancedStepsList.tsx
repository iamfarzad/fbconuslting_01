
import React from 'react';
import StepsList from '@/components/StepsList';
import { 
  AdvancedStep1, AdvancedStep2, AdvancedStep3, AdvancedStep4,
  AdvancedStep5, AdvancedStep6, AdvancedStep7, AdvancedStep8
} from './AdvancedStepItems';

const AdvancedStepsList = () => {
  const totalSteps = 8;

  return (
    <StepsList totalSteps={totalSteps}>
      <AdvancedStep1 number={1} />
      <AdvancedStep2 number={2} />
      <AdvancedStep3 number={3} />
      <AdvancedStep4 number={4} />
      <AdvancedStep5 number={5} />
      <AdvancedStep6 number={6} />
      <AdvancedStep7 number={7} />
      <AdvancedStep8 number={8} />
    </StepsList>
  );
};

export default AdvancedStepsList;
