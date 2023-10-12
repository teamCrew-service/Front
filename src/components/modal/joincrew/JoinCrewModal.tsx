import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';
import MyIntro from './MyIntro';
import './style.css';
import heading from '../../../styledComponent/heading';
import icons from '../../../assets/icons';
import ButtonDiv from '../../../styledComponent/ButtonDiv';
import { myIntroStr } from '../../../atoms/joincrew';
import { signUp } from '../../../api';

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

function JoinCrewModal({ crewType, closeModal }: { crewType: string; closeModal: () => void }): JSX.Element {
  const myIntro = useRecoilValue(myIntroStr);
  const [completQuestion1, setCompletQuestion] = useState<boolean>(false);
  const [showBtn2, setShowBtn2] = useState<boolean>(false);

  const { data: signUpForm, isLoading } = useQuery(
    'getSignUpForm',
    async () => {
      const result = signUp.getSignUpForm('2');
      return result;
    },
    {
      onSuccess: res => {
        console.log('signUpForm', res);
      },
      refetchOnWindowFocus: false,
    },
  );

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
        <MyIntro crewType={crewType} question={signUpForm?.question1} complete={completQuestion1} />
        {!completQuestion1 && (
          <ButtonDiv
            onClick={() => {
              setCompletQuestion(true);
              setShowBtn2(true);
            }}
            style={{ position: 'relative' }}
          >
            {myIntro.length < 20 && <NonActiveDiv />}
            <heading.BodyBaseBold>다음</heading.BodyBaseBold>
          </ButtonDiv>
        )}
        {showBtn2 && (
          <ButtonDiv onClick={() => {}} style={{ position: 'relative' }}>
            <NonActiveDiv />
            <heading.BodyBaseBold>다음</heading.BodyBaseBold>
          </ButtonDiv>
        )}
      </main>
    </ModalContainer>
  );
}

export default JoinCrewModal;
