import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import ScheduleCard from '../../styledComponent/ScheduleCard';
import HeadLineParagraph from '../../styledComponent/heading/HeadLineParagraph';
import LargeCardLink from '../../styledComponent/LargeCardLink';
import InterestMatrix from '../../components/common/InterestMatrix';
import colors from '../../assets/styles/color';
import Body3Paragraph from '../../styledComponent/heading/Body3Paragrpah';

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
    <main>
      <section style={{ marginTop: '14px', width: '100%' }}>
        <ScheduleCard>
          <Body3Paragraph style={{ display: 'flex', justifyContent: 'space-between', color: `${colors.blue}` }}>
            다가오는 일정
            <Link to="/upcomingschedule" style={{ textDecoration: 'none' }}>
              {'>'}
            </Link>
          </Body3Paragraph>

          <HeadLineParagraph>8월 16일 (수) 오후 8시 30분</HeadLineParagraph>
          <Body3Paragraph style={{ color: `${colors.Gray500}` }}>퇴근 후 40분 걷기</Body3Paragraph>
          <div id="profile-list-box">
            {UrlList.map(item => (
              <SmallImageDiv key={item.number} $URL={item.url} />
            ))}
          </div>
        </ScheduleCard>
      </section>
      <section className="large-card-box">
        <LargeCardLink to="/findcrew">
          <HeadLineParagraph>내 주변 모임 찾기</HeadLineParagraph>
        </LargeCardLink>
        <LargeCardLink to="#">
          <HeadLineParagraph>모임 생성</HeadLineParagraph>
        </LargeCardLink>
      </section>
      <section id="home-headline-style">
        <HeadLineParagraph>관심사별 모임 찾기</HeadLineParagraph>
      </section>
      <section style={{ display: 'flex', justifyContent: 'center', width: '100%', aspectRatio: '4/3' }}>
        <InterestMatrix onClick={handelInterestClick} />
      </section>
    </main>
  );
}

export default Home;
