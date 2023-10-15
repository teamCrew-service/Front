import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { useQuery } from 'react-query';
import MyIntro from './MyIntro';
import './style.css';
import heading from '../../../styledComponent/heading';
import colors from '../../../assets/styles/color';
import icons from '../../../assets/icons';
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

const NextBtn = styled.button`
  width: 100%;
  height: 56px;
  border: none;
  border-radius: 8px;
  color: white;
  background-color: ${colors.primary};
  &:disabled {
    background-color: ${colors.primary100};
  }
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
  const [myIntro, setMyIntro] = useRecoilState(myIntroStr);
  const [myAdj, setMyAdj] = useRecoilState(myAdjListArray);
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
        setMyIntro('');
        setMyAdj([]);
        closeModal();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const clearItems = (): void => {
    setMyIntro('');
    setMyAdj([]);
  };

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <ModalContainer>
      <header id="joincrew-header">
        <icons.chevronLeft
          onClick={() => {
            clearItems();
            closeModal();
          }}
        />
        {crewType === '장기' && <heading.BodyLargeBold>정모 가입 인사</heading.BodyLargeBold>}
        {crewType === '단기' && <heading.BodyLargeBold>단기 모임 참여 인사</heading.BodyLargeBold>}
        <div style={{ width: '24px' }} />
      </header>
      <main id="joincrew-main">
        {/* 첫 번째 질문 */}
        <MyIntro crewType={crewType} question={signUpForm?.question1} complete={completeQuestion1} />
        {completeQuestion1 && <MyAdj question={signUpForm?.question2} />}
        {!completeQuestion1 && (
          <NextBtn
            onClick={() => {
              setCompleteQuestion(true);
              setShowBtn2(true);
            }}
            disabled={myIntro.length < 20}
            style={{ position: 'relative' }}
          >
            <heading.BodyBaseBold>다음</heading.BodyBaseBold>
          </NextBtn>
        )}
        {showBtn2 && (
          <NextBtn onClick={sendSignupFormMutation} disabled={myAdj.length < 3} style={{ position: 'relative' }}>
            <heading.BodyBaseBold>작성완료</heading.BodyBaseBold>
          </NextBtn>
        )}
      </main>
    </ModalContainer>
  );
}

export default JoinCrewModal;
