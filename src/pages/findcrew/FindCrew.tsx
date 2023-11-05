import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import useMarkerClustering from '../../util/useMarkerClustering';

import icons from '../../assets/icons';
import colors from '../../assets/styles/color';
import heading from '../../styledComponent/heading';

import { BackLink, CategoryDiv } from './styled';

import CrewCard from '../../components/common/CrewCard';

import CategoryModal from '../../components/modal/CategoryModal';
import { navermap } from '../../api';
import type { Spot } from '../../assets/interfaces';
import Loading from '../../components/common/Loading';

import './style.css';

function FindCrew(): JSX.Element {
  // 위치 정보 로딩 여부
  const [isGetMyLocation, setIsGetMyLocation] = useState<boolean>(false);

  // 내 위치 가져오기
  const [myLatLng] = useState<{ lat: number; lng: number }>(() => {
    // 1. 내 위치 가져오기
    const latlng = { lat: 0, lng: 0 };
    navigator.geolocation.getCurrentPosition(position => {
      latlng.lat = position.coords.latitude;
      latlng.lng = position.coords.longitude;
      // 2. loading 완료
      setIsGetMyLocation(true);
    });
    return latlng;
  });

  // 크루 리스트
  const [list, setList] = useState<Spot[]>([]);

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

  // 이벤트 제거를 위한 listener
  const listener = useRef<any>(null);

  const {
    data: crewList,
    isError,
    isLoading,
  } = useQuery('getMapCrewList', navermap.findcrew, {
    onSuccess: () => {
      console.log('api 요청 성공');
    },
    refetchOnWindowFocus: false,
  });

  // 카테고리 선택 모달 열기
  const categorySelectOpen = (): void => {
    setCategoryOpen(true);
  };

  // 카테고리 선택 모달 닫기
  const categorySelectClose = (): void => {
    setCategoryOpen(false);
  };

  // 카테고리 선택
  const selectCategory = (input: string): void => {
    let selectedCategory = input;
    if (input.includes('%2F')) {
      selectedCategory = input.replace('%2F', '/');
    }
    setCategory(selectedCategory);
    setList(crewList!.filter(spot => spot.crew_category === selectedCategory));
    setCategoryOpen(false);
  };

  useEffect(() => {
    console.log(mapDiv.current);
  }, []);

  // 3. loading 완료 -> 네이버 맵 설정
  useEffect(() => {
    if (isGetMyLocation) {
      // console.log('loading complete');
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
    }
  }, [isGetMyLocation]);

  /* 4. 맵 설정 -> 네이버 맵에 이벤트 등록
              -> 클러스터 생성        */
  useEffect(() => {
    // 카테고리 변경 시 일어나는 일

    if (!isLoading && !isError && crewList !== undefined) {
      console.log('progress..');
      if (map !== null) {
        console.log('setting');
        // 1. 카테고리 별 List 설정
        let currentBound = map.getBounds();
        const crewListByCategory =
          category === '관심사' ? crewList : crewList.filter(spot => spot.crew_category === category);
        setList(
          crewListByCategory.filter(spot =>
            currentBound.hasPoint(new naver.maps.LatLng(spot.crew_latitude, spot.crew_longtitude)),
          ),
        );

        // 2. 네이버 이벤트 등록 : 드래그 완료 시
        listener.current = naver.maps.Event.addListener(map, 'dragend', async () => {
          currentBound = map.getBounds();
          // console.log('dragend');
          setList(
            crewListByCategory.filter(spot =>
              currentBound.hasPoint(new naver.maps.LatLng(spot.crew_latitude, spot.crew_longtitude)),
            ),
          );
        });

        // 3. 네이버 이벤트 등록 : 줌 레벨 변경 시
        naver.maps.Event.addListener(map, 'zoom_changed', async () => {
          currentBound = map.getBounds();
          // console.log('zoomchanged');
          setList(
            crewListByCategory.filter(spot =>
              currentBound.hasPoint(new naver.maps.LatLng(spot.crew_latitude, spot.crew_longtitude)),
            ),
          );
        });

        // 4. 클러스터 설정
        if (newCluster.current === null) {
          // console.log('create cluster', data);
          newCluster.current = useMarkerClustering(crewListByCategory, map);
        } else {
          // console.log('change cluster', data);
          newCluster.current.setMap(null);
          newCluster.current = useMarkerClustering(crewListByCategory, map);
        }
      }
    }

    return () => {
      // 카테고리 변경 시 현재 이벤트 제거 후 새로 등록을 위한 clean up
      if (map !== null) {
        if (naver.maps.Event.hasListener(map, 'dragend')) {
          naver.maps.Event.removeListener(listener.current);
        }
        if (naver.maps.Event.hasListener(map, 'zoom_changed')) {
          naver.maps.Event.clearListeners(map, 'zoom_changed');
        }
      }
    };
  }, [isLoading, map, category]);

  // if (isLoading) {
  //   console.log(crewList);
  //   return <Loading />;
  // }

  return (
    <main>
      {(isLoading || !isGetMyLocation) && <Loading />}
      {categoryOpen && <CategoryModal categorySelectClose={categorySelectClose} selectCategory={selectCategory} />}
      <BackLink to="/home">
        <icons.chevronLeft />
      </BackLink>
      <section ref={mapDiv} id="findcrew-map" />
      <section id="findcrew-absolute-div">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <heading.TitleLargeMedium>내 주변 크루</heading.TitleLargeMedium>
          <div
            style={{
              width: 'fit-content',
              height: 'fit-const first = useContext(second)',
              backgroundColor: `${colors.gray200}`,
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
            list.map(spot => <CrewCard key={spot.crew_crewId} spot={spot} page="findcrew" />)
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                color: `${colors.gray200}`,
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
      </section>
    </main>
  );
}

export default FindCrew;
