import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import OnBoarding from './pages/onboarding/Onboarding';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import FindCrew from './pages/findcrew/FindCrew';
import Category from './pages/userinfo/category/Category';
import Join from './pages/member/Join';
import Nickname from './pages/userinfo/nickname/Nickname';
import Birthday from './pages/userinfo/birthday/Birthday';
import Gender from './pages/userinfo/gender/Gender';
import Profile from './pages/userinfo/profile/Profile';

function App(): JSX.Element {
  return (
    <div id="total">
      <div className="container">
        <Routes>
          <Route path="/" element=<OnBoarding /> />
          <Route path="/login" element=<Login /> />
          <Route path="/login/category" element=<Category /> />
          <Route path="/login/nickname" element=<Nickname /> />
          <Route path="/login/birthday" element=<Birthday /> />
          <Route path="/login/gender" element=<Gender /> />
          <Route path="/login/profile" element=<Profile /> />
          <Route path="/join" element=<Join /> />
          <Route path="/home" element=<Home /> />
          <Route path="/findcrew" element=<FindCrew /> />
        </Routes>
      </div>
    </div>
  );
}

export default App;
