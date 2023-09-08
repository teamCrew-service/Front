/* eslint-disable react/require-default-props */
import React from 'react';
import colors from '../../assets/styles/color';
import ButtonDiv from '../atoms/Div/ButtonDiv/ButtonDiv';
import AbsoluteDiv from '../atoms/Div/AbsoluteDiv/AbsoluteDiv';
import ButtonDivParagraph from '../atoms/P/ButtonDivParagraph/ButtonDivParagraph';

function LoginBtnWithIcon({
  context,
  icon,
  onClick = () => {},
}: {
  context: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  onClick?: () => any;
}): JSX.Element {
  let fontColor;
  let color;
  let style;
  let link;
  switch (context) {
    case '카카오':
      color = `${colors.kakaoYellow}`;
      link = `${process.env.REACT_APP_SERVER_URL}/api/auth/kakao`;
      // link = 'http://localhost:3000/login/category?token=1234';
      break;
    case '네이버':
      color = `${colors.naverGreen}`;
      link = `${process.env.REACT_APP_SERVER_URL}/api/auth/naver`;
      break;
    case 'Google':
      fontColor = 'black';
      color = 'white';
      style = '0.3px solid #DBDBDB';
      link = '#';
      break;
    default:
      break;
  }
  return (
    <ButtonDiv onClick={onClick} divColor={color} fontColor={fontColor} borderStyle={style}>
      <AbsoluteDiv icon={icon} left="8px" />
      {/* passport kakao 구현 시 anchor tag를 이용해서 로그인 해야됨 */}
      <a
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          textDecoration: 'none',
          color: 'inherit',
          borderRadius: '8px',
        }}
        href={link}
      >
        <ButtonDivParagraph>{context}로 로그인</ButtonDivParagraph>
      </a>
    </ButtonDiv>
  );
}

export default LoginBtnWithIcon;
