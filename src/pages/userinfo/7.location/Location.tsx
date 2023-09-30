import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { login } from '../../../api/index';
import ProgressBar from '../../../components/common/ProgressBar';
import icons from '../../../assets/icons';
import BodySmallMedium from '../../../styledComponent/heading/BodySmallMedium';
import colors from '../../../assets/styles/color';
import ButtonDiv from '../../../styledComponent/ButtonDiv';
import SearchModal from '../../../components/modal/SearchModal';
import TitleLargeBold from '../../../styledComponent/heading/TitleLargeBold';
import type { Information } from '../../../assets/interfaces';

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
  const [myLatLng, setMyLatLng] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
  const [myAddress, setMyAddress] = useState<string>('');
  // const [staticURL, setStaticURL] = useState<string>('');

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const geocoder = useRef<typeof kakao.maps.services.Geocoder | null>(null);

  const openSearchModal = (): void => {
    setIsModalOpen(true);
  };

  const closeSearchModal = (result: any): void => {
    setIsModalOpen(false);
    if (result === undefined) return;
    setMyLatLng({
      lat: Number(result.y),
      lng: Number(result.x),
    });
  };

  const saveLocation = (): void => {
    sessionStorage.setItem('location', myAddress);
    const information: Information = {
      addUserInfoDto: {
        nickname: sessionStorage.getItem('nickname'),
        age: sessionStorage.getItem('birthyear'),
        gender: sessionStorage.getItem('gender'),
        profileImage: sessionStorage.getItem('profile'),
        myMessage: sessionStorage.getItem('introduction'),
        location: sessionStorage.getItem('location'),
      },
      topicDto: {
        interestTopic: sessionStorage.getItem('category'),
      },
    };
    login.firstLogin(information).then(
      data => {
        console.log(data);
        navigate('/home');
      },
      error => {
        console.log(error);
      },
    );
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setMyLatLng({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
    geocoder.current = new kakao.maps.services.Geocoder();
  }, []);

  useEffect(() => {
    const staticMapContainer = document.getElementById('staticMap');
    function saveMyAddress(result: any, status: any): void {
      if (status === kakao.maps.services.Status.OK) {
        setMyAddress(result[0].address.address_name);
      }
    }
    if (myLatLng.lat !== 0 && myLatLng.lng !== 0) {
      const coord = new kakao.maps.LatLng(myLatLng.lat, myLatLng.lng);
      geocoder.current.coord2Address(coord.getLng(), coord.getLat(), saveMyAddress);
      const staticMapOption = {
        center: coord,
        level: 3,
        marker: {
          position: coord,
        },
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const staticMap = new kakao.maps.StaticMap(staticMapContainer, staticMapOption);
    }
    return () => {
      if (staticMapContainer === null) return;
      if (staticMapContainer.innerHTML !== '') {
        staticMapContainer.innerHTML = '';
      }
    };
  }, [myLatLng]);

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
          <Link to="/login/introduction">
            <icons.chevronLeft style={{ cursor: 'pointer' }} />
          </Link>
        </section>
        <section>
          <TitleLargeBold>모임 지역</TitleLargeBold>
          <BodySmallMedium style={{ color: `${colors.gray700}` }}>
            선호하는 모임 지역을 선택해주세요 (위치 변경은 프로필에서 가능합니다)
          </BodySmallMedium>
        </section>
        <section>
          <StyledDiv>
            <icons.Mappin />
            <p>{myAddress}</p>
          </StyledDiv>
        </section>
        <section>
          <ButtonDiv onClick={openSearchModal}>
            <icons.NavigationArrow style={{ marginRight: '12px' }} />
            지도에서 검색하기
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
            <Link
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                color: 'inherit',
                textDecoration: 'none',
              }}
              to="/login/location"
            >
              다음
            </Link>
          </ButtonDiv>
        </section>
      </main>
    </>
  );
}

export default Location;
