import React, { useEffect } from 'react';
import styled from 'styled-components';
import heading from '../../../styledComponent/heading';
import colors from '../../../assets/styles/color';
import icons from '../../../assets/icons';

import { SaveBtn, BlockDiv, SubTitle } from '../../../pages/detail/styled';

import type { Schedule, MemberDetail } from '../../../assets/interfaces';

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

const TestDiv = styled.div``;

function Location({
  crewInfo,
  recentSchedule,
  saveAddress,
}: {
  crewInfo: MemberDetail;
  recentSchedule: Schedule | null;
  saveAddress: (input: string) => void;
}): JSX.Element {
  useEffect(() => {
    const staticMapContainer = document.getElementById('long-crew-staticMap');
    let coord;
    if (recentSchedule === null) {
      coord = new kakao.maps.LatLng(crewInfo.crew.crew_latitude, crewInfo.crew.crew_longtitude);
    } else {
      coord = new kakao.maps.LatLng(recentSchedule.scheduleLatitude, recentSchedule.scheduleLongitude);
    }
    const staticMapOption = {
      center: coord,
      level: 3,
      marker: {
        position: coord,
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const staticMap = new kakao.maps.StaticMap(staticMapContainer, staticMapOption);
  }, []);
  return (
    <BlockDiv>
      <SubTitle>
        <heading.BodyLargeBold>위치</heading.BodyLargeBold>
      </SubTitle>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <icons.Mappin />
          <div>
            {/* 최근 일정이 없을 경우 : 크루 위치 표시 */}
            {recentSchedule === null && (
              <>
                <heading.BodyLargeBold>{crewInfo?.crew.crew_crewPlaceName}</heading.BodyLargeBold>
                <heading.CaptionXS>{crewInfo.crew.crew_crewAddress}</heading.CaptionXS>
              </>
            )}
            {/* 최근 일정이 있을 경우 : 일정 위치 표시 */}
            {recentSchedule !== null && (
              <>
                <heading.BodyLargeBold>{recentSchedule.schedulePlaceName}</heading.BodyLargeBold>
                <heading.CaptionXS>{recentSchedule.scheduleAddress}</heading.CaptionXS>
              </>
            )}
          </div>
        </div>
        <SaveBtn
          onClick={() => {
            saveAddress(crewInfo.crew.crew_crewAddress);
          }}
        >
          <icons.Files />
          <heading.BodySmallBold style={{ color: `${colors.point}` }}>주소 복사</heading.BodySmallBold>
        </SaveBtn>
      </div>
      <TestDiv
        id="long-crew-staticMap"
        style={{
          position: 'relative',
          width: '100%',
          height: '180px',
          borderRadius: '4px',
        }}
        // eslint-disable-next-line react/jsx-no-comment-textnodes
      >
        <div
          style={{
            position: 'absolute',
            top: '0px',
            left: '0px',
            display: 'flex',
            justifyContent: 'end',
            width: '100%',
            height: '100%',
            zIndex: 1,
          }}
        />
        <TestDiv
          onClick={event => {
            // ChildNode에는 어떤 형식의 Node든 다 올 수 있다.
            const { nextSibling } = event.currentTarget;
            // 타입 Narrowing
            if (nextSibling instanceof HTMLElement) {
              nextSibling.click();
            }
          }}
          style={{ position: 'absolute', top: '4px', right: '4px', cursor: 'pointer', zIndex: 1 }}
        >
          <icons.MapCloseBtn />
        </TestDiv>
      </TestDiv>
    </BlockDiv>
  );
}

export default Location;
