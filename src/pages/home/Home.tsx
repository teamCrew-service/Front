import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import ScheduleCard from '../../styledComponent/ScheduleCard';
import LargeCardDiv from '../../styledComponent/LargeCardDiv';
import InterestMatrix from '../../components/common/InterestMatrix';
import colors from '../../assets/styles/color';
import TitleLargeMedium from '../../styledComponent/heading/TitleLargeBold';
import BodySmallBold from '../../styledComponent/heading/BodySmallMedium';
import widgets from '../../assets/icons/widgets';
import icons from '../../assets/icons';
import BodyLargeBold from '../../styledComponent/heading/BodyLargeBold';

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
  const UrlList: Array<{ number: number; url: string }> = [
    { number: 1, url: '' },
    { number: 2, url: '' },
    { number: 3, url: '' },
    { number: 4, url: '' },
    { number: 5, url: '' },
  ];
  useEffect(() => {
    const cookie = window.location.href.split('token=')[1];
    if (cookie !== undefined) {
      document.cookie = `authorization=${cookie};path=/`;
    }
  }, []);

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
            <BodyLargeBold>안녕하세요</BodyLargeBold>
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

            <TitleLargeMedium>8월 16일 (수) 오후 8시 30분</TitleLargeMedium>
            <BodySmallBold style={{ color: `${colors.gray500}` }}>퇴근 후 40분 걷기</BodySmallBold>
            <div id="profile-list-box">
              {UrlList.map(item => (
                <SmallImageDiv key={item.number} $URL={item.url} />
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
          />
          <LargeCardDiv
            onClick={() => {
              navigate('/makecrew');
            }}
            $image={widgets.MakeCrew}
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
