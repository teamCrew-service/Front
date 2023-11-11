import React, { useState, useRef } from 'react';
// import { useMutation } from 'react-query';

import { ModalContainer, ModalHeader } from '../common/styled';

import icons from '../../../assets/icons';
import heading from '../../../styledComponent/heading';
import colors from '../../../assets/styles/color';

import './style.css';

import type { EditProfile, MyInfo, MyTopic } from '../../../assets/interfaces';
import SearchModal from '../SearchModal';
import InterestMatrix from '../../common/InterestMatrix';

import warning from '../warning';

import useResizeImage from '../../../util/useResizeImage';

import {
  EditButton,
  ProfileBox,
  ItemDiv,
  ItemBox,
  InsertDiv,
  StyledInput,
  TwoItemBox,
  ClickDiv,
  SelectedClickItem,
  ClickItem,
  IntroBox,
  IntroInsertDiv,
  StyledTextarea,
  InterestMatrixContainer,
} from './styled';
import { mypage } from '../../../api';

function EditUserInfoModal({
  userInfo,
  userInterest,
  closeModal,
  refetch,
}: {
  userInfo: MyInfo;
  userInterest: MyTopic[];
  closeModal: () => void;
  refetch: any;
}): JSX.Element {
  // 경고창 모달
  const [isOpenWarningModal, setIsOpenWarningModal] = useState<boolean>(false);
  const openWarningModalFunc = (): void => {
    setIsOpenWarningModal(true);
  };
  const closeWaringModalFunc = (): void => {
    setIsOpenWarningModal(false);
  };

  // 위치 검색 모달 관련 상태
  const [isOpenSearchModal, setIsOpenSearchModal] = useState<boolean>(false);
  // 위치
  const [myLocation, setMyLocation] = useState<string>(userInfo.location);
  const openSearchModalFunc = (): void => {
    setIsOpenSearchModal(true);
  };
  const closeSearchModalFunc = (result: any): void => {
    if (result !== undefined) {
      setMyLocation(result.place_name);
    }
    setIsOpenSearchModal(false);
  };

  // 닉네임
  const [myNickname, setMyNickname] = useState<string>(userInfo.nickname);
  // 출생년도
  const [myBithYear, setMyBirthYear] = useState<number>(userInfo.age);
  const saveMyInfo = (e: React.ChangeEvent<HTMLInputElement>, value: string): void => {
    if (value === 'nickname') {
      setMyNickname(e.target.value);
    }
    if (value === 'birthyear') {
      setMyBirthYear(Number(e.target.value));
    }
  };

  // 소개글
  const [myIntro, setMyIntro] = useState<string>(userInfo.myMessage);
  const saveMyContent = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    if (e.target.value.length <= 200) {
      setMyIntro(e.target.value);
      return;
    }
    alert('200자를 넘겼습니다!');
  };

  // 성별
  const [myGender, setMyGender] = useState<string>(userInfo.gender);
  const saveMyGender = (gender: string): void => {
    setMyGender(gender);
  };

  // 관심사
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
  const saveInterestArrayFunc = (input: any): void => {
    if (myInterest.includes(input)) {
      setMyInterest(prev => prev.filter(item => item !== input));
      return;
    }
    setMyInterest(prev => [...prev, input]);
  };

  // 프로필
  const [profile, setProfile] = useState<{ url: string; file: any }>({ url: userInfo.profileImage, file: null });
  const profileURL = useRef<string>(userInfo.profileImage);
  // file에서 부터 url 추출
  const readURL = (file: File): void => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result === null) return;
      if (typeof reader.result === 'string') {
        profileURL.current = reader.result;
      }
    };
    reader.readAsDataURL(file);
  };
  // 이미지 변환 시 작동하는 함수
  const changeProfile = (): void => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    fileInput.addEventListener('change', () => {
      if (fileInput.files === null) return;
      readURL(fileInput.files[0]);
      useResizeImage(fileInput.files[0]).then((res: Blob) => {
        console.log(res);
        setProfile({ url: profileURL.current, file: res });
      });
    });
    fileInput.click();
  };

  // 프로필 수정 api
  const sendChangedValue = (): void => {
    const interestTopic = myInterest.reduce((acc, curr) => `${acc},${curr}`);
    const sendData: EditProfile = {
      editUserInfoDto: {
        nickname: myNickname,
        age: myBithYear,
        gender: myGender,
        myMessage: myIntro,
        location: myLocation,
      },
      editTopicDto: {
        interestTopic,
      },
    };
    console.log('data = ', sendData);
    mypage.editUserInfo(profile.file, sendData).then(
      data => {
        console.log(data);
        refetch();
        closeModal();
      },
      error => {
        console.log(error);
      },
    );
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
          <EditButton onClick={sendChangedValue}>
            <heading.BodyBaseBold>완료</heading.BodyBaseBold>
          </EditButton>
        </ModalHeader>
        <main id="edit-userinfo-main">
          <div className="margin-17px-758px" />
          <section id="edit-userinfo-profile">
            <ProfileBox profile={profile.url}>
              <icons.Camera
                onClick={changeProfile}
                style={{ position: 'absolute', bottom: '0px', right: '0px', zIndex: 2 }}
              />
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
