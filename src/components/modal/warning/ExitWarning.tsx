import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import icons from '../../../assets/icons';
import heading from '../../../styledComponent/heading';
import colors from '../../../assets/styles/color';
import { login, unsubscribe } from '../../../api';

const TotalContainer = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  z-index: 104;
  background-color: rgba(0, 0, 0, 0.25);
`;
const ContextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 343px;
  height: fit-content;
  background-color: white;
  padding: 24px;
  border-radius: 12px;
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BtnContainer = styled.div`
  display: flex;
  width: 60%;
  gap: 8px;
  margin-left: auto;
`;

const CancelBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  border: 1px solid ${colors.gray400};
  border-radius: 10px;
`;

const ExecuteBtn = styled(CancelBtn)`
  border: none;
  color: ${colors.errorRed};
  background-color: ${colors.gray200};
`;

export default function ExitWarning({
  question,
  executeText,
  closeModal,
}: {
  question: string[];
  executeText: string;
  closeModal: () => void;
}): JSX.Element {
  const navigate = useNavigate();

  const logout = (): void => {
    login.logout().then(
      res => {
        alert(res.message);
        closeModal();
        navigate('/login');
      },
      error => {
        console.log(error);
      },
    );
  };

  const unsubscribeFunc = (): void => {
    unsubscribe.unsubscribe().then(
      res => {
        alert(res.message);
        closeModal();
        navigate('/login');
      },
      error => {
        console.log(error);
      },
    );
  };

  return (
    <TotalContainer>
      <ContextContainer>
        <icons.Warning />
        <TextContainer>
          {question.map(item => (
            <heading.BodyBaseBold key={item}>{item}</heading.BodyBaseBold>
          ))}
        </TextContainer>
        <BtnContainer>
          <ExecuteBtn onClick={executeText === '로그아웃' ? logout : unsubscribeFunc}>
            <heading.BodyBaseBold>{executeText}</heading.BodyBaseBold>
          </ExecuteBtn>
          <CancelBtn onClick={closeModal}>
            <heading.BodyBaseBold>취소</heading.BodyBaseBold>
          </CancelBtn>
        </BtnContainer>
      </ContextContainer>
    </TotalContainer>
  );
}
