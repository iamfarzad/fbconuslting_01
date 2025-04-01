
import React from 'react';
import StepsList from '@/components/StepsList';
import { 
  IntermediateStep1, IntermediateStep2, IntermediateStep3, IntermediateStep4,
  IntermediateStep5, IntermediateStep6, IntermediateStep7, IntermediateStep8,
  IntermediateStep9, IntermediateStep10
} from './IntermediateStepItems';

const IntermediateStepsList = () => {
  const totalSteps = 10;

  return (
    <StepsList totalSteps={totalSteps}>
      <IntermediateStep1 number={1} />
      <IntermediateStep2 number={2} />
      <IntermediateStep3 number={3} />
      <IntermediateStep4 number={4} />
      <IntermediateStep5 number={5} />
      <IntermediateStep6 number={6} />
      <IntermediateStep7 number={7} />
      <IntermediateStep8 number={8} />
      <IntermediateStep9 number={9} />
      <IntermediateStep10 number={10} />
    </StepsList>
  );
};

export default IntermediateStepsList;
