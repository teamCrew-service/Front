import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';

import './style.css';

import heading from '../../../styledComponent/heading';
import icons from '../../../assets/icons';
import type { MemberDetail } from '../../../assets/interfaces';
import { noitce } from '../../../api';

import { ImageDiv, HostDiv } from '../common/styled';

import useCalDate from '../../../util/useCalDate';

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 2;
`;

const AddressDiv = styled.div`
  display: flex;
  width: fit-content;
  height: fit-content;
  gap: 4px;
`;

function NoticeDetailModal({
  crewInfo,
  noticeId,
  closeModal,
}: {
  crewInfo: MemberDetail;
  noticeId: string;
  closeModal: () => void;
}): JSX.Element {
  const { data: noticeDetail } = useQuery(
    'getNoticeDetail',
    async () => {
      const result = noitce.getNoticeDetail(crewInfo.crew.crew_crewId, noticeId);
      return result;
    },
    {
      onSuccess: res => {
        console.log('noticeDetail = ', res);
      },
      onError: err => {
        console.log(err);
      },
      refetchOnWindowFocus: false,
    },
  );
  return (
    <ModalContainer>
      <header id="notice-detail-header">
        <icons.close onClick={closeModal} />
        <heading.BodyLargeBold>정모 공지</heading.BodyLargeBold>
        {crewInfo.personType === 'captain' ? <icons.ThreeDots fill="black" /> : <div style={{ width: '24px' }} />}
      </header>
      <main id="notice-detail-main">
        <section id="notice-detail-main-host">
          <ImageDiv url={crewInfo.crew.captainProfileImage} />
          <heading.BodyBaseBold style={{ marginLeft: '8px' }}>{crewInfo.crew.captainNickname}</heading.BodyBaseBold>
          <HostDiv>
            <heading.CaptionXS>호스트</heading.CaptionXS>
          </HostDiv>
        </section>
        <div id="notice-detail-margin-1" />
        <section id="notice-detail-main-title">
          <heading.TitleLargeBold>{noticeDetail?.noticeTitle}</heading.TitleLargeBold>
        </section>
        <div id="notice-detail-margin-2" />
        <section id="notice-detail-main-content">
          <heading.BodyBaseMedium>{noticeDetail?.noticeContent}</heading.BodyBaseMedium>
        </section>
        <div id="notice-detail-margin-3" />
        <section id="notice-detail-main-date">
          <icons.CalendarBlank />
          <heading.BodyLargeBold>
            {noticeDetail !== undefined && useCalDate(new Date(noticeDetail.noticeDDay))}
          </heading.BodyLargeBold>
        </section>
        <div id="notice-detail-margin-4" />
        <section id="notice-detail-main-address">
          <AddressDiv>
            <icons.Mappin />
            <div>
              <heading.BodyLargeBold>{noticeDetail?.noticePlaceName}</heading.BodyLargeBold>
              <heading.CaptionXS>{noticeDetail?.noticeAddress}</heading.CaptionXS>
            </div>
          </AddressDiv>
        </section>
      </main>
    </ModalContainer>
  );
}

export default NoticeDetailModal;
