import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';

import heading from '../../../styledComponent/heading';
import icons from '../../../assets/icons';

import './style.css';
import { ModalContainer } from '../common/styled';

import { vote } from '../../../api';

const UserBox = styled.div``;

function VoteResultModal({
  crewId,
  voteFormId,
  closeModal,
}: {
  crewId: string;
  voteFormId: string;
  closeModal: () => void;
}): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: voteResult } = useQuery(
    'getVoteResult',
    async () => {
      const result = vote.getVoteResult(crewId, voteFormId);
      return result;
    },
    {
      onSuccess: res => {
        console.log('투표 결과 = ', res);
      },
    },
  );

  return (
    <ModalContainer style={{ backgroundColor: 'white' }}>
      <header id="vote-result-header">
        <icons.chevronLeft onClick={closeModal} />
        <heading.BodyLargeBold>투표한 멤버</heading.BodyLargeBold>
        <icons.ThreeDots fill="black" />
      </header>
      <main id="vote-result-main">
        <UserBox>{crewId}</UserBox>
        <UserBox>{voteFormId}</UserBox>
      </main>
    </ModalContainer>
  );
}

export default VoteResultModal;
