import React, { useState } from 'react';
import styled from 'styled-components';
import reactTextareaAutosize from 'react-textarea-autosize';

import icons from '../../../assets/icons';
import heading from '../../../styledComponent/heading';

import './style.css';
import colors from '../../../assets/styles/color';

const ModalContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: white;
  padding: 0px 16px;
`;

const CloseBtn = styled.div`
  width: 24px;
  height: 24px;
`;

const TitleInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.14px;
  &:active {
    outline: none;
  }
  &::placeholder {
    color: ${colors.gray400};
  }
`;

const LocationDiv = styled.div``;

const DateContainer = styled.div`
  display: flex;
  width: fit-content;
  height: 100%;
  gap: 4px;
`;

const DateItem = styled.div`
  display: flex;
  width: fit-content;
  height: 24px;
  align-items: center;
  background-color: ${colors.gray200};
  padding: 2px 4px;
  border-radius: 4px;
`;

const ContentTextarea = styled(reactTextareaAutosize)`
  width: 100%;
  resize: none;
  border: none;
  outline: none;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.14px;
  &::placeholder {
    color: ${colors.gray400};
  }
`;

const ContainerDiv = styled.div`
  width: 100%;
  height: 100%;
  padding: 12px;
  border: 1px solid ${colors.primary};
  border-radius: 8px;
`;

const CountDiv = styled.div`
  width: fit-content;
  margin-left: auto;
`;

function CreateNoticeModal({ closeModal }: { closeModal: () => void }): JSX.Element {
  const [location, setLocation] = useState<string>('위치');
  const [contentTextCount, setContentTextCount] = useState<number>(0);
  return (
    <ModalContainer>
      <header id="create-notice-header">
        <CloseBtn onClick={closeModal}>
          <icons.close />
        </CloseBtn>
        <heading.BodyLargeBold>정모 공지</heading.BodyLargeBold>
        <heading.BodyBaseBold style={{ color: `${colors.gray400}` }}>완료</heading.BodyBaseBold>
      </header>
      <main>
        <section id="create-notice-main-title">
          <TitleInput autoFocus placeholder="제목(최대 20자)" maxLength={20} />
        </section>
        <section id="create-notice-main-location">
          <icons.Mappin />
          <LocationDiv
            onClick={() => {
              setLocation('위치');
            }}
          >
            <heading.BodyBaseMedium style={{ color: `${colors.gray400}` }}>{location}</heading.BodyBaseMedium>
          </LocationDiv>
        </section>
        <section id="create-notice-main-date">
          <heading.BodyBaseMedium>모임일</heading.BodyBaseMedium>
          <DateContainer>
            <DateItem>
              <heading.BodyBaseMedium>{`${new Date().getFullYear()}년 ${
                new Date().getMonth() + 1
              }월 ${new Date().getDate()}일`}</heading.BodyBaseMedium>
            </DateItem>
            <DateItem>
              <heading.BodyBaseMedium>8:00 PM</heading.BodyBaseMedium>
            </DateItem>
          </DateContainer>
        </section>
        <section id="create-notice-main-content">
          <ContainerDiv>
            <ContentTextarea
              onChange={event => {
                setContentTextCount(event.target.value.length);
              }}
              placeholder="공지 내용"
              maxLength={200}
            />
            <CountDiv>
              <heading.BodyBaseMedium style={{ color: `${colors.gray400}` }}>
                {contentTextCount}/200
              </heading.BodyBaseMedium>
            </CountDiv>
          </ContainerDiv>
        </section>
      </main>
    </ModalContainer>
  );
}

export default CreateNoticeModal;
