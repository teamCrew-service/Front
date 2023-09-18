import { makeMarkerClustering } from './MarkerClustering';
import type { Spot } from '../assets/interfaces';

function useMarkerClustering(spots: any[], map?: naver.maps.Map): any {
  const MarkerClustering = makeMarkerClustering(window.naver);

  const htmlMarker1 = {
    content:
      '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-1.png);background-size:contain;"></div>',
    size: new window.naver.maps.Size(40, 40),
    anchor: new window.naver.maps.Point(20, 20),
  };
  const htmlMarker2 = {
    content:
      '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-2.png);background-size:contain;"></div>',
    size: new window.naver.maps.Size(40, 40),
    anchor: new window.naver.maps.Point(20, 20),
  };
  const htmlMarker3 = {
    content:
      '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-3.png);background-size:contain;"></div>',
    size: new window.naver.maps.Size(40, 40),
    anchor: new window.naver.maps.Point(20, 20),
  };
  const htmlMarker4 = {
    content:
      '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-4.png);background-size:contain;"></div>',
    size: new window.naver.maps.Size(40, 40),
    anchor: new window.naver.maps.Point(20, 20),
  };
  const htmlMarker5 = {
    content:
      '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-5.png);background-size:contain;"></div>',
    size: new window.naver.maps.Size(40, 40),
    anchor: new window.naver.maps.Point(20, 20),
  };

  const data: Spot[] = spots;

  const markers: naver.maps.Marker[] = [];
  const infoWindows: naver.maps.InfoWindow[] = [];

  function getClickHandler(marker: naver.maps.Marker, infoWindow: naver.maps.InfoWindow) {
    return () => {
      if (map !== undefined) {
        infoWindow.open(map, marker);
      } else {
        infoWindow.close();
      }
    };
  }

  for (let i = 0, ii = data.length; i < ii; i += 1) {
    const spot = data[i];
    const latlng = new window.naver.maps.LatLng(spot.crew_latitude, spot.crew_longtitude);
    const marker = new window.naver.maps.Marker({
      position: latlng,
    });
    const infoWindow = new window.naver.maps.InfoWindow({
      content: spot.crew_crewTitle,
    });
    markers.push(marker);
    infoWindows.push(infoWindow);
    naver.maps.Event.addListener(marker, 'click', getClickHandler(marker, infoWindow));
  }

  const newCluster = new MarkerClustering({
    minClusterSize: 2, // 클러스터가 표시될 최소 마커 수
    maxZoom: 14, // maxZoom보다 작을 경우 클러스터 표시
    map, // 클러스터가 표시될 맵
    markers, // 클러스터링 될 마커들
    disableClickZoom: false, // 더블클릭하여 확대할건지에 대한 여부
    gridSize: 120, // px단위, gridSize로 정의된 그리드 크기 내에서 마커들을 그룹화하여 하나의 클러스터로 표시
    icons: [htmlMarker1, htmlMarker2, htmlMarker3, htmlMarker4, htmlMarker5],
    indexGenerator: [10, 100, 200, 500, 1000],
    stylingFunction: (clusterMarker: any, count: any) => {
      // eslint-disable-next-line no-param-reassign
      clusterMarker.getElement().querySelector('div:first-child').innerText = count;
    },
  });
  return newCluster;
}

export default useMarkerClustering;
