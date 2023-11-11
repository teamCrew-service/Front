import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import colors from '../../assets/styles/color';
import { unsubscribe } from '../../api';
import useDeleteCookie from '../../util/useDeleteCookie';

const TotalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 48px;
  background-color: ${colors.gray200};
  border: 1px solid black;
`;

export default function ReSubscribe(): JSX.Element {
  const cookie = window.location.href.split('token=')[1];
  if (cookie !== undefined) {
    document.cookie = `authorization=${cookie};path=/`;
  }

  const navigate = useNavigate();

  const deleteUnsubscribeFunc = (): void => {
    unsubscribe.deleteUnsubscribe().then(
      res => {
        alert(res.message);
        navigate('/home');
      },
      err => {
        console.log(err);
      },
    );
  };

  const cancelFunc = (): void => {
    useDeleteCookie('authorization', '/');
    navigate('/login');
  };

  return (
    <TotalContainer>
      <BtnContainer onClick={deleteUnsubscribeFunc}>탈퇴 취소</BtnContainer>
      <BtnContainer onClick={cancelFunc}>취소</BtnContainer>
    </TotalContainer>
  );
}
