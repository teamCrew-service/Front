import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ProgressBar from '../../../components/common/ProgressBar';

import icons from '../../../assets/icons';
import heading from '../../../styledComponent/heading';
import colors from '../../../assets/styles/color';

import ButtonDiv from '../../../styledComponent/ButtonDiv';
import SearchModal from '../../../components/modal/SearchModal';

import { login } from '../../../api/index';
import type { Information } from '../../../assets/interfaces';
import {
  userBirtYear,
  userCategory,
  userContent,
  userGender,
  userLocation,
  userNickName,
  userProfile,
} from '../../../atoms/login';

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  height: 48px;
  border: 1px solid black;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid ${colors.primary};
`;

function Location(): JSX.Element {
  const navigate = useNavigate();
  const [location, setLocation] = useRecoilState(userLocation);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const interest = useRecoilValue(userCategory);
  const nickname = useRecoilValue(userNickName);
  const birthYear = useRecoilValue(userBirtYear);
  const gender = useRecoilValue(userGender);
  const profile = useRecoilValue(userProfile);
  const content = useRecoilValue(userContent);

  const openSearchModal = (): void => {
    setIsModalOpen(true);
  };

  /*  result 예시
    address_name: "전남 여수시 여서동 229-3"
    category_group_code: "FD6"
    category_group_name: "음식점"
    category_name: "음식점 > 한식"
    distance: ""
    id: "9568967"
    phone: ""
    place_name: "1"
    place_url: "http://place.map.kakao.com/9568967"
    road_address_name: "전남 여수시 여문1로 43-13"
    x: "127.70422781059138"
    y: "34.75213182043442" 
  */

  const closeSearchModal = (result: any): void => {
    setIsModalOpen(false);
    setLocation({ lat: result.y, lng: result.x, location: result.place_name });
  };

  const saveLocation = (): void => {
    const interestTopic = interest.reduce((acc, curr) => `${acc},${curr}`);
    const information: Information = {
      addUserInfoDto: {
        nickname,
        age: Number(birthYear),
        gender,
        myMessage: content,
        location: location.location,
      },
      topicDto: {
        interestTopic,
      },
    };
    login.firstLogin(profile.file!, information).then(
      data => {
        console.log(data);
        navigate('/home');
      },
      error => {
        console.log(error);
      },
    );
  };

  const goPrevFunc = (): void => {
    setLocation({ lat: 37.556, lng: 126.9723, location: '' });
    navigate('/login/introduction');
  };

  useEffect(() => {
    const staticMapContainer = document.getElementById('staticMap');

    const coord = new kakao.maps.LatLng(location.lat, location.lng);

    const staticMapOption = {
      center: coord,
      level: 3,
      marker: {
        position: coord,
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const staticMap = new kakao.maps.StaticMap(staticMapContainer, staticMapOption);

    return () => {
      if (staticMapContainer === null) return;
      if (staticMapContainer.innerHTML !== '') {
        staticMapContainer.innerHTML = '';
      }
    };
  }, [location]);

  return (
    <>
      {isModalOpen && (
        <SearchModal
          title="모임 지역"
          subTitle="선호하는 모임 지역을 선택해주세요 (위치 변경은 프로필에서 가능합니다)"
          closeModal={closeSearchModal}
        />
      )}
      <header>
        <ProgressBar step={6} totalSteps={7} />
      </header>
      <main id="userinfo-main">
        <section style={{ width: 'fit-content', height: 'fit-content' }}>
          <icons.chevronLeft style={{ cursor: 'pointer' }} onClick={goPrevFunc} />
        </section>
        <section>
          <heading.TitleLargeBold>모임 지역</heading.TitleLargeBold>
          <heading.BodySmallMedium style={{ color: `${colors.gray700}` }}>
            선호하는 모임 지역을 선택해주세요 (위치 변경은 프로필에서 가능합니다)
          </heading.BodySmallMedium>
        </section>
        <section>
          <StyledDiv>
            <icons.Mappin />
            <p>{location.location}</p>
          </StyledDiv>
        </section>
        <section>
          <ButtonDiv onClick={openSearchModal}>
            <icons.NavigationArrow style={{ marginRight: '12px' }} />
            <heading.BodyLargeBold>지도에서 검색하기</heading.BodyLargeBold>
          </ButtonDiv>
        </section>
        <section
          id="staticMap"
          style={{
            width: '100%',
            height: '258px',
            borderRadius: '4px',
            marginTop: '60px',
            overflow: 'hidden',
          }}
        />
        {/* 
            닉네임 부분과 동일하게 설정 
            1. api 요청
            2. 성공 시 : home으로 이동
            3. 실패 시 : 조치 취하기
         */}
        <section style={{ marginTop: 'auto', marginBottom: '60px' }}>
          <ButtonDiv onClick={saveLocation}>
            <heading.BodyLargeBold>다음</heading.BodyLargeBold>
          </ButtonDiv>
        </section>
      </main>
    </>
  );
}

export default Location;
