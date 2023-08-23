import React from 'react';
import SubHead1ParagraphStyle from './SubHead1ParagraphStyle';

function SubHead1Paragraph({ content }: { content: string }): JSX.Element {
  return <SubHead1ParagraphStyle>{content}</SubHead1ParagraphStyle>;
}

export default SubHead1Paragraph;
