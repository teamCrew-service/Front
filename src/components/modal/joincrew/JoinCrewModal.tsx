import React from 'react';
import styled from 'styled-components';
import MyIntro from './MyIntro';
import './style.css';
import heading from '../../../styledComponent/heading';
import icons from '../../../assets/icons';

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: white;
`;

function JoinCrewModal({ crewType, closeModal }: { crewType: string; closeModal: () => void }): JSX.Element {
  return (
    <ModalContainer>
      <header id="joincrew-header">
        <icons.chevronLeft onClick={closeModal} />
        {crewType === '장기' && <heading.BodyLargeBold>정모 가입 인사</heading.BodyLargeBold>}
        {crewType === '단기' && <heading.BodyLargeBold>단기 모임 참여 인사</heading.BodyLargeBold>}
        <div style={{ width: '24px' }} />
      </header>
      <main id="joincrew-main">
        <MyIntro crewType={crewType} />
      </main>
    </ModalContainer>
  );
}

export default JoinCrewModal;
