import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App(): JSX.Element {
  return (
    <div>
      <Routes>
        <Route path="/" element=<Home /> />
      </Routes>
    </div>
  );
}

export default App;
