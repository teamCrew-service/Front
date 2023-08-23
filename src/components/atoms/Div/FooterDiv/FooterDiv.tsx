import React from 'react';
import FooterDivStyle from './FooterDivStyle';

function FooterDiv({ children }: { children: any }): JSX.Element {
  return <FooterDivStyle>{children}</FooterDivStyle>;
}

export default FooterDiv;
