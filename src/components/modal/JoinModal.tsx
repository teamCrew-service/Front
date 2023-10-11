import React from 'react';
import styled from 'styled-components';

import heading from '../../styledComponent/heading';
import colors from '../../assets/styles/color';

const AbsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 2;
`;

const AbsDiv = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 32px);
  height: 164px;
  padding: 16px;
  padding-top: 24px;
  background-color: white;
  border-radius: 12px;
`;

const BtnDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 44px;
  border-radius: 10px;
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const BtnContainer = styled.div`
  display: flex;
  gap: 8px;
`;

function JoinModal({
  crewType,
  closeModal,
  openJoinCrewModal,
}: {
  crewType: string;
  closeModal: () => void;
  openJoinCrewModal: () => void;
}): JSX.Element {
  const joinCrew = (): void => {
    closeModal();
    openJoinCrewModal();
  };
  return (
    <AbsContainer>
      <AbsDiv>
        <QuestionContainer>
          {crewType === '장기' && <heading.BodyBaseBold>정모에 가입하시겠어요?</heading.BodyBaseBold>}
          {crewType === '단기' && <heading.BodyBaseBold>단기 모임에 참여하시겠어요?</heading.BodyBaseBold>}
          <heading.BodySmallMedium>호스트가 신청을 수락하면 가입됩니다.</heading.BodySmallMedium>
        </QuestionContainer>
        <BtnContainer>
          <BtnDiv onClick={closeModal} style={{ backgroundColor: `${colors.gray100}` }}>
            <heading.BodyBaseBold style={{ color: `${colors.gray400}}` }}>취소</heading.BodyBaseBold>
          </BtnDiv>
          <BtnDiv onClick={joinCrew} style={{ backgroundColor: `${colors.primary}` }}>
            <heading.BodyBaseBold style={{ color: 'white' }}>가입하기</heading.BodyBaseBold>
          </BtnDiv>
        </BtnContainer>
      </AbsDiv>
    </AbsContainer>
  );
}

export default JoinModal;
