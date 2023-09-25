import React from 'react';
import { Link } from 'react-router-dom';
import icons from '../../assets/icons';
import './style.css';
import LoginBtnWithIcon from '../../components/login/LoginBtnWithIcon';
import colors from '../../assets/styles/color';

function Login(): JSX.Element {
  return (
    <div className="container" id="login-container">
      <div className="login-logo">
        <icons.TeamLogo />
      </div>
      <div className="login-btn-list body-base-m">
        <LoginBtnWithIcon context="카카오" icon={icons.Kakao} />
        <LoginBtnWithIcon context="네이버" icon={icons.Naver} />
        <LoginBtnWithIcon context="Google" icon={icons.Google} />
        <div style={{ display: 'flex', alignItems: 'center', height: '56px' }}>
          <Link style={{ color: `${colors.gray400}`, textDecoration: 'none' }} to="/home">
            둘러보기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
