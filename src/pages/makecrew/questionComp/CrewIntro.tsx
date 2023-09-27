import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import BodyLargeBold from '../../../styledComponent/heading/BodyLargeBold';
import { AnswerBoxStyle, QuestionBox } from '../styled';
import TitleLargeBold from '../../../styledComponent/heading/TitleLargeBold';
import colors from '../../../assets/styles/color';
import BodySmallMedium from '../../../styledComponent/heading/BodySmallMedium';

const TextAreaBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 12px;
  border: 1px solid ${colors.primary};
  border-radius: 4px;
`;

const StyledTextArea = styled.textarea`
  border: none;
  font-family: Pretendard;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.2px;
  resize: none;
  &:focus {
    outline: none;
    border: none;
  }
`;

const CountDiv = styled.div`
  margin-left: auto;
  margin-right: 0px;
  color: ${colors.gray500};
`;

function CrewIntro({ crewType }: { crewType: '장기' | '단기' }): JSX.Element {
  const [inputIntro, setInputIntro] = useState<string>('');
  const [inputAdvantage, setInputAdvantage] = useState<string>('');
  const [inputActivity, setInputActivity] = useState<string>('');
  const [inputRule, setInputRule] = useState<string>('');
  const maxMember = useRef<number>(1);
  return (
    <section>
      <AnswerBoxStyle $isActive={false}>
        <BodyLargeBold>{`${crewType === '장기' ? '09' : '10'} 모임 소개`}</BodyLargeBold>
      </AnswerBoxStyle>
      <QuestionBox>
        <TitleLargeBold>우리 모임 소개글 및 알아야 할 정보를 작성해 주세요</TitleLargeBold>
        <TextAreaBox>
          <StyledTextArea
            onChange={event => {
              setInputIntro(event.target.value);
            }}
            maxLength={400}
            rows={5}
            placeholder="1. 모임의 목표 및 소개"
          />
          <CountDiv>{inputIntro.length}/400</CountDiv>
        </TextAreaBox>

        <TextAreaBox>
          <StyledTextArea
            onChange={event => {
              setInputAdvantage(event.target.value);
            }}
            maxLength={400}
            rows={5}
            placeholder="2. 우리 모임의 장점"
          />
          <CountDiv>{inputAdvantage.length}/400</CountDiv>
        </TextAreaBox>

        <TextAreaBox>
          <StyledTextArea
            onChange={event => {
              setInputActivity(event.target.value);
            }}
            maxLength={400}
            rows={5}
            placeholder="3. 우리 모임에서 하는 활동"
          />
          <CountDiv>{inputActivity.length}/400</CountDiv>
        </TextAreaBox>

        <TextAreaBox>
          <StyledTextArea
            onChange={event => {
              setInputRule(event.target.value);
            }}
            maxLength={400}
            rows={5}
            placeholder="4. 지켜야하는 규칙"
          />
          <CountDiv>{inputRule.length}/400</CountDiv>
        </TextAreaBox>
        <TextAreaBox>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BodySmallMedium style={{ color: `${colors.gray500}` }}>5. 최대 인원</BodySmallMedium>
            <select
              onChange={event => {
                maxMember.current = Number(event.target.value);
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
                <option value={item}>{item}</option>
              ))}
            </select>
          </div>
        </TextAreaBox>
      </QuestionBox>
    </section>
  );
}

export default CrewIntro;
