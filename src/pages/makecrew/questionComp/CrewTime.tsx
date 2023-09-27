import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { spendTimeStr, stepNum } from '../../../atoms/makecrew';

import AnswerBox from './common/AnswerBox';
import { QuestionBox } from '../styled';
import TitleLargeBold from '../../../styledComponent/heading/TitleLargeBold';
import colors from '../../../assets/styles/color';
import BodyLargeBold from '../../../styledComponent/heading/BodyLargeBold';

const StyledInput = styled.input`
  width: 100%;
  height: 56px;
  border: 1px solid ${colors.primary};
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
`;

const StyledBtn = styled.button`
  width: 100%;
  height: 56px;
  border-radius: 4px;
  border: none;
  background-color: ${colors.primary};
  color: white;
  &:disabled {
    background-color: ${colors.gray200};
    color: ${colors.gray500};
  }
`;

function CrewTime({ crewType }: { crewType: '장기' | '단기' }): JSX.Element {
  const [inputValue, setInputValue] = useState<string>('');
  const [spendTime, setSpendTime] = useRecoilState(spendTimeStr);
  const setStep = useSetRecoilState(stepNum);
  const saveValue = (input: any): void => {
    setSpendTime(input);
    setStep(prev => prev + 1);
  };
  return (
    <section>
      <AnswerBox title={`${crewType === '장기' ? '05' : '06'} 예상 시간`} value={spendTime} />
      {spendTime === '' && (
        <QuestionBox>
          <TitleLargeBold>모임예상 시간은 어느 정도 일까요?</TitleLargeBold>
          <StyledInput
            onChange={event => {
              setInputValue(event.target.value);
            }}
            placeholder="예) 1시간, 하루종일, 각자 해산"
          />
          <StyledBtn
            onClick={() => {
              saveValue(inputValue);
            }}
            disabled={inputValue.length === 0}
          >
            <BodyLargeBold>다음</BodyLargeBold>
          </StyledBtn>
        </QuestionBox>
      )}
    </section>
  );
}

export default CrewTime;
