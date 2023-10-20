import React from 'react';
import { useQuery } from 'react-query';

import icons from '../../../assets/icons';
import heading from '../../../styledComponent/heading';

import './style.css';
import type { MemberDetail } from '../../../assets/interfaces';
import { ModalContainer, ImageDiv, HostDiv } from '../common/styled';

import { voteform } from '../../../api';

function VoteDetailModal({
  crewInfo,
  voteId,
  closeModal,
}: {
  crewInfo: MemberDetail;
  voteId: string;
  closeModal: () => void;
}): JSX.Element {
  const { data: voteDetail } = useQuery(
    'getVoteDetail',
    async () => {
      const result = voteform.getVoteDetail(crewInfo.crew.crew_crewId, voteId);
      return result;
    },
    {
      onSuccess: res => {
        console.log('voteDetail = ', res);
      },
      onError: err => {
        console.log(err);
      },
      refetchOnWindowFocus: false,
    },
  );

  return (
    <ModalContainer style={{ backgroundColor: 'white' }}>
      <header id="vote-detail-header">
        <icons.close onClick={closeModal} />
        <heading.BodyLargeBold>되는 시간 투표</heading.BodyLargeBold>
        {crewInfo.personType === 'captain' ? <icons.ThreeDots fill="black" /> : <div style={{ width: '24px' }} />}
      </header>
      <main id="vote-detail-main">
        <section id="vote-detail-main-host">
          <ImageDiv url={crewInfo.crew.captainProfileImage} />
          <heading.BodyBaseBold style={{ marginLeft: '8px' }}>{crewInfo.crew.captainNickname}</heading.BodyBaseBold>
          <HostDiv>
            <heading.CaptionXS>호스트</heading.CaptionXS>
          </HostDiv>
        </section>
        <div className="margin-14-758" />
        <div>{voteId}</div>
        <section id="notice-detail-main-title">
          <heading.TitleLargeBold>{voteDetail?.voteFormTitle}</heading.TitleLargeBold>
        </section>
      </main>
    </ModalContainer>
  );
}

export default VoteDetailModal;
