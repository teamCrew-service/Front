import React from 'react';
import Body3ParagrpahStyle from './Body3ParagrpahStyle';

function Body3Paragraph({ content, color }: { content: string; color: string }): JSX.Element {
  return <Body3ParagrpahStyle $color={color}>{content}</Body3ParagrpahStyle>;
}

export default Body3Paragraph;
