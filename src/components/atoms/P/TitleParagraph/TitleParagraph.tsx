/* eslint-disable react/require-default-props */
import React from 'react';
import TitleParagraphStyle from './TitleParagraphStyle';

function TitleParagraph({
  context,
  margin = { top: 0, right: 0, bottom: 0, left: 0 },
}: {
  context: string;
  margin?: {
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
