import React, { useEffect } from 'react';
import './HomeStyle.css';
import SmallImageDiv from 'components/atoms/Div/SmallImageDiv/SmallImageDiv';
import FooterDiv from 'components/atoms/Div/FooterDiv/FooterDiv';
import colors from 'assets/styles/color';
import Body3Paragraph from 'components/atoms/P/Body3Paragraph/Body3Paragraph';
import NoticeCardDiv from 'components/atoms/Div/NoticeCardDiv/NoticeCardDiv';
import HeadLineParagraph from 'components/atoms/P/HeadlineParagraph/HeadLineParagraph';
import LargeCard from 'components/molecules/LargeCard/LargeCard';
import CategoryGrid from 'components/molecules/CategoryGrid';

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
  return (
    <>
      <div style={{ marginTop: '14px', width: '100%', padding: '0 14px' }}>
        <NoticeCardDiv>
          <Body3Paragraph content="다가오는 일정" color={colors.blue} />
          <HeadLineParagraph content="8월 16일 (수) 오후 8시 30분" />
          <Body3Paragraph content="퇴근 후 40분 걷기" color={colors.Gray500} />
          <div id="profile-list-box">
            {UrlList.map(item => (
              <SmallImageDiv key={item.number} Url={item.url} />
            ))}
          </div>
        </NoticeCardDiv>
      </div>
      <div className="large-card-box">
        <LargeCard goPage="/findcrew" content="내 주변 모임 찾기" />
        <LargeCard goPage="/" content="모임 생성" />
      </div>
      <div id="home-headline-style">
        <HeadLineParagraph content="관심사별 모임 찾기" />
      </div>
      <div style={{ width: '100%' }}>
        <CategoryGrid />
      </div>
      <FooterDiv>Footer</FooterDiv>
    </>
  );
}

export default Home;
