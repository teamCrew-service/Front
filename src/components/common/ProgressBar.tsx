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
  &.thinType {
    background-color: #f9fafb;
    height: 5px;
    ${StepbarDiv} {
      background-color: ${colors.blue};
    }
  }
`;

function ProgressBar({ step, totalSteps, type }: { step: number; totalSteps: number; type?: string }): JSX.Element {
  const stepArray: number[] = [];
  let i: number = 0;
  for (i = 1; i <= step; i += 1) {
    stepArray.push(i);
  }
  return (
    <ProgressbarDiv className={type}>
      {stepArray.map(item => (
        <StepbarDiv key={item} $totalSteps={totalSteps} />
      ))}
    </ProgressbarDiv>
  );
}

export default ProgressBar;
