import React from 'react';
import BodyLong3ParagraphStyle from './BodyLong3ParagraphStyle';

function Body3Paragraph({ content, color }: { content: string; color: string }): JSX.Element {
  return <BodyLong3ParagraphStyle style={{ color }}>{content}</BodyLong3ParagraphStyle>;
}

export default Body3Paragraph;
