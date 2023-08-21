import React from 'react';
import './onboarding.css';
import colors from '../../style/color';

function BlueBtn({ step, onClick }: { step: number; onClick: () => void }): JSX.Element {
  const contextList = ['다음', '다음', '시작하기'];
  return (
    <button onClick={onClick} className="onboarding-btn" type="button" style={{ backgroundColor: `${colors.blue}` }}>
      {contextList[step - 1]}
    </button>
  );
}

export default BlueBtn;
