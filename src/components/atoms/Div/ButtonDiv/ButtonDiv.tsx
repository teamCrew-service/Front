import React from 'react';
import colors from '../../../../assets/styles/color';
import ButtonDivStyle from './ButtonDivStyle';

function ButtonDiv({
  children,
  onClick = () => {},
  fontColor = 'white',
  divColor = `${colors.primary}`,
  borderStyle = 'none',
}: {
  children: any;
  fontColor?: string;
  divColor?: string;
  borderStyle?: string;
  onClick?: (event: any) => void;
}): JSX.Element {
  return (
    <ButtonDivStyle onClick={onClick} style={{ color: fontColor, backgroundColor: divColor, border: borderStyle }}>
      {children}
    </ButtonDivStyle>
  );
}

export default ButtonDiv;
