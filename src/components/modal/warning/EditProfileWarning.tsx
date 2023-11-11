import React from 'react';
import styled from 'styled-components';

import colors from '../../../assets/styles/color';
import BodyBaseBold from '../../../styledComponent/heading/BodyBaseBold';

const TestModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 104;
  background-color: rgba(0, 0, 0, 0.2);
`;

const TestModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  width: 343px;
  height: 160px;
  padding: 24px 18px;
  border-radius: 12px;
  background-color: white;
`;

const ModalTextContainer = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  flex-direction: column;
  align-items: flex-start;
`;

const ModalBtnContainer = styled.div`
  display: flex;
  gap: 8px;
  width: 50%;
  height: fit-content;
`;

const ModalCancelBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: 100%;
  height: 48px;
  border: 1px solid ${colors.gray400};
`;
const ModalExitBtn = styled(ModalCancelBtn)`
  border: none;
  background-color: ${colors.primary};
  color: white;
`;

export default function EditProfileWarning({
  closeModal,
  exitModal,
}: {
  closeModal: () => void;
  exitModal: () => void;
}): JSX.Element {
  return (
    <TestModalBackground>
      <TestModal>
        <ModalTextContainer>
          <BodyBaseBold>지금 나가면 작성한 내용이 전부 삭제됩니다.</BodyBaseBold>
          <BodyBaseBold>그래도 나가시겠어요?</BodyBaseBold>
        </ModalTextContainer>
        <ModalBtnContainer>
          <ModalCancelBtn onClick={closeModal}>
            <BodyBaseBold>취소</BodyBaseBold>
          </ModalCancelBtn>
          <ModalExitBtn onClick={exitModal}>
            <BodyBaseBold>나가기</BodyBaseBold>
          </ModalExitBtn>
        </ModalBtnContainer>
      </TestModal>
    </TestModalBackground>
  );
}
