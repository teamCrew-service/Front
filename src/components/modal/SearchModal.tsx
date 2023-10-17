import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../assets/styles/color';
import icons from '../../assets/icons';
import heading from '../../styledComponent/heading';

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
  z-index: 4;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
  width: 100%;
  height: 48px;
  border: 1px solid black;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid ${colors.primary};
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.14px;
  &::placeholder {
    color: ${colors.gray400};
  }
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

const DetailAddressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  width: 100%;
  height: 64px;
  background-color: ${colors.primary50};
  padding: 16px 12px;
  border-radius: 4px;
`;

const DetailAddressDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const NoSearchListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
  background-color: ${colors.gray100};
  border-radius: 8px;
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
      console.log('no search list');
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
          <icons.close />
        </Header>
        <heading.TitleLargeBold>{title}</heading.TitleLargeBold>
        {subTitle !== undefined && (
          <heading.BodySmallMedium style={{ color: `${colors.gray500}` }}>{subTitle}</heading.BodySmallMedium>
        )}
        <form onSubmit={searchKeyword} style={{ marginTop: '24px' }}>
          <SearchContainer>
            <icons.Mappin />
            <StyledInput onChange={changeKeyword} type="text" placeholder="위치 입력" />
          </SearchContainer>
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
          {searchList.length === 0 && <NoSearchListContainer>no list</NoSearchListContainer>}
          {searchList.length > 0
            ? searchList.map(item => (
                <DetailAddressContainer
                  key={item.id}
                  onClick={() => {
                    closeModal(item);
                  }}
                >
                  <icons.Mappin />
                  <DetailAddressDiv>
                    <heading.BodyBaseMedium>{item.place_name}</heading.BodyBaseMedium>
                    <heading.CaptionXS style={{ color: `${colors.gray500}` }}>{item.address_name}</heading.CaptionXS>
                  </DetailAddressDiv>
                </DetailAddressContainer>
              ))
            : null}
        </div>
      </Modal>
    </ModalContainer>
  );
}

export default SearchModal;
