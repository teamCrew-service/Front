import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';

import colors from '../../assets/styles/color';
import widgets from '../../assets/icons/widgets';
import icons from '../../assets/icons';

import heading from '../../styledComponent/heading';
import LargeCardDiv from '../../styledComponent/LargeCardDiv';

import NoScheduleCard from '../../components/home/NoScheduleCard';
import ScheduleCardSummary from '../../components/common/ScheduleCardSummary';
import InterestMatrix from '../../components/common/InterestMatrix';

import './style.css';

import { schedule } from '../../api';

import Footer from '../../components/home/Footer';

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

  const navigate = useNavigate();

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

  const handelInterestClick = (input: string): void => {
    navigate('/searchbycategory', { state: { interest: input } });
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <>
      <main id="home-home-page">
        <section id="home-hello">
          <HelloDiv>
            <icons.Character />
            <heading.BodyLargeBold>안녕하세요, {comingDate?.nickname} 님!</heading.BodyLargeBold>
          </HelloDiv>
        </section>

        <div id="margin-1" />

        <section id="home-upcoming">
          {comingDate?.schedule === undefined && <NoScheduleCard />}
          {comingDate?.schedule !== undefined && <ScheduleCardSummary scheduleOne={comingDate?.schedule} />}
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
      <footer className="home-footer">
        <Footer page="home" />
      </footer>
    </>
  );
}

export default Home;
