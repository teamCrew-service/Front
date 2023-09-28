/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import BodyLargeBold from '../../../styledComponent/heading/BodyLargeBold';
import { AnswerBoxStyle, QuestionBox } from '../styled';
import TitleLargeBold from '../../../styledComponent/heading/TitleLargeBold';
import colors from '../../../assets/styles/color';
import BodySmallMedium from '../../../styledComponent/heading/BodySmallMedium';
import ButtonDiv from '../../../styledComponent/ButtonDiv';
import {
  activityStr,
  advantageStr,
  ageStr,
  attendMethodBool,
  categoryStr,
  dateDate,
  introStr,
  locationStr,
  maxMemberNum,
  recommendStr,
  ruleStr,
  spendTimeStr,
  stepNum,
  titleStr,
  typeStr,
} from '../../../atoms/makecrew';

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
  // 현재 입력 값 가져오기 위한 로컬 상태
  const [inputIntro, setInputIntro] = useState<string>('');
  const [inputAdvantage, setInputAdvantage] = useState<string>('');
  const [inputActivity, setInputActivity] = useState<string>('');
  const [inputRule, setInputRule] = useState<string>('');
  const maxMember = useRef<number>(1);

  // mutate시 사용할 recoil atom 데이터
  // const crewType = useRecoilValue(typeStr);
  const crewCategory = useRecoilValue(categoryStr);
  const crewAddress = useRecoilValue(locationStr);
  const crewDate = useRecoilValue(dateDate);
  const crewRecommend = useRecoilValue(recommendStr);
  const crewSpendTime = useRecoilValue(spendTimeStr);
  const crewAge = useRecoilValue(ageStr);
  const crewAttendMethod = useRecoilValue(attendMethodBool);
  const crewTitle = useRecoilValue(titleStr);

  // 이번 step에서 입력할 recoil atom
  const [crewIntro, setCrewIntro] = useRecoilState(introStr);
  const [crewAdvantage, setCrewAdvantage] = useRecoilState(advantageStr);
  const [crewActivity, setCrewActivity] = useRecoilState(activityStr);
  const [crewRule, setCrewRule] = useRecoilState(ruleStr);
  const [crewMaxMember, setCrewMaxMember] = useRecoilState(maxMemberNum);

  // 다음 스텝으로 넘어가기 위한 recoil atom
  const setStep = useSetRecoilState(stepNum);

  const saveValues = (): void => {
    setCrewIntro(inputIntro);
    setCrewAdvantage(inputAdvantage);
    setCrewActivity(inputActivity);
    setCrewRule(inputRule);
    setCrewMaxMember(maxMember.current);
    setStep(prev => prev + 1);
  };

  return (
    <section>
      {crewIntro === '' && crewAdvantage === '' && crewActivity === '' && crewRule === '' && crewMaxMember === null ? (
        <>
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
            <ButtonDiv onClick={saveValues}>
              <BodyLargeBold>다음</BodyLargeBold>
            </ButtonDiv>
          </QuestionBox>
        </>
      ) : (
        <>
          <div>{crewIntro}</div>
          <div>{crewAdvantage}</div>
          <div>{crewActivity}</div>
          <div>{crewRule}</div>
          <div>{crewMaxMember}</div>
        </>
      )}
    </section>
  );
}

export default CrewIntro;
