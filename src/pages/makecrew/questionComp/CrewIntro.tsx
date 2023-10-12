/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
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
  latLngNum,
  locationStr,
  maxMemberNum,
  recommendStr,
  ruleStr,
  spendTimeStr,
  stepNum,
  titleStr,
  typeStr,
} from '../../../atoms/makecrew';
import BodyBaseBold from '../../../styledComponent/heading/BodyBaseBold';
import Detail from '../../detail/Detail';
import { crew } from '../../../api';

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

const CompleteDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  padding-bottom: 32px;
  gap: 16px;
  background-color: ${colors.gray50};
`;

const CompleteTitle = styled(BodyLargeBold)`
  width: 100%;
  color: ${colors.gray400};
`;

const DetailContent = styled.span`
  color: ${colors.gray500};
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.2px;
`;

function CrewIntro({ crewType }: { crewType: '장기' | '단기' }): JSX.Element {
  const navigate = useNavigate();
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
  const crewLatLng = useRecoilValue(latLngNum);

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

  const makeCrew = (): void => {
    const crewTime = crewDate.timeTable === '오전' ? crewDate.time : crewDate.time! + 12;

    const crewDDay = new Date(crewDate.year!, crewDate.month!, crewDate.date!, crewTime!, crewDate.minutes!);
    let crewSignup = false;
    if (crewAttendMethod === '방장 수락 후 참여 가능') {
      crewSignup = true;
    }
    crew
      .makeCrew({
        createCrewDto: {
          category: crewCategory,
          crewAddress,
          crewType,
          crewDDay,
          crewMemberInfo: crewRecommend,
          crewTimeInfo: crewSpendTime,
          crewAgeInfo: crewAge,
          crewSignup,
          crewTitle,
          crewContent: `${crewIntro}\n${crewAdvantage}\n${crewActivity}\n${crewRule}`,
          thumbnail: '',
          crewMaxMember: crewMaxMember!,
          crewLatitude: crewLatLng.lat,
          crewLongtitude: crewLatLng.lng,
        },
        createSignupFormDto: {
          question1: '자기소개 또는 가입 동기',
          question2: '나를 표현하는 형용사 3가지는?',
        },
      })
      .then(res => {
        alert(res.message);
        navigate(`/detail/${res.crewId}`);
      })
      .catch(error => {
        console.log(error);
      });
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
                    <option key={item} value={item}>
                      {item}
                    </option>
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
          <CompleteDiv>
            <CompleteTitle>{`${crewType === '장기' ? '09' : '10'} 모임 소개`}</CompleteTitle>
            <div>
              <BodyBaseBold>1. 모임의 목표 및 소개</BodyBaseBold>
              <DetailContent>{crewIntro}</DetailContent>
            </div>
            <div>
              <BodyBaseBold>2. 우리 모임의 장점</BodyBaseBold>
              <DetailContent>{crewAdvantage}</DetailContent>
            </div>
            <div>
              <BodyBaseBold>3. 우리 모임에서 하는 활동</BodyBaseBold>
              <DetailContent>{crewActivity}</DetailContent>
            </div>
            <div>
              <BodyBaseBold>4. 지켜야 하는 규칙</BodyBaseBold>
              <DetailContent>{crewRule}</DetailContent>
            </div>
            <div>
              <BodyBaseBold>5. 최대 인원</BodyBaseBold>
              <DetailContent>{crewMaxMember}명</DetailContent>
            </div>
          </CompleteDiv>
          <ButtonDiv onClick={makeCrew}>
            <BodyBaseBold>모임 생성</BodyBaseBold>
          </ButtonDiv>
        </>
      )}
    </section>
  );
}

export default CrewIntro;
