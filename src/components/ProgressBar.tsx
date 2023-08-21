import React from 'react';
import styled from 'styled-components';
import colors from '../style/color';

const ProgressbarContainer = styled.div`
  display: flex;
  height: 100%;
  background-color: ${colors.lightGray};
`;

const ProgressbarStepBox = styled.div`
  width: 33.33%;
  height: 100%;
  background-color: ${colors.blue};
`;

function ProgressBar({ step }: { step: number }): JSX.Element {
  const stepArray: number[] = [];
  let i: number = 0;
  for (i = 1; i <= step; i += 1) {
    stepArray.push(i);
  }
  return (
    <ProgressbarContainer>
      {stepArray.map(item => (
        <ProgressbarStepBox key={item} />
      ))}
    </ProgressbarContainer>
  );
}

export default ProgressBar;
