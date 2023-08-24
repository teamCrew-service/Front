import React, { useCallback, useEffect, useRef, useState } from 'react';
import './FindCrewStyle.css';

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
        zoom: 11,
        scaleControl: false,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const map = new naver.maps.Map(mapDiv.current, mapOption);
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
