import React from 'react';
import styled from 'styled-components';
import colors from '../../style/color';

const OnBoardingBtn = styled.button`
  width: 343px;
  height: 56px;
  border-radius: 8px;
  border: none;
  margin-top: auto;
  margin-bottom: 60px;
  color: white;
  font-weight: 600;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.408px;
`;

function BlueBtn({ step, onClick }: { step: number; onClick: () => void }): JSX.Element {
  const contextList = ['다음', '다음', '시작하기'];
  return (
    <OnBoardingBtn onClick={onClick} type="button" style={{ backgroundColor: `${colors.blue}` }}>
      {contextList[step - 1]}
    </OnBoardingBtn>
  );
}

export default BlueBtn;
