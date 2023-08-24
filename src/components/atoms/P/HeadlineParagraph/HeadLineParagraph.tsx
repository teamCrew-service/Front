import React from 'react';
import HeadLineParagraphStyle from './HeadLineParagraphStyle';

function HeadLineParagraph({ content }: { content: string }): JSX.Element {
  return <HeadLineParagraphStyle>{content}</HeadLineParagraphStyle>;
}

export default HeadLineParagraph;
