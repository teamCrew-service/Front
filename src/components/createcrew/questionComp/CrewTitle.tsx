import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { stepNum, titleStr } from '../../../atoms/createcrew';

import AnswerBox from './common/AnswerBox';
import { QuestionBox } from '../../../pages/createcrew/styled';
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

function CrewTitle({ crewType }: { crewType: '장기' | '단기' }): JSX.Element {
  const [inputValue, setInputValue] = useState<string>('');
  const [crewTitle, setCrewTitle] = useRecoilState(titleStr);
  const setStep = useSetRecoilState(stepNum);
  const saveValue = (input: any): void => {
    setCrewTitle(input);
    setStep(prev => prev + 1);
  };
  return (
    <section>
      <AnswerBox title={`${crewType === '장기' ? '08' : '09'} 모임 이름`} value={crewTitle} />
      {crewTitle === '' && (
        <QuestionBox>
          <TitleLargeBold>우리 모임의 이름을 정해주세요</TitleLargeBold>
          <StyledInput
            onChange={event => {
              setInputValue(event.target.value);
            }}
            placeholder="예) 함께 성장해요!, 퇴근 후 운동모, 책사모"
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

export default CrewTitle;
