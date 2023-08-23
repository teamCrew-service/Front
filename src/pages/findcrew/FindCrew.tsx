import React, { useEffect } from 'react';
import './FindCrewStyle.css';

function FindCrew(): JSX.Element {
  useEffect(() => {
    function initMap(): void {
      const mapOption = {
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        maxZoom: 14,
        scaleControl: false,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const map = new naver.maps.Map('map', mapOption);
    }
    initMap();
  });
  return <div id="map" className="container map-container" />;
}

export default FindCrew;
