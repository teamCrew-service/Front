import React from 'react';
import SmallCardDivStyle from './SmallCardDivStyle';

function SmallCardDiv({ children, onClick }: { children: any; onClick?: () => void }): JSX.Element {
  return <SmallCardDivStyle onClick={onClick}>{children}</SmallCardDivStyle>;
}

SmallCardDiv.defaultProps = {
  onClick: () => {},
};

export default SmallCardDiv;
