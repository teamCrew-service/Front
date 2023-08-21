import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Main from './pages/main/Main';

function App(): JSX.Element {
  return (
    <div id="total">
      <div className="container">
        <Routes>
          <Route path="/" element=<Home /> />
          <Route path="/login" element=<Login /> />
          <Route path="/main" element=<Main /> />
        </Routes>
      </div>
    </div>
  );
}

export default App;
