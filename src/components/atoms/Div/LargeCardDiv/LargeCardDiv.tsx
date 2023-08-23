import React from 'react';
import LargeCardDivStyle from './LargeCardDiv.style';

function LargeCardDiv({ children }: { children: any }): JSX.Element {
  return <LargeCardDivStyle>{children}</LargeCardDivStyle>;
}

export default LargeCardDiv;
