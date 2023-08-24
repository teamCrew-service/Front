import React from 'react';
import SmallCardDivStyle from './SmallCardDivStyle';

function SmallCardDiv({ children }: { children: any }): JSX.Element {
  return <SmallCardDivStyle>{children}</SmallCardDivStyle>;
}

export default SmallCardDiv;
