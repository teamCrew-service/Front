import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import ScheduleCard from '../../styledComponent/ScheduleCard';
import LargeCardLink from '../../styledComponent/LargeCardLink';
import InterestMatrix from '../../components/common/InterestMatrix';
import colors from '../../assets/styles/color';
import TitleLargeMedium from '../../styledComponent/heading/TitleLargeBold';
import BodySmallBold from '../../styledComponent/heading/BodySmallMedium';

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
  const handelInterestClick = (event: any): void => {
    navigate('/searchbycategory', { state: { interest: event.target.innerText } });
  };

  return (
    <main id="home-main">
      <section style={{ marginTop: '14px', width: '100%' }}>
        <ScheduleCard>
          <BodySmallBold
            style={{ color: `${colors.blue}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
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
      <section className="large-card-box">
        <LargeCardLink to="/findcrew">
          <TitleLargeMedium>내 주변 모임 찾기</TitleLargeMedium>
        </LargeCardLink>
        <LargeCardLink to="#">
          <TitleLargeMedium>모임 생성</TitleLargeMedium>
        </LargeCardLink>
      </section>
      <section id="home-headline-style">
        <TitleLargeMedium>관심사별 모임 찾기</TitleLargeMedium>
      </section>
      <section style={{ display: 'flex', justifyContent: 'center', width: '100%', aspectRatio: '4/3' }}>
        <InterestMatrix onClick={handelInterestClick} />
      </section>
    </main>
  );
}

export default Home;
