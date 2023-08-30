import React, { useState, useEffect } from 'react';
import { Container, NaverMap, useNavermaps } from 'react-naver-maps';

function FindCrew(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [myLatLng, setMyLatLng] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
  const navermaps = useNavermaps();
  useEffect(() => {
    const setMyPosition = (): void => {
      navigator.geolocation.getCurrentPosition(position => {
        setMyLatLng({ lat: position.coords.latitude, lng: position.coords.longitude });
        setLoading(true);
      });
    };
    setMyPosition();
  }, []);

  return (
    <Container style={{ width: '100%', height: '812px', border: 'none' }}>
      {loading && (
        <NaverMap
          defaultCenter={new navermaps.LatLng(myLatLng.lat, myLatLng.lng)}
          defaultZoom={12}
          maxZoom={14}
          minZoom={10}
        />
      )}
    </Container>
  );
}

export default FindCrew;
