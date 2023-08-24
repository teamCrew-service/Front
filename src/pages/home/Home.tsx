import React from 'react';
import './HomeStyle.css';
import LargeCard from '../../components/molecules/LargeCard/LargeCard';
import HeadLineParagraph from '../../components/atoms/P/HeadlineParagraph/HeadLineParagraph';
import SmallCardDiv from '../../components/atoms/Div/SmallCardDiv/SmallCardDiv';
import SubHead1Paragraph from '../../components/atoms/P/SubHead1Paragraph/SubHead1Paragraph';
import NoticeCardDiv from '../../components/atoms/Div/NoticeCardDiv/NoticeCardDiv';
import Body3Paragraph from '../../components/atoms/P/Body3Paragraph/Body3Paragraph';
import colors from '../../assets/styles/color';
import SmallImageDiv from '../../components/atoms/Div/SmallImageDiv/SmallImageDiv';
import FooterDiv from '../../components/atoms/Div/FooterDiv/FooterDiv';

function Home(): JSX.Element {
  const UrlList: Array<{ number: number; url: string }> = [
    { number: 1, url: '' },
    { number: 2, url: '' },
    { number: 3, url: '' },
    { number: 4, url: '' },
    { number: 5, url: '' },
  ];
  const categoryList = [
    { code: 1, name: '친목' },
    { code: 2, name: '음료' },
    { code: 3, name: '여행' },
    { code: 4, name: '운동' },
    { code: 5, name: '책/글' },
    { code: 6, name: '커리어' },
    { code: 7, name: '공연/축제' },
    { code: 8, name: '음악' },
    { code: 9, name: '만들기' },
    { code: 10, name: '사진' },
    { code: 11, name: '반려동물' },
    { code: 12, name: '자유주제' },
  ];
  return (
    <>
      <div style={{ marginTop: '14px' }}>
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
      <div className="category-grid-box">
        {categoryList.map(item => (
          <SmallCardDiv key={item.code}>
            <SubHead1Paragraph content={item.name} />
          </SmallCardDiv>
        ))}
      </div>
      <FooterDiv>Footer</FooterDiv>
    </>
  );
}

export default Home;
