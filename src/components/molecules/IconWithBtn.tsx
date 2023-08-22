import React from 'react';
import colors from '../../assets/styles/color';
import ButtonDiv from '../atoms/Div/ButtonDiv/ButtonDiv';
import AbsoluteDiv from '../atoms/Div/AbsoluteDiv/AbsoluteDiv';
import ButtonDivParagraph from '../atoms/P/ButtonDivParagraph/ButtonDivParagraph';

function IconWithBtn({
  context,
  icon,
}: {
  context: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}): JSX.Element {
  let fontColor;
  let color;
  let style;
  switch (context) {
    case '카카오':
      color = `${colors.kakaoYellow}`;
      break;
    case '네이버':
      color = `${colors.naverGreen}`;
      break;
    case 'Google':
      fontColor = 'black';
      color = 'white';
      style = '0.3px solid #DBDBDB';
      break;
    default:
      break;
  }
  return (
    <ButtonDiv divColor={color} fontColor={fontColor} borderStyle={style}>
      <AbsoluteDiv icon={icon} left="8px" />
      <ButtonDivParagraph>{context}로 로그인</ButtonDivParagraph>
    </ButtonDiv>
  );
}

export default IconWithBtn;