import React from 'react';
import LargeCardDivStyle from './LargeCardDivStyle';

function LargeCardDiv({ children }: { children: any }): JSX.Element {
  return <LargeCardDivStyle>{children}</LargeCardDivStyle>;
}

export default LargeCardDiv;
