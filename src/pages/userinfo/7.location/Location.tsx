import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { login } from '../../../api/index';
import ProgressBar from '../../../components/common/ProgressBar';
import icons from '../../../assets/icons';
import HeadLineParagraph from '../../../styledComponent/heading/HeadLineParagraph';
import BodyLong3Paragraph from '../../../styledComponent/heading/BodyLong3Paragraph';
import colors from '../../../assets/styles/color';
import ButtonDiv from '../../../styledComponent/ButtonDiv';
import SearchModal from '../../../components/modal/SearchModal';

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
  const [myLatLng, setMyLatLng] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
  const [myAddress, setMyAddress] = useState<string>('');
  // const [staticURL, setStaticURL] = useState<string>('');

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const geocoder = useRef<typeof kakao.maps.services.Geocoder | null>(null);

  const openSearchModal = (): void => {
    setIsModalOpen(true);
  };

  const closeSearchModal = (lng?: string, lat?: string): void => {
    setIsModalOpen(false);
    if (lng === undefined || lat === undefined) return;
    setMyLatLng({
      lat: Number(lat),
      lng: Number(lng),
    });
  };

  const saveLocation = (): void => {
    sessionStorage.setItem('location', myAddress);
    const information = {
      interestTopic: sessionStorage.getItem('category'),
      nickname: sessionStorage.getItem('nickname'),
      age: sessionStorage.getItem('birthyear'),
      gender: sessionStorage.getItem('gender'),
      profileImage: sessionStorage.getItem('profile'),
      myMessage: sessionStorage.getItem('introduction'),
      location: sessionStorage.getItem('location'),
    };
    login.firstLogin(information).then(
      data => {
        console.log(data);
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
      {isModalOpen && <SearchModal closeModal={closeSearchModal} />}
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
          <HeadLineParagraph>모임 지역</HeadLineParagraph>
          <BodyLong3Paragraph style={{ color: `${colors.Gray600}` }}>
            선호하는 모임 지역을 선택해주세요 (위치 변경은 프로필에서 가능합니다)
          </BodyLong3Paragraph>
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
