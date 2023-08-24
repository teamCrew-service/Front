import React from 'react';
import SplashDivStyle from './SplashDivStyle';

function SplashDiv({ children }: { children: any }): JSX.Element {
  return <SplashDivStyle>{children}</SplashDivStyle>;
}

export default SplashDiv;
