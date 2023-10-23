import React, { useState } from 'react';
import styled from 'styled-components';

import { ModalContainer, ModalHeader } from '../common/styled';

import icons from '../../../assets/icons';
import heading from '../../../styledComponent/heading';
import colors from '../../../assets/styles/color';

import './style.css';

import type { MyInfo } from '../../../assets/interfaces';
import SearchModal from '../SearchModal';

const ProfileBox = styled.div<{ profile: string }>`
  position: relative;
  height: 13.19%;
  aspect-ratio: 1;
  border-radius: 50%;
  background-image: url(${props => props.profile});
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
`;

// height : 76px
const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 17.19%;
`;

const TwoItemBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  height: 17.19%;
`;
const ItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

// height : 178px
const IntroBox = styled(ItemBox)`
  height: 40.27%;
`;

const InsertDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 63.16%;
  padding: 12px;
  border: 1px solid ${colors.primary};
  border-radius: 4px;
`;

const IntroInsertDiv = styled(InsertDiv)`
  flex-direction: column;
  gap: 0px;
  justify-content: space-between;
  align-items: end;
  height: 84.27%;
`;

const StyledInput = styled.input`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.16px;
  width: 100%;
  height: 100%;
  border: none;
`;

const StyledTextarea = styled.textarea`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.14px;
  resize: none;
  width: 100%;
  height: 84.13%;
  border: none;
  outline: none;
`;

function EditUserInfoModal({ userInfo, closeModal }: { userInfo: MyInfo; closeModal: () => void }): JSX.Element {
  const [isOpenSearchModal, setIsOpenSearchModal] = useState<boolean>(false);
  const [myLocation, setMyLocation] = useState<string>(userInfo.location);
  const [myIntro, setMyIntro] = useState<string>(userInfo.myMessage);

  const openSearchModalFunc = (): void => {
    setIsOpenSearchModal(true);
  };

  const closeSearchModalFunc = (result: any): void => {
    if (result !== undefined) {
      setMyLocation(result.place_name);
    }
    setIsOpenSearchModal(false);
  };

  return (
    <>
      {isOpenSearchModal && <SearchModal closeModal={closeSearchModalFunc} title="위치 검색" />}
      <ModalContainer style={{ backgroundColor: 'white' }}>
        <ModalHeader>
          <icons.chevronLeft onClick={closeModal} />
          <heading.BodyLargeBold>프로필 수정하기</heading.BodyLargeBold>
          <div style={{ width: '24px' }} />
        </ModalHeader>
        <main id="edit-userinfo-main">
          <ProfileBox profile={userInfo.profileImage}>
            <icons.Camera style={{ position: 'absolute', bottom: '0px', right: '0px', zIndex: 2 }} />
          </ProfileBox>
          <section id="edit-userinfo-itemlist">
            <ItemBox>
              <heading.BodyBaseBold>닉네임</heading.BodyBaseBold>
              <InsertDiv>
                <StyledInput placeholder={userInfo.nickname} />
              </InsertDiv>
            </ItemBox>
            <TwoItemBox>
              <ItemDiv>
                <heading.BodyBaseBold>출생년도</heading.BodyBaseBold>
                <InsertDiv>
                  <StyledInput placeholder={String(userInfo.age)} />
                </InsertDiv>
              </ItemDiv>
              <ItemDiv>
                <heading.BodyBaseBold>성별</heading.BodyBaseBold>
                <InsertDiv>
                  <StyledInput placeholder={userInfo.gender} />
                </InsertDiv>
              </ItemDiv>
            </TwoItemBox>
            <ItemBox>
              <heading.BodyBaseBold>위치</heading.BodyBaseBold>
              <InsertDiv onClick={openSearchModalFunc}>
                <icons.Mappin />
                <heading.BodyLargeBold>{myLocation}</heading.BodyLargeBold>
              </InsertDiv>
            </ItemBox>
            <IntroBox>
              <heading.BodyBaseBold>소개</heading.BodyBaseBold>
              <IntroInsertDiv>
                <StyledTextarea
                  value={myIntro}
                  onClick={() => {
                    if (myIntro === userInfo.myMessage) {
                      setMyIntro('');
                    }
                  }}
                  onChange={e => {
                    if (e.target.value.length <= 200) {
                      setMyIntro(e.target.value);
                      return;
                    }
                    alert('200자를 넘겼습니다!');
                  }}
                />
                <heading.BodyBaseMedium>{myIntro.length}/200</heading.BodyBaseMedium>
              </IntroInsertDiv>
            </IntroBox>
          </section>
        </main>
      </ModalContainer>
    </>
  );
}

export default EditUserInfoModal;
