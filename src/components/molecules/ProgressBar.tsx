import React from 'react';
import colors from '../../assets/styles/color';
import ProgressbarDiv from '../atoms/Div/ProgressbarDiv/ProgressbarDivStyle';

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
