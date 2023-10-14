import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';
import MyIntro from './MyIntro';
import './style.css';
import heading from '../../../styledComponent/heading';
import icons from '../../../assets/icons';
import ButtonDiv from '../../../styledComponent/ButtonDiv';
import { myAdjListArray, myIntroStr } from '../../../atoms/joincrew';
import { signUp } from '../../../api';
import MyAdj from './MyAdj';

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: white;
`;

const NonActiveDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 8px;
`;

function JoinCrewModal({
  crewType,
  closeModal,
  signupFormId,
  crewId,
}: {
  crewType: string;
  closeModal: () => void;
  signupFormId: string;
  crewId: string;
}): JSX.Element {
  const myIntro = useRecoilValue(myIntroStr);
  const myAdj = useRecoilValue(myAdjListArray);
  const [completeQuestion1, setCompleteQuestion] = useState<boolean>(false);
  const [showBtn2, setShowBtn2] = useState<boolean>(false);

  const { data: signUpForm, isLoading } = useQuery(
    'getSignUpForm',
    async () => {
      const result = signUp.getSignUpForm(`${signupFormId}`);
      return result;
    },
    {
      onSuccess: res => {
        console.log('signUpForm', res);
      },
      refetchOnWindowFocus: false,
    },
  );

  const sendSignupFormMutation = (): void => {
    let adjString = '';
    for (let i = 0; i < myAdj.length; i += 1) {
      if (i === myAdj.length - 1) {
        adjString += myAdj[i];
      } else {
        adjString += `${myAdj[i]},`;
      }
    }
    console.log(adjString);
    signUp
      .postSignUpForm(signupFormId, crewId, { answer1: myIntro, answer2: adjString })
      .then(res => {
        console.log(res);
        closeModal();
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <ModalContainer>
      <header id="joincrew-header">
        <icons.chevronLeft onClick={closeModal} />
        {crewType === '장기' && <heading.BodyLargeBold>정모 가입 인사</heading.BodyLargeBold>}
        {crewType === '단기' && <heading.BodyLargeBold>단기 모임 참여 인사</heading.BodyLargeBold>}
        <div style={{ width: '24px' }} />
      </header>
      <main id="joincrew-main">
        {/* 첫 번째 질문 */}
        <MyIntro crewType={crewType} question={signUpForm?.question1} complete={completeQuestion1} />
        {completeQuestion1 && <MyAdj question={signUpForm?.question2} />}
        {!completeQuestion1 && (
          <ButtonDiv
            onClick={() => {
              setCompleteQuestion(true);
              setShowBtn2(true);
            }}
            style={{ position: 'relative' }}
          >
            {myIntro.length < 20 && <NonActiveDiv />}
            <heading.BodyBaseBold>다음</heading.BodyBaseBold>
          </ButtonDiv>
        )}
        {showBtn2 && (
          <ButtonDiv onClick={sendSignupFormMutation} style={{ position: 'relative' }}>
            {myAdj.length < 3 && <NonActiveDiv />}
            <heading.BodyBaseBold>작성완료</heading.BodyBaseBold>
          </ButtonDiv>
        )}
      </main>
    </ModalContainer>
  );
}

export default JoinCrewModal;
