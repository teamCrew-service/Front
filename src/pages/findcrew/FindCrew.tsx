import React, { useState, useEffect, useRef } from 'react';
import useMarkerClustering from '../../util/useMarkerClustering';
import spots from './mockData';
import FindCrewView from './FindCrewView';

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

  const selectCategory = (event: any): void => {
    const selected = event.target.innerText;
    setCategory(selected);
    setList(spots.filter(spot => spot.category === selected));
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

  return (
    <FindCrewView
      loading={loading}
      categoryOpen={categoryOpen}
      category={category}
      categorySelectClose={categorySelectClose}
      categorySelectOpen={categorySelectOpen}
      selectCategory={selectCategory}
      mapDiv={mapDiv}
      list={list}
    />
  );
}

export default FindCrew;
