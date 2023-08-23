import React from 'react';
import ButtonDivStyle from './ButtonDivStyle';
import colors from '../../../../assets/styles/color';

function ButtonDiv({
  children,
  onClick,
  fontColor,
  divColor,
  borderStyle,
}: {
  children: any;
  fontColor?: string;
  divColor?: string;
  borderStyle?: string;
  onClick: () => void;
}): JSX.Element {
  return (
    <ButtonDivStyle onClick={onClick} $color={fontColor} $backgroundColor={divColor} $border={borderStyle}>
      {children}
    </ButtonDivStyle>
  );
}

ButtonDiv.defaultProps = {
  fontColor: 'white',
  divColor: `${colors.blue}`,
  borderStyle: 'none',
};

export default ButtonDiv;
