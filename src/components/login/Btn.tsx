import React from 'react';
import './login.css';
import colors from '../../style/color';

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
    <div id="main-login-container" style={style}>
      <div id="main-absolute-div">
        <Icon />
      </div>
      <p>{context}로 로그인</p>
    </div>
  );
}

export default Btn;
