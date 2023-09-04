import colors from 'assets/styles/color';
import HeadLineParagraph from 'components/atoms/P/HeadlineParagraph/HeadLineParagraph';
import React, { useState, useEffect } from 'react';
import useMarkerClustering from 'util/useMarkerClustering';
import { styled } from 'styled-components';
import useCalDate from 'util/useCalDate';
import icons from 'assets/icons';
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
  // // 현재 위치 정보
  // const [myLatLng, setMyLatLng] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
  const [myLatLng] = useState<{ lat: number; lng: number }>(() => {
    const latlng = { lat: 0, lng: 0 };
    navigator.geolocation.getCurrentPosition(position => {
      latlng.lat = position.coords.latitude;
      latlng.lng = position.coords.longitude;
      setLoading(true);
    });
    return latlng;
  });
  const [list, setList] = useState<any[]>([]);
  const [categoryOpen, setCategoryOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<string>('관심사');

  let map: naver.maps.Map;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let newCluster: any;

  const categorySelectOpen = (): void => {
    setCategoryOpen(true);
  };

  const categorySelectClose = (): void => {
    setCategoryOpen(false);
  };

  const selectCategory = (input: string): void => {
    setCategory(input);
    setList(spots.filter(spot => spot.category === input));
    newCluster = useMarkerClustering(map, input);
    setCategoryOpen(false);
  };

  // 현재 위치 가져왔을 시 실행되는 코드
  useEffect(() => {
    if (myLatLng.lat !== 0 && myLatLng.lng !== 0) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      map = new window.naver.maps.Map('map', {
        center: new window.naver.maps.LatLng(myLatLng.lat, myLatLng.lng),
        zoom: 14,
        maxZoom: 14,
        scaleControl: false,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      if (category === '관심사') {
        newCluster = useMarkerClustering(map);
      } else {
        newCluster = useMarkerClustering(map, category);
      }

      // map 초기화 시 한 번만 발생하는 이벤트
      naver.maps.Event.once(map, 'init', () => {
        const currentBound = map.getBounds();
        setList([]);
        spots.forEach(spot => {
          if (
            (category === '관심사' || spot.category === category) &&
            currentBound.hasPoint(new naver.maps.LatLng(spot.lat, spot.lng))
          ) {
            setList(prev => [...prev, spot]);
          }
        });
      });
      // 드래그 완료 시 해당 bound에 해당하는 marker 데이터만 보여주기
      naver.maps.Event.addListener(map, 'dragend', () => {
        const currentBound = map.getBounds();
        setList([]);

        spots.forEach(spot => {
          if (
            (category === '관심사' || spot.category === category) &&
            currentBound.hasPoint(new naver.maps.LatLng(spot.lat, spot.lng))
          ) {
            setList(prev => [...prev, spot]);
          }
        });
      });
      // zoom 레벨 변경 시 해당 bound에 해당하는 marker 데이터만 보여주기
      naver.maps.Event.addListener(map, 'zoom_changed', () => {
        const currentBound = map.getBounds();
        setList([]);

        spots.forEach(spot => {
          if (
            (category === '관심사' || spot.category === category) &&
            currentBound.hasPoint(new naver.maps.LatLng(spot.lat, spot.lng))
          ) {
            setList(prev => [...prev, spot]);
          }
        });
      });
    }
  }, [loading, category]);

  return loading ? (
    <div style={{ position: 'relative', width: '100%', height: '100%', border: 'none' }}>
      <div id="map" style={{ width: '100%', height: '65%', border: 'none' }} />
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
        <HeadLineParagraph content="내 주변 크루" />
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
              <CrewCard>
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
