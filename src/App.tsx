import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'App.css';
import OnBoarding from 'pages/onboarding/Onboarding';
import Login from 'pages/login/Login';
import Home from 'pages/home/Home';
import FindCrew from 'pages/findcrew/FindCrew';

function App(): JSX.Element {
  return (
    <div id="total">
      <div className="container">
        <Routes>
          <Route path="/" element=<OnBoarding /> />
          <Route path="/login" element=<Login /> />
          <Route path="/home" element=<Home /> />
          <Route path="/findcrew" element=<FindCrew /> />
        </Routes>
      </div>
    </div>
  );
}

export default App;
