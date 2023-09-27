import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../assets/styles/color';
import TitleLargeBold from '../../styledComponent/heading/TitleLargeBold';
import BodySmallMedium from '../../styledComponent/heading/BodySmallMedium';

declare global {
  interface Window {
    kakao: any;
  }
}

const ModalContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: end;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

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

const Modal = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 0px 16px;
  animation: showModal 1.5s forwards;
  @keyframes showModal {
    from {
      height: 0px;
    }
    to {
      height: 90%;
    }
  }
`;

const Header = styled.div`
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

const { kakao } = window;

function SearchModal({
  closeModal,
  title,
  subTitle,
}: {
  closeModal: (result?: any) => void;
  title: string;
  subTitle?: string;
}): JSX.Element {
  const [searchList, setSearchList] = useState<any[]>([]);
  const keyword = useRef('');
  const ps = useRef<typeof kakao.maps.services.Places | null>(null);

  const changeKeyword = (event: any): void => {
    keyword.current = event.target.value;
  };

  function placeSearchCB(result: any, status: any): void {
    if (status === kakao.maps.services.Status.OK) {
      console.log(result);
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
    <ModalContainer>
      <Modal>
        <Header
          onClick={() => {
            closeModal();
          }}
        >
          x
        </Header>
        <TitleLargeBold>{title}</TitleLargeBold>
        {subTitle !== undefined && <BodySmallMedium style={{ color: `${colors.gray500}` }}>{subTitle}</BodySmallMedium>}
        <form onSubmit={searchKeyword} style={{ marginTop: '24px' }}>
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
                    closeModal(item);
                  }}
                >
                  <h3 style={{ fontSize: '14px', lineHeight: '24px', letterSpacing: '-0.2px' }}>{item.place_name}</h3>
                  <h4 style={{ fontSize: '10px', lineHeight: '14px' }}>{item.address_name}</h4>
                </DetailAddressDiv>
              ))
            : null}
        </div>
      </Modal>
    </ModalContainer>
  );
}

export default SearchModal;
