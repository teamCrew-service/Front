import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from 'react-query';

import icons from '../../../assets/icons';
import heading from '../../../styledComponent/heading';
import colors from '../../../assets/styles/color';

import './style.css';
import type { MemberDetail, VoteResultInfo } from '../../../assets/interfaces';
import { ModalContainer, ImageDiv, HostDiv } from '../common/styled';

import { vote, voteform } from '../../../api';
import OptionItem from './OptionItem';

const VoteContentContainer = styled.div`
  width: 100%;
  background-color: ${colors.primary50};
  padding: 12px;
  border-radius: 8px;
`;

const VoteBtn = styled.button`
  width: 100%;
  height: 100%;
  color: white;
  background-color: ${colors.primary};
  border: none;
  border-radius: 8px;
  &:disabled {
    opacity: 0.4;
  }
`;

const GoResultBtn = styled.div`
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  color: ${colors.gray500};
`;

function VoteDetailModal({
  crewInfo,
  voteFormId,
  closeModal,
  openResultModal,
}: {
  crewInfo: MemberDetail;
  voteFormId: string;
  closeModal: () => void;
  openResultModal: (input: VoteResultInfo) => void;
}): JSX.Element {
  const [selectedOption, setSelectedOption] = useState<string[]>([]);

  const { data: voteDetail, isLoading } = useQuery(
    'getVoteFormDetail',
    async () => {
      const result = voteform.getVoteFormDetail(crewInfo.crew.crew_crewId, voteFormId);
      return result;
    },
    {
      onSuccess: res => {
        console.log('voteFormDetail = ', res);
      },
      onError: err => {
        console.log(err);
      },
      refetchOnWindowFocus: false,
    },
  );

  const voteChoiceMutation = useMutation(
    async () => {
      let choices = selectedOption[0];
      if (selectedOption.length > 1) {
        choices = selectedOption.reduce((acc, curr) => `${acc},${curr}`);
      }
      const sendChoices = { vote: choices };
      const result = vote.vote(crewInfo.crew.crew_crewId, voteFormId, sendChoices);
      return result;
    },
    {
      onSuccess: res => {
        console.log(res);
        openResultModal({
          isOpen: true,
          crewId: crewInfo.crew.crew_crewId,
          voteFormId,
        });
        closeModal();
      },
    },
  );

  const saveSelectedOptionFunc = (input: string): void => {
    if (selectedOption.length === 0 || Number(voteDetail?.multipleVotes) === 0) {
      setSelectedOption([input]);
    }
    if (Number(voteDetail?.multipleVotes) === 1 && selectedOption.length > 0) {
      setSelectedOption((prev: string[]) => [...prev, input]);
    }
  };

  const unCheckSelectedOptionFunc = (input: string): void => {
    setSelectedOption((prev: string[]) => {
      const changedArray = prev.filter(item => item !== input);
      return changedArray;
    });
  };

  if (isLoading) {
    return <div>loading...</div>;
  }

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
        <section id="vote-detail-main-title">
          <heading.TitleLargeBold>{voteDetail?.voteFormTitle}</heading.TitleLargeBold>
        </section>
        <div className="margin-8-758" />
        <section id="vote-detail-main-content">
          <VoteContentContainer>
            <heading.BodyBaseMedium>{voteDetail?.voteFormContent}</heading.BodyBaseMedium>
          </VoteContentContainer>
        </section>
        <div className="margin-32-758" />
        <section id="vote-detail-main-select">
          {[
            voteDetail?.voteFormOption1,
            voteDetail?.voteFormOption2,
            voteDetail!.voteFormOption3,
            voteDetail!.voteFormOption4,
            voteDetail!.voteFormOption5,
          ].map(item => {
            if (item !== null) {
              if (selectedOption.includes(item!)) {
                return (
                  <OptionItem
                    key={item}
                    item={item!}
                    unSelectOption={unCheckSelectedOptionFunc}
                    selectOption={saveSelectedOptionFunc}
                    selected
                  />
                );
              }
              return <OptionItem key={item} item={item!} selectOption={saveSelectedOptionFunc} />;
            }
            return null;
          })}
        </section>
        <div className="margin-72-758" />
        <section id="vote-detail-main-btn">
          <VoteBtn
            disabled={selectedOption.length === 0}
            onClick={() => {
              voteChoiceMutation.mutate();
            }}
          >
            <heading.BodyBaseBold>투표하기</heading.BodyBaseBold>
          </VoteBtn>
        </section>
        <div className="margin-8-758" />
        <section id="vote-detail-main-go-btn">
          <GoResultBtn
            onClick={() => {
              openResultModal({ isOpen: true, crewId: crewInfo.crew.crew_crewId, voteFormId });
            }}
          >
            <heading.BodyBaseBold>투표한 멤버 확인하기</heading.BodyBaseBold>
            <icons.chevronRight />
          </GoResultBtn>
        </section>
      </main>
    </ModalContainer>
  );
}

export default VoteDetailModal;
