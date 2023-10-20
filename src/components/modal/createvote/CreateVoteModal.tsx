import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import reactTextareaAutosize from 'react-textarea-autosize';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Mousewheel } from 'swiper/modules';
import { useMutation } from 'react-query';

import './style.css';

import icons from '../../../assets/icons';
import heading from '../../../styledComponent/heading';
import colors from '../../../assets/styles/color';

import { voteDueDate, voteOptionList } from '../../../atoms/createvote';

import Calendar from '../../common/calendar/Calendar';
import { voteform } from '../../../api';
import type { MemberDetail, VoteInfo } from '../../../assets/interfaces';

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

const SelectedDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(116, 116, 128, 0.08);
`;

function CreateVoteModal({
  crewInfo,
  refetch,
  closeModal,
}: {
  crewInfo: MemberDetail;
  refetch: any;
  closeModal: () => void;
}): JSX.Element {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [showTimeList, setShowTimeList] = useState<boolean>(false);

  const [optionNumber, setOptionNumber] = useState<number>(2);

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [checkMultiVote, setCheckMultiVote] = useState<boolean>(false);
  const [checkAnonymousVote, setCheckAnonymousVote] = useState<boolean>(false);
  const [checkPossibleToPlusOption, setCheckPossibleToPlusOption] = useState<boolean>(false);

  const [optionList, setOptionList] = useRecoilState(voteOptionList);
  const [date, setDate] = useRecoilState(voteDueDate);

  const minutesList = [];
  for (let i = 0; i < 60; i += 1) {
    let item = String(i);
    if (String(i).length === 1) {
      item = `0${item}`;
    }
    minutesList.push(String(item));
  }

  const createVoteMutation = useMutation(
    async () => {
      const time = date.timeTable === 'PM' ? date.time! + 12 : date.time;
      const voteDueDateInfo = new Date(date.year!, date.month!, date.date!, time!, date.minutes!);
      const voteForm: VoteInfo = {
        voteFormTitle: title,
        voteFormContent: content,
        voteFormEndDate: voteDueDateInfo,
        multipleVotes: checkMultiVote,
        anonymousVote: checkAnonymousVote,
        voteFormOption1: optionList[0],
        voteFormOption2: optionList[1],
        voteFormOption3: optionList[2] ?? null,
        voteFormOption4: optionList[3] ?? null,
        voteFormOption5: optionList[4] ?? null,
      };
      const data = voteform.createVote(crewInfo.crew.crew_crewId, voteForm);
      return data;
    },
    {
      onSuccess: res => {
        console.log(res);
        refetch();
        closeModal();
      },
      onError: err => {
        console.log(err);
      },
    },
  );

  const saveOptionValue = (event: any, index: string): void => {
    const newOptionList = optionList.map(item => item);
    switch (index) {
      case '1':
        newOptionList[0] = event.target.value;
        break;
      case '2':
        newOptionList[1] = event.target.value;
        break;
      case '3':
        if (newOptionList[2] === undefined) {
          newOptionList.push(event.target.value);
          break;
        }
        newOptionList[2] = event.target.value;
        break;
      case '4':
        if (newOptionList[3] === undefined) {
          newOptionList.push(event.target.value);
          break;
        }
        newOptionList[3] = event.target.value;
        break;
      case '5':
        if (newOptionList[4] === undefined) {
          newOptionList.push(event.target.value);
          break;
        }
        newOptionList[4] = event.target.value;
        break;
      default:
        break;
    }
    setOptionList(newOptionList);
  };
  const deleteOptionValue = (optionIndex: string): void => {
    let newOptionList = optionList.map(item => item);
    switch (optionIndex) {
      case '3':
        newOptionList = optionList.filter((_, index) => index !== 2);
        break;
      case '4':
        newOptionList = optionList.filter((_, index) => index !== 3);
        break;
      case '5':
        newOptionList = optionList.filter((_, index) => index !== 4);
        break;
      default:
        break;
    }
    setOptionList(newOptionList);
  };

  const optionInputArray: number[] = [];
  for (let i = 0; i < optionNumber; i += 1) {
    optionInputArray.push(i + 1);
  }
  const increasePlusOptionNumber = (): void => {
    if (optionNumber < 5) {
      setOptionNumber(prev => prev + 1);
      return;
    }
    alert('추가 가능한 최대 옵션 개수는 5개입니다.');
  };

  const decreasePlusOptionNumber = (optionIndex: string): void => {
    deleteOptionValue(optionIndex);
    setOptionNumber(prev => prev - 1);
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

  const selectNoticeDate = (input: any): void => {
    setDate(input);
    setShowCalendar(false);
    setShowTimeList(true);
  };

  useEffect(
    () => () => {
      setOptionList(['', '']);
      setDate({ year: null, month: null, date: null, timeTable: '', time: null, minutes: null });
    },
    [],
  );

  return (
    <ModalContainer>
      <header id="create-vote-header">
        <icons.close onClick={closeModal} />
        <heading.BodyLargeBold>되는 시간 투표</heading.BodyLargeBold>
        <CompleteBtn
          disabled={
            title === '' || optionList[0] === '' || optionList[1] === '' || content === '' || date.timeTable === ''
          }
          onClick={() => {
            createVoteMutation.mutate();
          }}
        >
          완료
        </CompleteBtn>
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
        {optionInputArray.map(item => (
          <section className="create-vote-main-item">
            <ItemInput
              onChange={event => {
                saveOptionValue(event, String(item));
              }}
              placeholder={`옵션 ${item}`}
              value={optionList[item - 1] ?? ''}
            />
            {item > 2 && (
              <heading.BodyBaseBold
                onClick={() => {
                  decreasePlusOptionNumber(String(item));
                }}
              >
                -
              </heading.BodyBaseBold>
            )}
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
            <DateInsertBtn
              onClick={() => {
                setShowCalendar(true);
              }}
            >
              <heading.BodyBaseMedium>
                {date.year !== null
                  ? `${date.year}년 ${Number(date.month) + 1}월 ${date.date}일`
                  : `${new Date().getFullYear()}년 ${new Date().getMonth() + 1}월 ${new Date().getDate()}일`}
              </heading.BodyBaseMedium>
            </DateInsertBtn>
            <DateInsertBtn>
              <heading.BodyBaseMedium>
                {date.time}:{date.minutes} {date.timeTable}
              </heading.BodyBaseMedium>
            </DateInsertBtn>
          </DateInsertContainer>
        </section>
        {showCalendar && (
          <section id="create-notice-main-calendar">
            <Calendar setDate={selectNoticeDate} clickEvent showSelect selectedDate={date} showToday={false} />
          </section>
        )}
        {showTimeList && (
          <section id="create-notice-main-time-list">
            <Swiper
              centeredSlides
              mousewheel
              effect="coverflow"
              coverflowEffect={{ rotate: 7, stretch: 0, depth: 178, modifier: 3, slideShadows: false }}
              height={178}
              direction="vertical"
              slidesPerView={9}
              modules={[EffectCoverflow, Mousewheel]}
            >
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map(item => (
                <SwiperSlide key={item}>
                  {({ isActive }) =>
                    isActive ? (
                      <SelectedDiv
                        onClick={() => {
                          const newDate = { ...date, time: Number(item) };
                          setDate(newDate);
                        }}
                      >
                        {item}
                      </SelectedDiv>
                    ) : (
                      item
                    )
                  }
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper
              centeredSlides
              mousewheel
              effect="coverflow"
              coverflowEffect={{ rotate: 7, stretch: 0, depth: 178, modifier: 3, slideShadows: false }}
              height={178}
              direction="vertical"
              slidesPerView={9}
              modules={[EffectCoverflow, Mousewheel]}
            >
              {minutesList.map(item => (
                <SwiperSlide key={item}>
                  {({ isActive }) =>
                    isActive ? (
                      <SelectedDiv
                        onClick={() => {
                          const newDate = { ...date, minutes: Number(item) };
                          setDate(newDate);
                        }}
                      >
                        {item}
                      </SelectedDiv>
                    ) : (
                      item
                    )
                  }
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper
              centeredSlides
              mousewheel
              effect="coverflow"
              coverflowEffect={{ rotate: 7, stretch: 0, depth: 178, modifier: 3, slideShadows: false }}
              height={178}
              direction="vertical"
              slidesPerView={9}
              modules={[EffectCoverflow, Mousewheel]}
            >
              {['AM', 'PM'].map(item => (
                <SwiperSlide key={item}>
                  {({ isActive }) =>
                    isActive ? (
                      <SelectedDiv
                        onClick={() => {
                          const newDate = { ...date, timeTable: item };
                          setDate(newDate);
                          setShowTimeList(false);
                        }}
                      >
                        {item}
                      </SelectedDiv>
                    ) : (
                      item
                    )
                  }
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )}
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
