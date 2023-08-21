import React from 'react';
import './ProgressBar.css';
import colors from '../style/color';

function ProgressBar({ step }: { step: number }): JSX.Element {
  const stepArray: number[] = [];
  let i: number = 0;
  for (i = 1; i <= step; i += 1) {
    stepArray.push(i);
  }
  return (
    <div className="progressbar-container">
      {stepArray.map(item => (
        <div
          key={item}
          className="progressbar-step-box"
          style={{
            width: `33.33%`,
            backgroundColor: `${colors.blue}`,
          }}
        />
      ))}
    </div>
  );
}

export default ProgressBar;
