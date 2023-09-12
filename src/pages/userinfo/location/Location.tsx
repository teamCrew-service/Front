import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { login } from '../../../api/index';
import ProgressBar from '../../../components/molecules/ProgressBar';
import icons from '../../../assets/icons';
import HeadLineParagraph from '../../../components/atoms/P/HeadlineParagraph/HeadLineParagraph';
import BodyLong3Paragraph from '../../../components/atoms/P/BodyLong3Paragraph/BodyLong3Paragraph';
import colors from '../../../assets/styles/color';
import ButtonDiv from '../../../components/atoms/Div/ButtonDiv/ButtonDiv';
import ButtonDivParagraph from '../../../components/atoms/P/ButtonDivParagraph/ButtonDivParagraph';

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
  const [staticURL, setStaticURL] = useState<string>('');

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
  }, []);

  useEffect(() => {
    if (myLatLng.lat !== 0 && myLatLng.lng !== 0) {
      const URL = `https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?w=500&h=300&markers=type:d|size:mid|pos:${myLatLng.lng}%20${myLatLng.lat}&X-NCP-APIGW-API-KEY-ID=${process.env.REACT_APP_NAVER_ID}`;
      setStaticURL(URL);
      naver.maps.Service.reverseGeocode(
        {
          coords: new naver.maps.LatLng(myLatLng.lat, myLatLng.lng),
        },
        (status, response): void => {
          if (status !== naver.maps.Service.Status.OK) {
            alert('Something wrong!');
            return;
          }

          const result = response.v2; // 검색 결과의 컨테이너
          // const items = result.results; // 검색 결과의 배열
          const { address } = result; // 검색 결과로 만든 주소
          setMyAddress(address.jibunAddress);
          // do Something
        },
      );
    }
  }, [myLatLng]);

  return (
    <>
      <header>
        <ProgressBar step={6} totalSteps={7} />
      </header>
      <main id="category-main">
        <section style={{ width: 'fit-content', height: 'fit-content' }}>
          <Link to="/login/introduction">
            <icons.chevronLeft style={{ cursor: 'pointer' }} />
          </Link>
        </section>
        <section>
          <HeadLineParagraph content="모임 지역" />
          <BodyLong3Paragraph
            content="선호하는 모임 지역을 선택해주세요 (위치 변경은 프로필에서 가능합니다)"
            color={colors.Gray600}
          />
        </section>
        <section>
          <StyledDiv>
            <icons.Mappin />
            <p>{myAddress}</p>
          </StyledDiv>
        </section>
        <section>
          <ButtonDiv>
            <icons.NavigationArrow style={{ marginRight: '12px' }} />
            <ButtonDivParagraph>지도에서 검색하기</ButtonDivParagraph>
          </ButtonDiv>
        </section>
        <section
          style={{
            width: '100%',
            height: '258px',
            borderRadius: '4px',
            marginTop: '60px',
            overflow: 'hidden',
          }}
        >
          {staticURL !== '' ? <img src={staticURL} alt="map" width="100%" height="100%" /> : <div>Loading</div>}
        </section>
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
              <ButtonDivParagraph>다음</ButtonDivParagraph>
            </Link>
          </ButtonDiv>
        </section>
      </main>
    </>
  );
}

export default Location;
