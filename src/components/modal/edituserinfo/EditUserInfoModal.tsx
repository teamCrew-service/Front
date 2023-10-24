import React, { useState } from 'react';
import styled from 'styled-components';

import { ModalContainer, ModalHeader } from '../common/styled';

import icons from '../../../assets/icons';
import heading from '../../../styledComponent/heading';
import colors from '../../../assets/styles/color';

import './style.css';

import type { MyInfo, MyTopic } from '../../../assets/interfaces';
import SearchModal from '../SearchModal';
import InterestMatrix from '../../common/InterestMatrix';

const ProfileBox = styled.div<{ profile: string }>`
  position: relative;
  height: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  background-image: url(${props => props.profile});
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  // height : 76px
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

const IntroBox = styled(ItemBox)`
  // height : 178px
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

const InterestMatrixContainer = styled.div`
  width: 100%;
  /* height:256px */
  height: 84.21%;
`;

function EditUserInfoModal({
  userInfo,
  userInterest,
  closeModal,
}: {
  userInfo: MyInfo;
  userInterest: MyTopic[];
  closeModal: () => void;
}): JSX.Element {
  const [isOpenSearchModal, setIsOpenSearchModal] = useState<boolean>(false);

  const [myNickname, setMyNickname] = useState<string>(userInfo.nickname);
  const [myBithYear, setMyBirthYear] = useState<number>(userInfo.age);
  const [myGender, setMyGender] = useState<string>(userInfo.gender);
  const [myLocation, setMyLocation] = useState<string>(userInfo.location);
  const [myIntro, setMyIntro] = useState<string>(userInfo.myMessage);
  const [myInterest, setMyInterest] = useState<string[]>(() => {
    const myInterestArray = userInterest.map(item => {
      let returnValue = item.interestTopic.trim();
      if (item.interestTopic.includes('/')) {
        returnValue = item.interestTopic.replace('/', '%2F').trim();
      }
      return returnValue;
    });
    console.log(myInterestArray);
    return myInterestArray;
  });

  const openSearchModalFunc = (): void => {
    setIsOpenSearchModal(true);
  };

  const closeSearchModalFunc = (result: any): void => {
    if (result !== undefined) {
      setMyLocation(result.place_name);
    }
    setIsOpenSearchModal(false);
  };

  const saveMyInfo = (e: React.ChangeEvent<HTMLInputElement>, value: string): void => {
    if (value === 'nickname') {
      setMyNickname(e.target.value);
    }
    if (value === 'birthyear') {
      setMyBirthYear(Number(e.target.value));
    }
    if (value === 'gender') {
      setMyGender(e.target.value);
    }
  };

  const clearMyInfo = (value: string): void => {
    if (value === 'nickname') {
      if (myNickname === userInfo.nickname) {
        setMyNickname('');
      }
    }
    if (value === 'birthyear') {
      if (myBithYear === userInfo.age) {
        setMyBirthYear(0);
      }
    }
    if (value === 'gender') {
      if (myGender === userInfo.gender) {
        setMyGender('');
      }
    }
  };

  const saveInterestArrayFunc = (input: any): void => {
    if (myInterest.includes(input)) {
      setMyInterest(prev => prev.filter(item => item !== input));
      return;
    }
    setMyInterest(prev => [...prev, input]);
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
          <div className="margin-17px-758px" />
          <section id="edit-userinfo-profile">
            <ProfileBox profile={userInfo.profileImage}>
              <icons.Camera style={{ position: 'absolute', bottom: '0px', right: '0px', zIndex: 2 }} />
            </ProfileBox>
          </section>
          <section id="edit-userinfo-itemlist">
            <ItemBox>
              <heading.BodyBaseBold>닉네임</heading.BodyBaseBold>
              <InsertDiv>
                <StyledInput
                  value={myNickname}
                  onClick={() => {
                    clearMyInfo('nickname');
                  }}
                  onChange={e => {
                    saveMyInfo(e, 'nickname');
                  }}
                />
              </InsertDiv>
            </ItemBox>
            <TwoItemBox>
              <ItemDiv>
                <heading.BodyBaseBold>출생년도</heading.BodyBaseBold>
                <InsertDiv>
                  <StyledInput
                    type="number"
                    value={myBithYear === 0 ? '' : myBithYear}
                    onClick={() => {
                      clearMyInfo('birthyear');
                    }}
                    onChange={e => {
                      saveMyInfo(e, 'birthyear');
                    }}
                  />
                </InsertDiv>
              </ItemDiv>
              <ItemDiv>
                <heading.BodyBaseBold>성별</heading.BodyBaseBold>
                <InsertDiv>
                  <StyledInput
                    value={myGender}
                    onClick={() => {
                      clearMyInfo('gender');
                    }}
                    onChange={e => {
                      saveMyInfo(e, 'gender');
                    }}
                  />
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
          <div className="margin-17px-758px" />
          <section id="edit-userinfo-interest">
            <heading.BodyBaseBold>관심사</heading.BodyBaseBold>
            <InterestMatrixContainer>
              <InterestMatrix checkList={myInterest} onClick={saveInterestArrayFunc} columns={4} rows={3} />
            </InterestMatrixContainer>
          </section>
          <div className="margin-17px-758px" />
        </main>
      </ModalContainer>
    </>
  );
}

export default EditUserInfoModal;
