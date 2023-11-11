import React, { useState } from 'react';
import styled from 'styled-components';
// import { useMutation } from 'react-query';

import { ModalContainer, ModalHeader } from '../common/styled';

import icons from '../../../assets/icons';
import heading from '../../../styledComponent/heading';
import colors from '../../../assets/styles/color';

import './style.css';

import type { MyInfo, MyTopic } from '../../../assets/interfaces';
import SearchModal from '../SearchModal';
import InterestMatrix from '../../common/InterestMatrix';

import warning from '../warning';

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
  gap: 10px;
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
const ClickDiv = styled.div`
  display: flex;
  width: 100%;
  height: 63.16%;
  gap: 4px;
  padding: 4px;
  border-radius: 6px;
  background-color: ${colors.gray100};
`;

const ClickItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 4px;
`;
const SelectedClickItem = styled(ClickItem)`
  background-color: ${colors.primary100};
  color: ${colors.primary};
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

const EditButton = styled.button`
  background-color: white;
  border: none;
  color: ${colors.primary};
  &:disabled {
    color: ${colors.gray500};
  }
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
  // 위치 검색 모달 관련 상태
  const [isOpenSearchModal, setIsOpenSearchModal] = useState<boolean>(false);

  // 경고창 모달
  const [isOpenWarningModal, setIsOpenWarningModal] = useState<boolean>(false);

  // 변경된 프로필 내용 관련 상태들
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

  const openWarningModalFunc = (): void => {
    setIsOpenWarningModal(true);
  };
  const closeWaringModalFunc = (): void => {
    setIsOpenWarningModal(false);
  };

  const saveMyInfo = (e: React.ChangeEvent<HTMLInputElement>, value: string): void => {
    if (value === 'nickname') {
      setMyNickname(e.target.value);
    }
    if (value === 'birthyear') {
      setMyBirthYear(Number(e.target.value));
    }
  };

  const saveMyContent = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    if (e.target.value.length <= 200) {
      setMyIntro(e.target.value);
      return;
    }
    alert('200자를 넘겼습니다!');
  };

  const saveMyGender = (gender: string): void => {
    setMyGender(gender);
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
      <ModalContainer style={{ backgroundColor: 'white', zIndex: 103 }}>
        {isOpenWarningModal && (
          <warning.EditProfile
            closeModal={closeWaringModalFunc}
            exitModal={() => {
              closeWaringModalFunc();
              closeModal();
            }}
          />
        )}
        <ModalHeader>
          <icons.chevronLeft onClick={openWarningModalFunc} />
          <heading.BodyLargeBold>프로필 수정하기</heading.BodyLargeBold>
          <EditButton>
            <heading.BodyBaseBold>완료</heading.BodyBaseBold>
          </EditButton>
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
                    onChange={e => {
                      saveMyInfo(e, 'birthyear');
                    }}
                  />
                </InsertDiv>
              </ItemDiv>
              <ItemDiv>
                <heading.BodyBaseBold>성별</heading.BodyBaseBold>
                <ClickDiv>
                  {['남성', '여성'].map(item => {
                    if (myGender === item) {
                      return (
                        <SelectedClickItem key={item}>
                          <heading.BodyLargeBold>{item}</heading.BodyLargeBold>
                        </SelectedClickItem>
                      );
                    }
                    return (
                      <ClickItem
                        key={item}
                        onClick={() => {
                          saveMyGender(item);
                        }}
                      >
                        <heading.BodyLargeBold>{item}</heading.BodyLargeBold>
                      </ClickItem>
                    );
                  })}
                </ClickDiv>
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
                <StyledTextarea value={myIntro} onChange={saveMyContent} />
                <heading.BodyBaseMedium style={{ color: `${colors.gray400}` }}>
                  {myIntro.length}/200
                </heading.BodyBaseMedium>
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
