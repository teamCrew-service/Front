import React from 'react';
// import styled from 'styled-components';
import colors from '../style/color';
import ProgressbarDiv from '../styledComponent/styledDiv/ProgressbarDiv';

// const ProgressbarContainer = styled.div`
//   display: flex;
//   height: 100%;
//   background-color: ${colors.lightGray};
// `;

// const ProgressbarStepBox = styled.div`
//   width: 33.33%;
//   height: 100%;
//   background-color: ${colors.blue};
// `;

function ProgressBar({ step }: { step: number }): JSX.Element {
  const stepArray: number[] = [];
  let i: number = 0;
  for (i = 1; i <= step; i += 1) {
    stepArray.push(i);
  }
  return (
    <ProgressbarDiv $width="100%" $display="flex">
      {stepArray.map(item => (
        <ProgressbarDiv $width="33.33%" $color={colors.blue} key={item} />
      ))}
    </ProgressbarDiv>
  );
}

export default ProgressBar;
