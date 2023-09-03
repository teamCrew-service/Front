import React, { useState, useEffect } from 'react';
import useMarkerClustering from 'util/useMarkerClustering';

function FindCrew(): JSX.Element {
  // 위치 정보 로딩 여부
  const [loading, setLoading] = useState<boolean>(false);
  // // 현재 위치 정보
  const [myLatLng, setMyLatLng] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
  // 정리
  // 1. 페이지 로딩 완료 시마다 api를 통해 data 가져오기
  // 2. 가져온 data를 기반으로 newCluster 생성

  useEffect(() => {
    const setMyPosition = (): void => {
      navigator.geolocation.getCurrentPosition(position => {
        setMyLatLng({ lat: position.coords.latitude, lng: position.coords.longitude });
        setLoading(true);
      });
    };
    setMyPosition();
  }, []);

  useEffect(() => {
    if (myLatLng.lat !== 0 && myLatLng.lng !== 0) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const map = new window.naver.maps.Map('map', {
        center: new window.naver.maps.LatLng(myLatLng.lat, myLatLng.lng),
        zoom: 14,
        maxZoom: 14,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const newCluster = useMarkerClustering(map);
    }
  }, [myLatLng]);

  return loading ? (
    <div id="map" style={{ width: '100%', height: '812px', border: 'none' }} />
  ) : (
    <div style={{ width: '100%', height: '812px', border: 'none' }}>loading</div>
  );
}

export default FindCrew;
