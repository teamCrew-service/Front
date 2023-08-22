import React from 'react';
import colors from '../style/color';
import ButtonDiv from '../styledComponent/styledDiv/ButtonDiv';
import AbsoluteDiv from '../styledComponent/styledDiv/AbsoluteDiv';

function IconWithBtn({
  context,
  icon: Icon,
}: {
  context: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}): JSX.Element {
  let color;
  let style = {};
  switch (context) {
    case '카카오':
      color = `${colors.kakaoYellow}`;
      break;
    case '네이버':
      color = `${colors.naverGreen}`;
      break;
    case 'Google':
      color = 'white';
      style = { border: '0.3px solid #DBDBDB' };
      break;
    default:
      break;
  }
  return (
    <ButtonDiv $divColor={color} style={style}>
      <AbsoluteDiv style={{ left: '8px' }}>
        <Icon />
      </AbsoluteDiv>
      <p>{context}로 로그인</p>
    </ButtonDiv>
  );
}

export default IconWithBtn;
