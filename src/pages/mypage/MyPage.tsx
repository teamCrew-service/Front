import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import heading from '../../styledComponent/heading';
import icons from '../../assets/icons';
import colors from '../../assets/styles/color';

import './style.css';
import Footer from '../../components/home/Footer';

import { mypage } from '../../api';
import EditUserInfoModal from '../../components/modal/edituserinfo/EditUserInfoModal';
import CrewCard from '../../components/common/CrewCard';

const ProfileImageBox = styled.div<{ profile?: string }>`
  position: relative;
  width: 18.66%;
  aspect-ratio: 1;
  border-radius: 50%;
  background-image: url(${props => props.profile});
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const UserInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 77.84%;
  height: 100%;
`;

const LocationBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: fit-content;
  gap: 2px;
`;

const InterestBox = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  gap: 4px;
`;

const InterestItem = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 4px 10px;
  border-radius: 200px;
  background-color: ${colors.yellow};
`;

const IntroBox = styled.div`
  width: 100%;
  height: 72.88%;
  padding: 12px;
  background-color: ${colors.primary50};
  border-radius: 8px;
  color: ${colors.gray700};
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: fit-content;
`;

const TitleItem = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  height: 100%;
  gap: 2px;
`;

const CardContainer = styled.div`
  width: 100%;
  height: 88.89%;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CardBox = styled.div`
  display: flex;
  width: fit-content;
  height: 100%;
  gap: 8px;
  overflow-x: auto;
  white-space: nowrap;
`;

const CardItem = styled.div`
  width: 241px;
  height: 100%;
`;

function MyPage(): JSX.Element {
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);

  const openEditModalFunc = (): void => {
    setIsOpenEditModal(true);
  };
  const closeEditModalFunc = (): void => {
    setIsOpenEditModal(false);
  };

  const {
    data: myPageInfo,
    isLoading,
    isError,
  } = useQuery('getUserInfo', mypage.getUserInfo, {
    onSuccess: res => {
      console.log(res);
    },
    refetchOnWindowFocus: false,
  });

  /* 로딩 중 */
  if (isLoading) {
    return <div>loading...</div>;
  }

  /* 에러 발생 */
  if (isError) {
    return <div>somthing wrong</div>;
  }

  /* myPageInfo가 존재할 경우 */
  if (myPageInfo !== undefined) {
    return (
      <>
        {isOpenEditModal && (
          <EditUserInfoModal
            userInterest={myPageInfo.topic}
            userInfo={myPageInfo.user}
            closeModal={closeEditModalFunc}
          />
        )}
        <header id="mypage-header">
          <div style={{ width: '24px' }} />
          <heading.BodyLargeBold>마이페이지</heading.BodyLargeBold>
          <icons.GearSix />
        </header>
        <main id="mypage-main">
          <section id="mypage-main-profile">
            <ProfileImageBox profile={myPageInfo.user.profileImage}>
              <icons.PencilSimple
                onClick={openEditModalFunc}
                style={{ position: 'absolute', bottom: '0px', right: '0px', zIndex: 1 }}
                width="25%"
                height="25%"
              />
            </ProfileImageBox>
            <UserInfoBox>
              <heading.TitleLargeBold>{myPageInfo.user.nickname}</heading.TitleLargeBold>
              <heading.BodyBaseMedium style={{ color: `${colors.gray500}` }}>
                {myPageInfo?.user.age}년생 | {myPageInfo.user.gender}
              </heading.BodyBaseMedium>
              <LocationBox>
                <icons.Mappin width={16} />
                <heading.BodyBaseMedium style={{ color: `${colors.gray500}` }}>
                  {myPageInfo?.user.location}
                </heading.BodyBaseMedium>
              </LocationBox>
              <InterestBox>
                {myPageInfo?.topic.map(item => (
                  <InterestItem key={item.interestTopic}>
                    <heading.BodySmallMedium>{item.interestTopic}</heading.BodySmallMedium>
                  </InterestItem>
                ))}
              </InterestBox>
            </UserInfoBox>
          </section>
          <div className="margin-50px-706px" />
          <section id="mypage-main-intro">
            <heading.BodyLargeBold style={{ color: `${colors.gray500}` }}>자기 소개</heading.BodyLargeBold>
            <IntroBox>
              <heading.BodyBaseMedium>{myPageInfo.user.myMessage}</heading.BodyBaseMedium>
            </IntroBox>
          </section>
          <div className="margin-50px-706px" />
          <section id="mypage-main-liked-crew">
            <TitleBox>
              <TitleItem>
                <icons.heart fill={colors.gray500} />
                <heading.BodyLargeBold style={{ color: `${colors.gray500}` }}>찜한 모임</heading.BodyLargeBold>
              </TitleItem>
              <heading.BodySmallBold style={{ color: `${colors.gray400}` }}>전체보기</heading.BodySmallBold>
            </TitleBox>
            <CardContainer>
              <CardBox>
                {myPageInfo?.likedCrew.map(item => (
                  <CardItem key={item.crew_crewId}>
                    <CrewCard key={item.crew_crewId} spot={item} />
                  </CardItem>
                ))}
              </CardBox>
            </CardContainer>
          </section>
        </main>
        <footer className="home-footer">
          <Footer page="myPage" />
        </footer>
      </>
    );
  }

  /* myPageInfo가 undefined일 경우 */
  return <div>no userInfo...</div>;
}

export default MyPage;
