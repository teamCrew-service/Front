import React, { useCallback, useEffect, useRef, useState } from 'react';
import './FindCrewStyle.css';
import spots from './mockData';

function FindCrew(): JSX.Element {
  const mapDiv = useRef<HTMLDivElement | null>(null);
  const [currentPosition, setCurrentPosition] = useState<{ latitude: number; longitude: number }>({
    latitude: 0,
    longitude: 0,
  });
  const initMap = useCallback((latitude: number, longitude: number): void => {
    if (mapDiv.current !== null) {
      const mapOption = {
        center: new naver.maps.LatLng(latitude, longitude),
        maxZoom: 14,
        zoom: 7,
        minZoom: 7,
        scaleControl: false,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const map = new naver.maps.Map(mapDiv.current, mapOption);
      const markers = [];
      for (let i = 0; i < spots.length; i += 1) {
        const markerOption = {
          position: new naver.maps.LatLng(spots[i].lat, spots[i].lng),
          map,
          title: spots[i].title,
        };
        const marker = new naver.maps.Marker(markerOption);
        const infowindow = new naver.maps.InfoWindow({
          content: spots[i].title,
        });

        // 마커에 마우스 호버 시에 정보를 표시하는 이벤트 리스너 추가
        naver.maps.Event.addListener(marker, 'mouseover', () => {
          infowindow.open(map, marker);
        });

        // 마커에 마우스가 벗어날 때 인포윈도우 닫기
        naver.maps.Event.addListener(marker, 'mouseout', () => {
          infowindow.close();
        });

        markers.push(marker);
      }
    }
  }, []);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setCurrentPosition({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        },
        error => {
          console.log('Error getting geolocation:', error.message);
        },
      );
    } else {
      console.log('geolocation을 지원하지 않는 브라우저입니다.');
    }
  }, []);

  useEffect(() => {
    initMap(currentPosition.latitude, currentPosition.longitude);
  }, [currentPosition]);

  return currentPosition.latitude === 0 && currentPosition.longitude === 0 ? (
    <div style={{ margin: 'auto 0px' }}>Loading...</div>
  ) : (
    <div ref={mapDiv} className="container map-container" />
  );
}

export default FindCrew;
