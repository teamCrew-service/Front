import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { recommendStr, stepNum } from '../../../atoms/makecrew';

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

function CrewRecommendMember({ crewType }: { crewType: '장기' | '단기' }): JSX.Element {
  const [inputValue, setInputValue] = useState<string>('');
  const [recommend, setRecommend] = useRecoilState(recommendStr);
  const setStep = useSetRecoilState(stepNum);
  const saveRecommend = (input: any): void => {
    setRecommend(input);
    setStep(prev => prev + 1);
  };
  return (
    <section>
      <AnswerBox title={`${crewType === '장기' ? '04' : '05'} 선호하는 멤버`} value={recommend} />
      {recommend === '' && (
        <QuestionBox>
          <TitleLargeBold>선호하는 크루 멤버는 어떤 분일까요?</TitleLargeBold>
          <StyledInput
            onChange={event => {
              setInputValue(event.target.value);
            }}
            placeholder="예) 공감을 잘 해주시는 분, 주 1회 참석 가능하신 분"
          />
          <StyledBtn
            onClick={() => {
              saveRecommend(inputValue);
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

export default CrewRecommendMember;
