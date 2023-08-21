import React from 'react';
import { styled } from 'styled-components';
import colors from '../../style/color';

const LoginAbsoluteDiv = styled.div`
  position: absolute;
  display: flex;
  width: 52px;
  height: 52px;
  top: 2px;
  left: 8px;
`;

const LoginContainer = styled.div`
  text-align: center;
  line-height: 56px;
  position: relative;
  width: 343px;
  height: 56px;
  border-radius: 8px;
`;

function Btn({ context, icon: Icon }: { context: string; icon: React.FC<React.SVGProps<SVGSVGElement>> }): JSX.Element {
  let style = {};
  switch (context) {
    case '카카오':
      style = { backgroundColor: `${colors.kakaoYellow}` };
      break;
    case '네이버':
      style = { backgroundColor: `${colors.naverGreen}` };
      break;
    case 'Google':
      style = { border: '0.3px solid #DBDBDB' };
      break;
    default:
      break;
  }
  return (
    <LoginContainer style={style}>
      <LoginAbsoluteDiv>
        <Icon />
      </LoginAbsoluteDiv>
      <p>{context}로 로그인</p>
    </LoginContainer>
  );
}

export default Btn;
