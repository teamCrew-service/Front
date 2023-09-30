import React from 'react';
import styled from 'styled-components';
import colors from '../../assets/styles/color';

const StepbarDiv = styled.div<{ $totalSteps: number }>`
  width: ${props => (1 / props.$totalSteps) * 100}%;
  height: 100%;
  background-color: ${colors.primary};
`;

const ProgressbarDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: ${colors.gray50};
`;

function ProgressBar({ step, totalSteps }: { step: number; totalSteps: number }): JSX.Element {
  const stepArray: number[] = [];
  let i: number = 0;
  for (i = 1; i <= step; i += 1) {
    stepArray.push(i);
  }
  return (
    <ProgressbarDiv>
      {stepArray.map(item => (
        <StepbarDiv key={item} $totalSteps={totalSteps} />
      ))}
    </ProgressbarDiv>
  );
}

export default ProgressBar;
