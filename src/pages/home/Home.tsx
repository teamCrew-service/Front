import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';

import colors from '../../assets/styles/color';
import widgets from '../../assets/icons/widgets';
import icons from '../../assets/icons';

import heading from '../../styledComponent/heading';
import LargeCardDiv from '../../styledComponent/LargeCardDiv';

import InterestMatrix from '../../components/common/InterestMatrix';
import ScheduleCard from '../../components/home/ScheduleCard';
import NoScheduleCard from '../../components/home/NoScheduleCard';

import './style.css';

import { schedule } from '../../api';

const HelloDiv = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  height: 100%;
  gap: 8px;
  padding: 4px 16px;
  background-color: ${colors.primary50};
  border-radius: 20px 20px 20px 0px;
`;

function Home(): JSX.Element {
  // redirect시 쿠키 가져오는 로직
  const cookie = window.location.href.split('token=')[1];
  if (cookie !== undefined) {
    document.cookie = `authorization=${cookie};path=/`;
  }

  // 서버 데이터 캐싱
  const { data: comingDate, isLoading } = useQuery('comingDate', schedule.getComingDate, {
    onSuccess: res => {
      console.log(res);
    },
    onError: error => {
      console.log(error);
    },
    refetchOnWindowFocus: false,
  });

  // 카테고리별 일정 가져오는 함수
  const navigate = useNavigate();
  const handelInterestClick = (input: string): void => {
    navigate('/searchbycategory', { state: { interest: input } });
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <>
      <main id="home-main">
        <section id="home-hello">
          <HelloDiv>
            <icons.Character />
            <heading.BodyLargeBold>안녕하세요, {comingDate?.nickname} 님!</heading.BodyLargeBold>
          </HelloDiv>
        </section>

        <div id="margin-1" />

        <section id="home-upcoming">
          {comingDate?.schedule.length === 0 ? (
            <NoScheduleCard />
          ) : (
            <ScheduleCard scheduleList={comingDate?.schedule} index={0} />
          )}
        </section>

        <div id="margin-2" />

        <section id="home-large-card-container">
          <LargeCardDiv
            onClick={() => {
              navigate('/findcrew');
            }}
            $image={widgets.FindCrew}
            $backColor={colors.primary}
          />
          <LargeCardDiv
            onClick={() => {
              navigate('/makecrew');
            }}
            $image={widgets.MakeCrew}
            $backColor={colors.primary50}
          />
        </section>

        <div id="margin-3" />

        <section id="home-category-title">
          <heading.TitleLargeBold>관심사별 모임 찾기</heading.TitleLargeBold>
        </section>

        <div id="margin-4" />

        <section id="home-category-gridbox">
          <InterestMatrix onClick={handelInterestClick} columns={4} rows={3} />
        </section>
      </main>

      <footer id="home-footer">
        <div />
      </footer>
    </>
  );
}

export default Home;
