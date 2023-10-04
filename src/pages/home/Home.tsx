import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import { useQuery } from 'react-query';
import ScheduleCard from '../../styledComponent/ScheduleCard';
import LargeCardDiv from '../../styledComponent/LargeCardDiv';
import InterestMatrix from '../../components/common/InterestMatrix';
import colors from '../../assets/styles/color';
import TitleLargeMedium from '../../styledComponent/heading/TitleLargeBold';
import BodySmallBold from '../../styledComponent/heading/BodySmallMedium';
import widgets from '../../assets/icons/widgets';
import icons from '../../assets/icons';
import BodyLargeBold from '../../styledComponent/heading/BodyLargeBold';
import { schedule } from '../../api';
import useCalDate from '../../util/useCalDate';

const SmallImageDiv = styled.div<{ $URL: string }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-image: url(${props => props.$URL});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border: 1px solid black;
`;

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
  const cookie = window.location.href.split('token=')[1];
  if (cookie !== undefined) {
    document.cookie = `authorization=${cookie};path=/`;
  }
  const { data: comingDate } = useQuery('comingDate', schedule.getComingDate, {
    onSuccess: res => {
      console.log(res);
    },
    onError: error => {
      console.log(error);
    },
    refetchOnWindowFocus: false,
  });

  const navigate = useNavigate();
  const handelInterestClick = (input: string): void => {
    navigate('/searchbycategory', { state: { interest: input } });
  };

  return (
    <>
      <main id="home-main">
        <section id="home-hello">
          <HelloDiv>
            <icons.Character />
            <BodyLargeBold>안녕하세요, {comingDate?.nickname}님</BodyLargeBold>
          </HelloDiv>
        </section>
        <div id="margin-1" />
        <section id="home-upcoming">
          <ScheduleCard>
            <BodySmallBold
              style={{
                color: `${colors.blue}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>다가오는 일정</div>
              <Link to="/upcomingschedule" style={{ textDecoration: 'none' }}>
                {'>'}
              </Link>
            </BodySmallBold>

            <TitleLargeMedium>
              {comingDate?.schedule[0].schedule.scheduleDDay !== undefined &&
                useCalDate(new Date(comingDate.schedule[0].schedule.scheduleDDay))}
            </TitleLargeMedium>
            <BodySmallBold style={{ color: `${colors.gray500}` }}>
              {comingDate?.schedule[0].schedule.scheduleTitle}
            </BodySmallBold>
            <div id="profile-list-box">
              {comingDate?.schedule[0].profileImage.map(item => (
                <SmallImageDiv key={item.member_userId} $URL={item.member_profileImage} />
              ))}
            </div>
          </ScheduleCard>
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
          <TitleLargeMedium>관심사별 모임 찾기</TitleLargeMedium>
        </section>
        <div id="margin-4" />
        <section id="home-category">
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
