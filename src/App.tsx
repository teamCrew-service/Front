import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import OnBoarding from './pages/Onbaording/OnBoarding';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';

function App(): JSX.Element {
  return (
    <div id="total">
      <div className="container">
        <Routes>
          <Route path="/" element=<OnBoarding /> />
          <Route path="/login" element=<Login /> />
          <Route path="/main" element=<Main /> />
        </Routes>
      </div>
    </div>
  );
}

export default App;
