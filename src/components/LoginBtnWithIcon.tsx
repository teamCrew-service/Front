/* eslint-disable react/require-default-props */
import React from 'react';
import colors from '../assets/styles/color';
import ButtonDiv from '../styledComponent/ButtonDiv';

function LoginBtnWithIcon({
  context,
  icon: Icon,
  onClick = () => {},
}: {
  context: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  onClick?: () => any;
}): JSX.Element {
  let fontColor;
  let bgColor;
  let border;
  let link;
  switch (context) {
    case '카카오':
      bgColor = `${colors.kakaoYellow}`;
      fontColor = 'black';
      link = `${process.env.REACT_APP_SERVER_URL}/api/auth/kakao`;
      break;
    case '네이버':
      bgColor = `${colors.naverGreen}`;

      link = `${process.env.REACT_APP_SERVER_URL}/api/auth/naver`;
      break;
    case 'Google':
      bgColor = 'white';
      fontColor = 'black';
      border = '0.3px solid #DBDBDB';
      link = '#';
      break;
    default:
      break;
  }
  return (
    <ButtonDiv onClick={onClick} style={{ color: fontColor, backgroundColor: bgColor, border }}>
      <div style={{ position: 'absolute', top: '1px', left: '8px' }}>
        <Icon />
      </div>
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
        {context}로 로그인
      </a>
    </ButtonDiv>
  );
}

export default LoginBtnWithIcon;
