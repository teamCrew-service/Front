import React from 'react';
import ProgressbarDiv from 'components/atoms/Div/ProgressbarDiv/ProgressbarDivStyle';
import StepbarDiv from 'components/atoms/Div/StepbarDiv/StepbarDiv';

function ProgressBar({ step, totalSteps }: { step: number; totalSteps: number }): JSX.Element {
  const stepArray: number[] = [];
  let i: number = 0;
  for (i = 1; i <= step; i += 1) {
    stepArray.push(i);
  }
  return (
    <ProgressbarDiv>
      {stepArray.map(item => (
        <StepbarDiv key={item} totalSteps={totalSteps} />
      ))}
    </ProgressbarDiv>
  );
}

export default ProgressBar;
