
import React from 'react';
import StepsList from '@/components/StepsList';
import { 
  BasicStep1, BasicStep2, BasicStep3, BasicStep4,
  BasicStep5, BasicStep6, BasicStep7, BasicStep8, 
  BasicStep9, BasicStep10
} from './steps';

const BasicStepsList = () => {
  const totalSteps = 10;

  return (
    <StepsList totalSteps={totalSteps}>
      <BasicStep1 number={1} />
      <BasicStep2 number={2} />
      <BasicStep3 number={3} />
      <BasicStep4 number={4} />
      <BasicStep5 number={5} />
      <BasicStep6 number={6} />
      <BasicStep7 number={7} />
      <BasicStep8 number={8} />
      <BasicStep9 number={9} />
      <BasicStep10 number={10} />
    </StepsList>
  );
};

export default BasicStepsList;
