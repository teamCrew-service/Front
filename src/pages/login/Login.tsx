import React from 'react';
import { Link } from 'react-router-dom';
import icons from '../../assets/icons';
import './Login.css';
import IconWithBtn from '../../components/molecules/IconWithBtn';

function Login(): JSX.Element {
  return (
    <div className="container login-container">
      <div className="login-logo">
        <icons.TeamLogo />
      </div>
      <div className="login-btn-list">
        <IconWithBtn context="카카오" icon={icons.Kakao} />
        <IconWithBtn context="네이버" icon={icons.Naver} />
        <IconWithBtn context="Google" icon={icons.Google} />
        <Link to="/home">가입 전에 일단 둘러보기</Link>
      </div>
    </div>
  );
}

export default Login;
