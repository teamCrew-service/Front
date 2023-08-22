import React from 'react';
import ButtonDiv from '../styledComponent/styledDiv/ButtonDiv';
import ButtonDivContext from '../styledComponent/styledP/ButtonDivContext';

function Btn({ step, onClick }: { step: number; onClick: () => void }): JSX.Element {
  const contextList = ['다음', '다음', '시작하기'];
  return (
    <ButtonDiv onClick={onClick} style={{ marginTop: 'auto', marginBottom: '60px' }}>
      <ButtonDivContext>{contextList[step - 1]}</ButtonDivContext>
    </ButtonDiv>
  );
}

export default Btn;
