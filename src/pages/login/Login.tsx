import React from 'react';
import { Link } from 'react-router-dom';
import icons from 'assets/icons';
import './LoginStyle.css';
import LoginBtnWithIcon from 'components/molecules/LoginBtnWithIcon';

function Login(): JSX.Element {
  return (
    <div className="container" id="login-container">
      <div className="login-logo">
        <icons.TeamLogo />
      </div>
      <div className="login-btn-list">
        <LoginBtnWithIcon context="카카오" icon={icons.Kakao} />
        <LoginBtnWithIcon context="네이버" icon={icons.Naver} />
        <LoginBtnWithIcon context="Google" icon={icons.Google} />
        <Link to="/home">가입 전에 일단 둘러보기</Link>
      </div>
    </div>
  );
}

export default Login;
