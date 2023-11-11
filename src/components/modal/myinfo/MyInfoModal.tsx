import React, { useState } from 'react';
import { ModalContainer, ModalHeader } from '../common/styled';

import { TotalContainer, ShowBoxContainer, ShowBox } from './styled';

import icons from '../../../assets/icons';
import heading from '../../../styledComponent/heading';
import colors from '../../../assets/styles/color';

import type { MyPage } from '../../../assets/interfaces';

import warning from '../warning';

import './style.css';

function MyInfoModal({ userInfo, closeModal }: { userInfo: MyPage; closeModal: () => void }): JSX.Element {
  const [isOpenLogoutModal, setIsOpenLogoutModal] = useState<boolean>(false);
  const openLogoutModalFunc = (): void => {
    setIsOpenLogoutModal(true);
  };
  const closeLogoutModalFunc = (): void => {
    setIsOpenLogoutModal(false);
  };
  return (
    <ModalContainer style={{ backgroundColor: 'white', zIndex: 103 }}>
      {isOpenLogoutModal && (
        <warning.ExitWarning
          question={['로그아웃 하시겠습니까?']}
          executeText="로그아웃"
          closeModal={closeLogoutModalFunc}
        />
      )}
      <ModalHeader>
        <icons.chevronLeft onClick={closeModal} />
        <heading.BodyLargeBold>내 정보</heading.BodyLargeBold>
        <div style={{ width: '24px' }} />
      </ModalHeader>
      <main id="my-info-modal-main">
        <TotalContainer>
          <ShowBoxContainer>
            <heading.BodyBaseBold>이메일</heading.BodyBaseBold>
            <ShowBox>
              <heading.BodyLargeBold>{userInfo.user.email}</heading.BodyLargeBold>
            </ShowBox>
          </ShowBoxContainer>
          {userInfo.user.provider === 'kakao' && (
            <heading.BodySmallBold style={{ color: `${colors.primary}` }}>카카오톡 연동 계정</heading.BodySmallBold>
          )}
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <heading.BodyBaseBold onClick={openLogoutModalFunc} style={{ color: `${colors.errorRed}` }}>
              로그아웃
            </heading.BodyBaseBold>
            <heading.BodyBaseBold style={{ color: `${colors.gray400}`, textDecoration: 'underline' }}>
              회원 탈퇴
            </heading.BodyBaseBold>
          </div>
        </TotalContainer>
      </main>
    </ModalContainer>
  );
}

export default MyInfoModal;
