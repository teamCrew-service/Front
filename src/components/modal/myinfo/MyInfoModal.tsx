import React from 'react';
import { ModalContainer, ModalHeader } from '../common/styled';

import icons from '../../../assets/icons';
import heading from '../../../styledComponent/heading';
import colors from '../../../assets/styles/color';

import type { MyPage } from '../../../assets/interfaces';

import './style.css';

function MyInfoModal({ userInfo, closeModal }: { userInfo: MyPage; closeModal: () => void }): JSX.Element {
  return (
    <ModalContainer style={{ backgroundColor: 'white', zIndex: 103 }}>
      <ModalHeader>
        <icons.chevronLeft onClick={closeModal} />
        <heading.BodyLargeBold>내 정보</heading.BodyLargeBold>
        <div style={{ width: '24px' }} />
      </ModalHeader>
      <main id="my-info-modal-main">
        <div>{userInfo.user.email}</div>
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '19px',
          }}
        >
          {userInfo.user.provider === 'kakao' && (
            <heading.BodySmallBold style={{ color: `${colors.primary}` }}>카카오톡 연동 계정</heading.BodySmallBold>
          )}
          <heading.BodyBaseBold style={{ color: `${colors.gray500}`, textDecoration: 'underline' }}>
            회원 탈퇴
          </heading.BodyBaseBold>
        </div>
      </main>
    </ModalContainer>
  );
}

export default MyInfoModal;
