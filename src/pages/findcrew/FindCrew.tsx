import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import HeadLineParagraph from '../../components/atoms/P/HeadlineParagraph/HeadLineParagraph';
import useMarkerClustering from '../../util/useMarkerClustering';
import useCalDate from '../../util/useCalDate';
import icons from '../../assets/icons';
import colors from '../../assets/styles/color';
import CategoryModal from './CategoryModal';
import spots from './mockData';

const CrewCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: fit-content;
  border-radius: 8px;
  padding: 16px;
  background-color: ${colors.Gray100};
`;

const TagDiv = styled.div<{ $color: string }>`
  width: fit-content;
  height: 18px;
  background-color: ${props => props.$color};
  padding: 2px 8px;
  border-radius: 200px;
`;

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  border-radius: 8px;
  border: 1px solid black;
`;

const CategoryDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  width: fit-content;
  border: 1px solid ${colors.Gray300};
  border-radius: 8px;
  padding: 4px 6px;
  cursor: pointer;
`;

function FindCrew(): JSX.Element {
  // 위치 정보 로딩 여부
  const [loading, setLoading] = useState<boolean>(false);
  // 현재 위치 정보, getlocation
  const [myLatLng] = useState<{ lat: number; lng: number }>(() => {
    const latlng = { lat: 0, lng: 0 };
    navigator.geolocation.getCurrentPosition(position => {
      latlng.lat = position.coords.latitude;
      latlng.lng = position.coords.longitude;
      setLoading(true);
    });
    return latlng;
  });
  // 크루 리스트
  const [list, setList] = useState<any[]>([]);
  // 카테고리 모달 표시 여부
  const [categoryOpen, setCategoryOpen] = useState<boolean>(false);
  // 선택된 카테고리 캐싱
  const [category, setCategory] = useState<string>('관심사');
  // 맵 객체
  const [map, setMap] = useState<naver.maps.Map | null>(null);

  // 맵이 표시될 HTMLElement
  const mapDiv = useRef(null);
  // 마커클러스터링 객체
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const newCluster = useRef<any>(null);

  const listener = useRef<any>(null);

  const categorySelectOpen = (): void => {
    setCategoryOpen(true);
  };

  const categorySelectClose = (): void => {
    setCategoryOpen(false);
  };

  const selectCategory = (input: string): void => {
    setCategory(input);
    setList(spots.filter(spot => spot.category === input));
    setCategoryOpen(false);
  };

  // setmap
  useEffect(() => {
    // type Guard
    if (mapDiv.current === null) return;
    setMap(
      new window.naver.maps.Map(mapDiv.current, {
        center: new window.naver.maps.LatLng(myLatLng.lat, myLatLng.lng),
        zoom: 14,
        maxZoom: 14,
        scaleControl: false,
      }),
    );
  }, [loading]);

  useEffect(() => {
    // category 설정에 따른 data 값 변경
    const data = category === '관심사' ? spots : spots.filter(spot => spot.category === category);

    // map이 설정될 경우 이벤트 등록 및 클러스터 생성
    if (map !== null) {
      naver.maps.Event.once(map, 'init', () => {
        const currentBound = map.getBounds();
        setList(data.filter(spot => currentBound.hasPoint(new naver.maps.LatLng(spot.lat, spot.lng))));
      });

      listener.current = naver.maps.Event.addListener(map, 'dragend', () => {
        const currentBound = map.getBounds();
        setList(data.filter(spot => currentBound.hasPoint(new naver.maps.LatLng(spot.lat, spot.lng))));
      });

      // zoom 레벨 변경 시 해당 bound에 해당하는 marker 데이터만 보여주기
      naver.maps.Event.addListener(map, 'zoom_changed', () => {
        const currentBound = map.getBounds();
        setList(data.filter(spot => currentBound.hasPoint(new naver.maps.LatLng(spot.lat, spot.lng))));
      });

      //
      if (newCluster.current === null) {
        newCluster.current = useMarkerClustering(data, map);
      } else {
        newCluster.current.setMap(null);
        newCluster.current = useMarkerClustering(data, map);
      }
    }
    return () => {
      if (map !== null) {
        if (naver.maps.Event.hasListener(map, 'dragend')) {
          naver.maps.Event.removeListener(listener.current);
        }
        if (naver.maps.Event.hasListener(map, 'zoom_changed')) {
          naver.maps.Event.clearListeners(map, 'zoom_changed');
        }
      }
    };
  }, [map, category]);

  return loading ? (
    <div style={{ position: 'relative', width: '100%', height: '100%', border: 'none' }}>
      <Link
        to="/home"
        style={{
          position: 'absolute',
          top: '21px',
          left: '21px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.8)',
          zIndex: 102,
        }}
      >
        <icons.chevronLeft />
      </Link>

      <div ref={mapDiv} style={{ width: '100%', height: '65%', border: 'none' }} />
      {categoryOpen && <CategoryModal categorySelectClose={categorySelectClose} selectCategory={selectCategory} />}
      <div
        style={{
          position: 'absolute',
          bottom: '0px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          width: '100%',
          height: '40%',
          backgroundColor: 'white',
          zIndex: '101',
          borderTopLeftRadius: '32px',
          borderTopRightRadius: '32px',
          padding: '0px 16px',
          paddingTop: '27px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <HeadLineParagraph content="내 주변 크루" />
          <div
            style={{
              width: 'fit-content',
              height: 'fit-const first = useContext(second)',
              backgroundColor: `${colors.Gray200}`,
              textAlign: 'center',
              borderRadius: '200px',
              padding: '2px 8px',
            }}
          >
            + {list.length}
          </div>
        </div>
        <CategoryDiv
          onClick={() => {
            categorySelectOpen();
          }}
        >
          <p style={{ fontSize: '12px', lineHeight: '18px', letterSpacing: '-0.4px', fontWeight: 700 }}>{category}</p>
          <icons.chevronDown />
        </CategoryDiv>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '100%',
            height: '100%',
            overflowY: 'scroll',
            overflowX: 'hidden',
          }}
        >
          {list.length !== 0 ? (
            list.map(spot => (
              <CrewCard key={spot.title}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <TagDiv $color={colors.Gray300}>
                    <p style={{ fontSize: '10px', lineHeight: '14px' }}>{spot.category}</p>
                  </TagDiv>
                  <TagDiv $color={spot.crewType === '정모' ? colors.blue : colors.red}>
                    <p style={{ fontSize: '10px', lineHeight: '14px' }}>{spot.crewType}</p>
                  </TagDiv>
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 700, lineHeight: '24px', letterSpacing: '-0.4px' }}>
                    {spot.title}
                  </p>
                  <p style={{ fontSize: '10px', lineHeight: '14px' }}>{spot.subTitle}</p>
                </div>
                <div>{spot.imageList !== undefined ? <ImageBox>image</ImageBox> : <ImageBox>no image</ImageBox>}</div>
                <div>
                  {spot.dueDate !== undefined && (
                    <div style={{ display: 'flex', gap: '2px' }}>
                      <icons.Calendar />
                      <p style={{ fontSize: '12px', lineHeight: '18px', letterSpacing: '-0.2px' }}>
                        {useCalDate(spot.dueDate)}
                      </p>
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: '2px' }}>
                    <icons.Location />
                    <p style={{ fontSize: '12px', lineHeight: '18px', letterSpacing: '-0.2px' }}>
                      {spot.location} 근처
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    right: '16px',
                    display: 'flex',
                    gap: '4px',
                    zIndex: 101,
                    textAlign: 'center',
                    backgroundColor: `${colors.blueGray300}`,
                    padding: '4px 10px',
                    borderRadius: '200px',
                  }}
                >
                  <icons.users />
                  <p style={{ fontSize: '12px', lineHeight: '18px', letterSpacing: '-0.2px' }}>{spot.current}/8</p>
                </div>
                <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 102 }}>
                  <icons.heart style={{ cursor: 'pointer' }} />
                </div>
              </CrewCard>
            ))
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                color: `${colors.Gray200}`,
              }}
            >
              <p style={{ fontWeight: 700, fontSize: '16px', lineHeight: '22px', letterSpacing: '-0.4px' }}>
                이 지역에 결과가 없습니다.
              </p>
              <p style={{ fontWeight: 700, fontSize: '12px', lineHeight: '18px', letterSpacing: '-0.4px' }}>
                지도를 축소해서 재검색 해주세요
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div style={{ width: '100%', height: '812px', border: 'none' }}>loading</div>
  );
}

export default FindCrew;
