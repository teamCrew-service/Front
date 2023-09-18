/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { crewDetail } from '../../api';
import icons from '../../assets/icons';
import colors from '../../assets/styles/color';
import BodyLargeBold from '../../styledComponent/heading/BodyLargeBold';
import TitleLargeBold from '../../styledComponent/heading/TitleLargeBold';

import './style.css';
import BodySmallBold from '../../styledComponent/heading/BodySmallBold';
import NoticeContent from './NoticeContent';

const DetailMenuLi = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 19.2%;
  height: 100%;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.08px;
  color: ${colors.gray400};
`;

const CrewInfoContext = styled.h3`
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.2px;
`;

const SubTitle = styled(BodyLargeBold)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ScheduleCard = styled.div`
  width: 100%;
  height: 87.23%;
  border-radius: 12px;
  background-color: ${colors.primary100};
`;

function Detail(): JSX.Element {
  const [page, setPage] = useState<string>('모임정보');
  const [infoOpen, setInfoOpen] = useState<boolean>(false);
  const { id } = useParams();

  const { status, data } = useQuery(
    'crewDetail',
    async () => {
      const result = await crewDetail.getDetail(id!);
      return result.data;
    },
    {
      onSuccess: res => {
        console.log(res);
      },
      refetchOnWindowFocus: false,
    },
  );

  const changePage = (event: any): void => {
    setPage(event.target.innerText);
  };

  const openInfoWindow = (): void => {
    setInfoOpen(true);
  };

  const closeInfoWindow = (): void => {
    setInfoOpen(false);
  };

  if (status === 'loading') {
    return <div>loading...</div>;
  }

  if (status === 'error') {
    return <div>somthing wrong!</div>;
  }

  return (
    <>
      <header id="detail-header">
        <Link to="/findcrew">
          <icons.chevronLeft />
        </Link>
        <BodyLargeBold>{data?.crew.crewType}</BodyLargeBold>
        <div style={{ width: '24px', height: '24px' }} />
      </header>
      <main id="detail-main">
        <section id="detail-main-thumbnail" />
        <nav id="detail-main-menu">
          <ul id="detail-main-menu-ul">
            {['모임정보', '공지', '일정', '크루챗'].map(item => {
              if (page === item) {
                return (
                  <DetailMenuLi
                    key={item}
                    style={{ color: '#8569F4', borderBottom: '2px solid #8569F4', fontWeight: 600 }}
                  >
                    <span style={{ translate: '0px 1px' }}>{item}</span>
                  </DetailMenuLi>
                );
              }
              return (
                <DetailMenuLi key={item} onClick={changePage}>
                  {item}
                </DetailMenuLi>
              );
            })}
          </ul>
        </nav>
        <section id="detail-main-content">
          {page === '모임정보' && (
            <>
              <div id="detail-main-content-crewinfo">
                <TitleLargeBold>{data?.crew.crewTitle}</TitleLargeBold>
                <CrewInfoContext>
                  <icons.users />
                  {data?.crew.crewSignup}/{data?.crew.crewMaxMember}
                </CrewInfoContext>
                <CrewInfoContext>
                  <icons.CrewDuration />
                  모임이 생긴지 <span style={{ fontWeight: 700 }}>{720}</span>일
                </CrewInfoContext>
                <CrewInfoContext>
                  <icons.MeetCount />
                  지난달 정모 횟수 <span style={{ fontWeight: 700 }}>{4}</span>번
                </CrewInfoContext>
              </div>
              <div id="detail-main-content-intro">
                <SubTitle>
                  소개
                  {infoOpen ? (
                    <icons.chevronUp style={{ cursor: 'pointer' }} onClick={closeInfoWindow} />
                  ) : (
                    <icons.chevronDown style={{ cursor: 'pointer' }} onClick={openInfoWindow} />
                  )}
                </SubTitle>
              </div>
              {infoOpen && (
                <div id="detail-main-content-schedule">
                  <SubTitle>
                    일정
                    <BodySmallBold style={{ cursor: 'pointer' }}>전체보기</BodySmallBold>
                  </SubTitle>
                  <ScheduleCard />
                </div>
              )}
            </>
          )}
          {page === '공지' && <NoticeContent />}
          {page === '일정' && (
            <div>
              <TitleLargeBold>{data?.crew.crewId}</TitleLargeBold>
            </div>
          )}
          {page === '크루챗' && (
            <div>
              <TitleLargeBold>3</TitleLargeBold>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default Detail;
