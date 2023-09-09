import React from 'react';
import SmallCardDivStyle from './SmallCardDivStyle';

function SmallCardDiv({
  children,
  onClick = () => {},
  color = '',
}: {
  children: any;
  onClick?: (event: any) => void;
  color?: string;
}): JSX.Element {
  return (
    <SmallCardDivStyle style={{ backgroundColor: color }} onClick={onClick}>
      {children}
    </SmallCardDivStyle>
  );
}

export default SmallCardDiv;
