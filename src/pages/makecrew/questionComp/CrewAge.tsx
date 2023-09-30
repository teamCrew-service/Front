import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { ageStr, stepNum } from '../../../atoms/makecrew';

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

function CrewAge({ crewType }: { crewType: '장기' | '단기' }): JSX.Element {
  const [inputValue, setInputValue] = useState<string>('');
  const [crewAge, setCrewAge] = useRecoilState(ageStr);
  const setStep = useSetRecoilState(stepNum);
  const saveValue = (input: any): void => {
    setCrewAge(input);
    setStep(prev => prev + 1);
  };
  return (
    <section>
      <AnswerBox title={`${crewType === '장기' ? '06' : '07'} 연령대`} value={crewAge} />
      {crewAge === '' && (
        <QuestionBox>
          <TitleLargeBold>선호하는 멤버들의 연령대가 있을까요?</TitleLargeBold>
          <StyledInput
            onChange={event => {
              setInputValue(event.target.value);
            }}
            placeholder="예) 20대 초반, 30-40대, 20대 후반 ~ 30대 중반"
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

export default CrewAge;
