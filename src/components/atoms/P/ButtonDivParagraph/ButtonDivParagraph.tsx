import React from 'react';
import ButtonDivParagraphStyle from './ButtonDivParagraphStyle';

function ButtonDivParagraph({ children }: { children: any }): JSX.Element {
  return <ButtonDivParagraphStyle>{children}</ButtonDivParagraphStyle>;
}

export default ButtonDivParagraph;
