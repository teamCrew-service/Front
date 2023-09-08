import React from 'react';
import ProgressbarDivStyle from './ProgressbarDivStyle';

function ProgressbarDiv({ children }: { children: any }): JSX.Element {
  return <ProgressbarDivStyle>{children}</ProgressbarDivStyle>;
}

export default ProgressbarDiv;
