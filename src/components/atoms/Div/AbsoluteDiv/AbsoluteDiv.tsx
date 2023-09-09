import React from 'react';
import AbsoluteDivStyle from './AbsoluteDivStyle';

function AbsoluteDiv({
  icon: Icon,
  left = '0',
}: {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  left?: string;
}): JSX.Element {
  return (
    <AbsoluteDivStyle style={{ left }}>
      <Icon />
    </AbsoluteDivStyle>
  );
}

export default AbsoluteDiv;
