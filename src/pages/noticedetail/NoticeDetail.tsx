import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import './style.css';

import heading from '../../styledComponent/heading';
import icons from '../../assets/icons';
import colors from '../../assets/styles/color';
import type { MemberDetail } from '../../assets/interfaces';
import { noitce } from '../../api';

import useCalDate from '../../util/useCalDate';

const ImageDiv = styled.div<{ url: string }>`
  height: 80%;
  aspect-ratio: 1;
  background-image: url(${props => props.url});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: 50%;
`;

const HostDiv = styled.div`
  background-color: ${colors.primary50};
  color: ${colors.primary};
  padding: 4px;
  border-radius: 4px;
  margin-left: 4px;
`;

const AddressDiv = styled.div`
  display: flex;
  width: fit-content;
  height: fit-content;
  gap: 4px;
`;

function NoticeDetail(): JSX.Element {
  const navigate = useNavigate();
  const noticeId = useParams().id;
  const { crewInfo }: { crewInfo: MemberDetail } = useLocation().state;
  const goToCrewDetail = (): void => {
    navigate(`/detail/${crewInfo.crew.crew_crewId}`);
  };
  const { data: noticeDetail } = useQuery(
    'getNoticeDetail',
    async () => {
      const result = noitce.getNoticeDetail(crewInfo.crew.crew_crewId, noticeId!);
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
    <>
      <header id="notice-detail-header">
        <icons.close onClick={goToCrewDetail} />
        <heading.BodyLargeBold>정모 공지</heading.BodyLargeBold>
        <icons.ThreeDots fill="black" />
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
            <heading.BodyLargeBold>{noticeDetail?.noticeAddress}</heading.BodyLargeBold>
          </AddressDiv>
        </section>
      </main>
    </>
  );
}

export default NoticeDetail;
