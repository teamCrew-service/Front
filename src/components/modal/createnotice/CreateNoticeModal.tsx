import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import reactTextareaAutosize from 'react-textarea-autosize';
import { useMutation } from 'react-query';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Mousewheel } from 'swiper/modules';
import icons from '../../../assets/icons';
import heading from '../../../styledComponent/heading';

import './style.css';
import colors from '../../../assets/styles/color';
import SearchModal from '../SearchModal';

import { noticeContent, noticeDate, noticeLocation, noticeLatLng, noticeTitle } from '../../../atoms/createnotice';
import Calendar from '../../common/calendar/Calendar';
import { noitce } from '../../../api';

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

const LocationDiv = styled.div`
  width: 100%;
  height: 100%;
`;

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

const SelectedDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(116, 116, 128, 0.08);
`;

function CreateNoticeModal({ crewId, closeModal }: { crewId: string; closeModal: () => void }): JSX.Element {
  const [title, setTitle] = useRecoilState(noticeTitle);
  const [location, setLocation] = useRecoilState(noticeLocation);
  const [latLng, setLatLng] = useRecoilState(noticeLatLng);
  const [date, setDate] = useRecoilState(noticeDate);
  const [context, setContext] = useRecoilState(noticeContent);

  const [openSearchLocationModal, setOpenSearchLocationModal] = useState<boolean>(false);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [showTimeList, setShowTimeList] = useState<boolean>(false);

  const minutesList = [];
  for (let i = 0; i < 60; i += 1) {
    let item = String(i);
    if (String(i).length === 1) {
      item = `0${item}`;
    }
    minutesList.push(String(item));
  }

  const closeSearchModal = (result: any): void => {
    if (result !== undefined) {
      setLocation(result.address_name);
      setLatLng({
        lat: result.y,
        lng: result.x,
      });
    }
    setOpenSearchLocationModal(false);
  };

  const selectNoticeDate = (input: any): void => {
    setDate(input);
    setShowCalendar(false);
    setShowTimeList(true);
  };

  const createNotice = useMutation(
    async () => {
      const time = date.timeTable === '오전' ? date.time : date.time! + 12;
      const data = {
        noticeTitle: title,
        noticeContent: context,
        noticeAddress: location,
        noticeDDay: new Date(date.year!, date.month!, date.date!, time!, date.minutes!),
        noticeLatitude: Number(latLng!.lat),
        noticeLongitude: Number(latLng!.lng),
      };
      const result = noitce.createNotice(crewId, data);
      return result;
    },
    {
      onSuccess: res => {
        alert(res.message);
      },
      onError: err => {
        console.log(err);
      },
    },
  );

  useEffect(
    // clean up
    () => () => {
      setTitle('');
      setLocation('');
      setDate({ year: null, month: null, date: null, timeTable: '', time: null, minutes: null });
      setContext('');
    },
    [],
  );

  return (
    <>
      {openSearchLocationModal && <SearchModal title="지역 위치" closeModal={closeSearchModal} />}
      <ModalContainer>
        <header id="create-notice-header">
          <CloseBtn onClick={closeModal}>
            <icons.close />
          </CloseBtn>
          <heading.BodyLargeBold>정모 공지</heading.BodyLargeBold>
          <CompleteBtn
            disabled={title === '' || location === '' || date.year === null || date.timeTable === '' || context === ''}
            onClick={() => {
              createNotice.mutate();
            }}
          >
            <heading.BodyBaseBold>완료</heading.BodyBaseBold>
          </CompleteBtn>
        </header>
        <main>
          <section id="create-notice-main-title">
            <TitleInput
              autoFocus
              placeholder="제목(최대 20자)"
              maxLength={20}
              value={title}
              onChange={e => {
                setTitle(e.target.value);
              }}
            />
          </section>
          <section id="create-notice-main-location">
            <icons.Mappin />
            <LocationDiv
              onClick={() => {
                setOpenSearchLocationModal(true);
              }}
            >
              <heading.BodyBaseMedium>
                {location === '' ? <span style={{ color: `${colors.gray400}` }}>위치</span> : location}
              </heading.BodyBaseMedium>
            </LocationDiv>
          </section>
          <section id="create-notice-main-date">
            <heading.BodyBaseMedium>모임일</heading.BodyBaseMedium>
            <DateContainer
              onClick={() => {
                setShowCalendar(true);
              }}
            >
              <DateItem>
                <heading.BodyBaseMedium>
                  {date.year !== null
                    ? `${date.year}년 ${Number(date.month) + 1}월 ${date.date}일`
                    : `${new Date().getFullYear()}년 ${new Date().getMonth() + 1}월 ${new Date().getDate()}일`}
                </heading.BodyBaseMedium>
              </DateItem>
              <DateItem>
                <heading.BodyBaseMedium>
                  {date.time}:{date.minutes} {date.timeTable}
                </heading.BodyBaseMedium>
              </DateItem>
            </DateContainer>
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
          <section id="create-notice-main-content">
            <ContainerDiv>
              <ContentTextarea
                onChange={event => {
                  setContext(event.target.value);
                }}
                placeholder="공지 내용"
                maxLength={200}
                value={context}
              />
              <CountDiv>
                <heading.BodyBaseMedium style={{ color: `${colors.gray400}` }}>
                  {context.length}/200
                </heading.BodyBaseMedium>
              </CountDiv>
            </ContainerDiv>
          </section>
        </main>
      </ModalContainer>
    </>
  );
}

export default CreateNoticeModal;
