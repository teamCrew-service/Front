import React from 'react';
import StepbarDivStyle from './StepbarDivStyle';

function StepbarDiv({ totalSteps }: { totalSteps: number }): JSX.Element {
  return <StepbarDivStyle $totalSteps={totalSteps} />;
}

export default StepbarDiv;
