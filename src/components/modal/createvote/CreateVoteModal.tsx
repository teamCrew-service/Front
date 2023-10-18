import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import reactTextareaAutosize from 'react-textarea-autosize';

import './style.css';

import icons from '../../../assets/icons';
import heading from '../../../styledComponent/heading';
import colors from '../../../assets/styles/color';

import { voteContent, voteTitle } from '../../../atoms/createvote';

const ModalContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 2;
`;

const CompleteBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: 24px;
  border: none;
  padding: 8px;
  background: none;
  color: ${colors.primary};
  &:disabled {
    color: ${colors.gray400};
  }
`;

const ItemInput = styled.input`
  width: 100%;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.14px;
  border: none;
  &:active {
    outline: none;
  }
  &::placeholder {
    color: ${colors.gray400};
  }
`;

const PlusOptionBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const VoteTypeContainer = styled.div`
  width: 100%;
  height: 33.33%;
`;

const VoteTypeDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 73.33%;
`;

const UnCheckedBox = styled.div`
  height: 100%;
  aspect-ratio: 1;
  border: 1px solid ${colors.gray500};
  border-radius: 3px;
`;

const CheckedBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  aspect-ratio: 1;
  border-radius: 3px;
`;

const DateInsertContainer = styled.div`
  display: flex;
  width: fit-content;
  height: fit-content;
  gap: 4px;
`;

const DateInsertBtn = styled.div`
  width: fit-content;
  height: fit-content;
  background-color: ${colors.gray200};
  padding: 2px 4px;
  border-radius: 4px;
`;

const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  padding: 12px;
  border: 1px solid ${colors.primary};
  border-radius: 8px;
`;

// 공지 생성 모달과 중복
const VoteContentTextarea = styled(reactTextareaAutosize)`
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

function CreateVoteModal({ closeModal }: { closeModal: () => void }): JSX.Element {
  const [plusOptionNumber, setPlusOptionNumber] = useState<number>(3);
  const [checkMultiVote, setCheckMultiVote] = useState<boolean>(false);
  const [checkAnonymousVote, setCheckAnonymousVote] = useState<boolean>(false);
  const [checkPossibleToPlusOption, setCheckPossibleToPlusOption] = useState<boolean>(false);

  const [title, setTitle] = useRecoilState(voteTitle);
  const [content, setContent] = useRecoilState(voteContent);

  const addtionalOptionInputArray = [];
  for (let i = 0; i < plusOptionNumber - 3; i += 1) {
    addtionalOptionInputArray.push(i + 3);
  }
  const increasePlusOptionNumber = (): void => {
    if (plusOptionNumber <= 5) {
      setPlusOptionNumber(prev => prev + 1);
      return;
    }
    alert('추가 가능한 최대 옵션 개수는 5개입니다.');
  };

  const decreasePlusOptionNumber = (): void => {
    setPlusOptionNumber(prev => prev - 1);
  };

  const checkVoteOption = (input: string): void => {
    if (input === '다중 투표') {
      setCheckMultiVote(prev => !prev);
    }
    if (input === '익명 투표') {
      setCheckAnonymousVote(prev => !prev);
    }
    if (input === '새로운 옵션 추가 가능') {
      setCheckPossibleToPlusOption(prev => !prev);
    }
  };
  return (
    <ModalContainer>
      <header id="create-vote-header">
        <icons.close onClick={closeModal} />
        <heading.BodyLargeBold>되는 시간 투표</heading.BodyLargeBold>
        <CompleteBtn>완료</CompleteBtn>
      </header>
      <main id="create-vote-main">
        <div className="create-vote-margin-12-758" />
        <section className="create-vote-main-item">
          <ItemInput
            autoFocus
            placeholder="제목"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
            }}
          />
        </section>
        <div className="create-vote-margin-24-758" />
        <section className="create-vote-main-item">
          <ItemInput placeholder="옵션 1" />
        </section>
        <section className="create-vote-main-item">
          <ItemInput placeholder="옵션 2" />
        </section>
        {addtionalOptionInputArray.map(item => (
          <section className="create-vote-main-item">
            <ItemInput placeholder={`옵션 ${item}`} />
            <heading.BodyBaseBold onClick={decreasePlusOptionNumber}>-</heading.BodyBaseBold>
          </section>
        ))}
        <section className="create-vote-main-item">
          <PlusOptionBtn onClick={increasePlusOptionNumber}>
            <icons.plus />
            <heading.BodyBaseBold>옵션 추가</heading.BodyBaseBold>
          </PlusOptionBtn>
        </section>
        <div className="create-vote-margin-12-758" />
        <section id="create-vote-main-type-select">
          {/* 다중 투표  */}
          <VoteTypeContainer>
            <VoteTypeDiv
              onClick={() => {
                checkVoteOption('다중 투표');
              }}
            >
              {checkMultiVote ? (
                <CheckedBox>
                  <icons.CheckBox width="100%" height="100%" />
                </CheckedBox>
              ) : (
                <UnCheckedBox />
              )}
              <heading.BodyBaseMedium>다중 투표</heading.BodyBaseMedium>
            </VoteTypeDiv>
            <div className="create-vote-margin-8-90" />
          </VoteTypeContainer>

          {/* 익명 투표 */}
          <VoteTypeContainer>
            <VoteTypeDiv
              onClick={() => {
                checkVoteOption('익명 투표');
              }}
            >
              {checkAnonymousVote ? (
                <CheckedBox>
                  <icons.CheckBox width="100%" height="100%" />
                </CheckedBox>
              ) : (
                <UnCheckedBox />
              )}
              <heading.BodyBaseMedium>익명 투표</heading.BodyBaseMedium>
            </VoteTypeDiv>
            <div className="create-vote-margin-8-90" />
          </VoteTypeContainer>

          {/* 새로운 옵션 추가 가능 */}
          <VoteTypeContainer>
            <VoteTypeDiv
              onClick={() => {
                checkVoteOption('새로운 옵션 추가 가능');
              }}
            >
              {checkPossibleToPlusOption ? (
                <CheckedBox>
                  <icons.CheckBox width="100%" height="100%" />
                </CheckedBox>
              ) : (
                <UnCheckedBox />
              )}
              <heading.BodyBaseMedium>새로운 옵션 추가 가능</heading.BodyBaseMedium>
            </VoteTypeDiv>
            <div className="create-vote-margin-8-90" />
          </VoteTypeContainer>
        </section>
        <section className="create-vote-main-item">
          <heading.BodyBaseMedium>마감 기간</heading.BodyBaseMedium>
          <DateInsertContainer>
            <DateInsertBtn>
              <heading.BodyBaseMedium>
                {new Date().getFullYear()}년 {new Date().getMonth() + 1}월 {new Date().getDate()}일
              </heading.BodyBaseMedium>
            </DateInsertBtn>
            <DateInsertBtn>
              <heading.BodyBaseMedium>8:00 PM</heading.BodyBaseMedium>
            </DateInsertBtn>
          </DateInsertContainer>
        </section>
        <div className="create-vote-margin-24-758" />
        <section id="create-vote-main-content">
          <TextAreaContainer>
            <VoteContentTextarea
              onChange={e => {
                setContent(e.target.value);
              }}
              placeholder="공지 내용"
              maxLength={200}
            />
            <div style={{ color: `${colors.gray400}`, marginLeft: 'auto' }}>
              <heading.BodyBaseMedium>{content.length}/200</heading.BodyBaseMedium>
            </div>
          </TextAreaContainer>
        </section>
      </main>
    </ModalContainer>
  );
}

export default CreateVoteModal;
