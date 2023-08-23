import React from 'react';
import StepbarDivStyle from './StepbarDivStyle';

function StepbarDiv({ width }: { width: string }): JSX.Element {
  return <StepbarDivStyle $width={width} />;
}

export default StepbarDiv;
