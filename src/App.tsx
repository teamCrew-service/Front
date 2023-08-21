import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Main from './pages/main/Main';

function App(): JSX.Element {
  return (
    <div id="container">
      <div id="total">
        <Routes>
          <Route path="/" element=<Home /> />
          <Route path="/main" element=<Main /> />
        </Routes>
      </div>
    </div>
  );
}

export default App;
