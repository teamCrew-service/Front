import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../assets/styles/color';
import HeadLineParagraph from '../../styledComponent/heading/HeadLineParagraph';
import BodyLong3Paragraph from '../../styledComponent/heading/BodyLong3Paragraph';

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

const StyledInput = styled.input`
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  height: 48px;
  border: 1px solid black;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid ${colors.primary};
`;

const StyledDiv2 = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 0px 16px;
`;

const StyledDiv3 = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
  height: 76px;
`;

const DetailAddressDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 64px;
  background-color: ${colors.primary100};
  padding: 8px 12px;
  border-radius: 4px;
`;

function SearchModal({ closeModal }: { closeModal: (lng?: string, lat?: string) => void }): JSX.Element {
  const [searchList, setSearchList] = useState<any[]>([]);
  const keyword = useRef('');
  const ps = useRef<typeof kakao.maps.services.Places | null>(null);

  const changeKeyword = (event: any): void => {
    keyword.current = event.target.value;
  };

  function placeSearchCB(result: any, status: any): void {
    if (status === kakao.maps.services.Status.OK) {
      setSearchList(result);
    }
    if (status === kakao.maps.services.Status.ZERO_RESULT) {
      setSearchList([]);
    }
  }

  const searchKeyword = (event: any): void => {
    event.preventDefault();
    if (ps.current === null) return;
    ps.current.keywordSearch(keyword.current, placeSearchCB, {
      size: 10,
      useMapCenter: true,
      useMapBounds: true,
      radius: 500,
    });
  };

  useEffect(() => {
    ps.current = new kakao.maps.services.Places();
  }, []);
  return (
    <div
      style={{
        position: 'absolute',
        display: 'flex',
        alignItems: 'end',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: '1',
        border: '1px solid black',
      }}
    >
      <StyledDiv2>
        <StyledDiv3
          onClick={() => {
            closeModal();
          }}
        >
          x
        </StyledDiv3>
        <HeadLineParagraph>모임 지역</HeadLineParagraph>
        <BodyLong3Paragraph style={{ color: `${colors.Gray600}` }}>
          선호하는 모임 지역을 선택해주세요 (위치 변경은 프로필에서 가능합니다)
        </BodyLong3Paragraph>
        <form onSubmit={searchKeyword}>
          <StyledInput onChange={changeKeyword} type="text" />
          <input
            style={{
              width: '100%',
              height: '56px',
              marginTop: '12px',
              backgroundColor: `${colors.primary}`,
              border: 'none',
              borderRadius: '4px',
              color: 'white',
              fontWeight: 700,
              fontSize: '16px',
            }}
            type="submit"
            value="검색"
          />
        </form>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '100%',
            height: '50%',
            overflowX: 'hidden',
            overflowY: 'auto',
            marginTop: '12px',
          }}
        >
          {searchList.length > 0
            ? searchList.map(item => (
                <DetailAddressDiv
                  key={item.id}
                  onClick={() => {
                    closeModal(item.x, item.y);
                  }}
                >
                  <p style={{ fontSize: '14px', lineHeight: '24px', letterSpacing: '-0.2px' }}>{item.place_name}</p>
                  <p style={{ fontSize: '10px', lineHeight: '14px' }}>{item.address_name}</p>
                </DetailAddressDiv>
              ))
            : null}
        </div>
      </StyledDiv2>
    </div>
  );
}

export default SearchModal;
