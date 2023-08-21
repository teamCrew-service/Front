import React from 'react';
import { Link } from 'react-router-dom';
import icons from '../../icons';
import './Login.css';
import Btn from '../../components/login/Btn';

function Main(): JSX.Element {
  return (
    <div className="container main-container">
      <div className="main-logo">
        <icons.TeamLogo />
      </div>
      <div className="main-btn-list">
        <Btn context="카카오" icon={icons.Kakao} />
        <Btn context="네이버" icon={icons.Naver} />
        <Btn context="Google" icon={icons.Google} />
        <Link to="/main">가입 전에 일단 둘러보기</Link>
      </div>
    </div>
  );
}

export default Main;
