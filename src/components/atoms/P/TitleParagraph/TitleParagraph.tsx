import React from 'react';
import TitleParagraphStyle from './TitleParagraphStyle';

function TitleParagraph({
  context,
  margin,
}: {
  context: string;
  margin: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
}): JSX.Element {
  return (
    <TitleParagraphStyle
      style={{
        marginTop: `${margin.top}px`,
        marginBottom: `${margin.bottom}px`,
        marginLeft: `${margin.left}px`,
        marginRight: `${margin.right}px`,
      }}
    >
      {context}
    </TitleParagraphStyle>
  );
}

export default TitleParagraph;
