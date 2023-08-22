import React from 'react';
import AbsoluteDivStyle from './AbsoluteDivStyle';

function AbsoluteDiv({
  icon: Icon,
  left,
}: {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  left?: string;
}): JSX.Element {
  return (
    <AbsoluteDivStyle $left={left}>
      <Icon />
    </AbsoluteDivStyle>
  );
}

AbsoluteDiv.defaultProps = {
  left: '0',
};

export default AbsoluteDiv;
