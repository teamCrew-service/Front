import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import type { MemberDetail, Schedule } from '../../../assets/interfaces';

import heading from '../../../styledComponent/heading';

import {
  CrewIntroQuestionContainer,
  DetailMenuLi,
  CrewInfoContext,
  SubTitle,
  SaveBtn,
  QuestionDiv,
  SeparateDiv,
  SeparateBar,
  BlockDiv,
} from '../../../pages/detail/styled';

import icons from '../../../assets/icons';
import colors from '../../../assets/styles/color';

import NoticeContent from '../../../pages/detail/nav/NoticeContent';
import ScheduleContent from '../../../pages/detail/nav/ScheduleContent';
import Chat from '../../../pages/detail/nav/Chat';
import ScheduleCard from '../ScheduleCard';
import MemberBox from '../MemberBox';
import Calendar from '../../common/calendar/Calendar';
import NoScheduleCard from '../NoScheduleCard';

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

const TestDiv = styled.div``;

function Long({
  crewInfo,
  infoOpen,
  closeInfoWindow,
  openInfoWindow,
  saveAddress,
  recentSchedule,
}: {
  crewInfo: MemberDetail;
  infoOpen: boolean;
  closeInfoWindow: () => void;
  openInfoWindow: () => void;
  saveAddress: (input: string) => void;
  recentSchedule: Schedule | null;
}): JSX.Element {
  const [page, setPage] = useState<string>('모임정보');
  const [showCalendarEvent, setShowCalendarEvent] = useState<boolean>(false);
  const [eventInfo, setEventInfo] = useState<Schedule | null>(null);

  const changePage = (goPage: string): void => {
    if (goPage !== '모임정보' && crewInfo?.personType === 'person') {
      alert('크루 멤버만 볼 수 있는 페이지 입니다.');
      return;
    }

    setPage(goPage);
  };
  const openCalendarEvent = (input: any): void => {
    setEventInfo(input);
    setShowCalendarEvent(true);
  };

  useEffect(() => {
    if (page === '모임정보') {
      console.log(recentSchedule);
      const staticMapContainer = document.getElementById('long-crew-staticMap');
      let coord;
      if (recentSchedule === null) {
        coord = new kakao.maps.LatLng(crewInfo.crew.crew_latitude, crewInfo.crew.crew_longtitude);
      } else {
        coord = new kakao.maps.LatLng(recentSchedule.scheduleLatitude, recentSchedule.scheduleLongitude);
      }
      const staticMapOption = {
        center: coord,
        level: 3,
        marker: {
          position: coord,
        },
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const staticMap = new kakao.maps.StaticMap(staticMapContainer, staticMapOption);
    }
  }, [page]);

  return (
    <>
      <nav id="detail-main-menu">
        <ul id="detail-main-menu-ul">
          {['모임정보', '공지', '일정', '크루챗'].map(item => {
            if (page === item) {
              return (
                <DetailMenuLi
                  key={item}
                  style={{ color: '#8569F4', borderBottom: '2px solid #8569F4', fontWeight: 600 }}
                >
                  <span style={{ translate: '0px 1px' }}>{item}</span>
                </DetailMenuLi>
              );
            }
            return (
              <DetailMenuLi
                key={item}
                onClick={() => {
                  changePage(item);
                }}
              >
                {item}
              </DetailMenuLi>
            );
          })}
        </ul>
      </nav>

      <section id="detail-main-content">
        {page === '모임정보' && (
          <>
            <div id="detail-main-content-crewinfo">
              <heading.TitleLargeBold>{crewInfo?.crew.crew_crewTitle}</heading.TitleLargeBold>
              <CrewInfoContext>
                <icons.users />
                <heading.BodySmallBold>
                  {crewInfo?.crew.crewAttendedMember}/{crewInfo?.crew.crew_crewMaxMember}
                </heading.BodySmallBold>
              </CrewInfoContext>
              <CrewInfoContext>
                <icons.CrewDuration />
                <heading.BodySmallBold style={{ display: 'flex', gap: '8px', color: `${colors.gray400}` }}>
                  모임이 생긴지<span style={{ color: `${colors.primary}` }}>{crewInfo?.createdCrewPeriod}</span>일
                </heading.BodySmallBold>
              </CrewInfoContext>
              <CrewInfoContext>
                <icons.MeetCount />
                <heading.BodySmallBold style={{ display: 'flex', gap: '8px', color: `${colors.gray400}` }}>
                  지난달 정모 횟수{' '}
                  <span style={{ color: `${colors.primary}` }}>
                    {crewInfo?.personType !== 'person' ? crewInfo?.schedule.length : 0}
                  </span>
                  번
                </heading.BodySmallBold>
              </CrewInfoContext>
            </div>

            <div id="detail-main-content-crewinfo-2">
              {/* 소개 */}
              <BlockDiv>
                <div id="detail-main-content-intro">
                  <SubTitle>
                    <heading.BodyLargeBold>소개</heading.BodyLargeBold>
                    {infoOpen ? (
                      <icons.chevronUp style={{ cursor: 'pointer' }} onClick={closeInfoWindow} />
                    ) : (
                      <icons.chevronDown style={{ cursor: 'pointer' }} onClick={openInfoWindow} />
                    )}
                  </SubTitle>
                </div>
                {/* 소개 - 접었다 피는 부분 */}
                {infoOpen && (
                  <div id="detail-main-content-context">
                    <CrewIntroQuestionContainer>
                      <QuestionDiv>
                        <heading.BodyLargeBold>
                          <span style={{ fontWeight: 700 }}>&middot;</span>&nbsp;&nbsp; 우리 모임 사람들의 특징은?
                        </heading.BodyLargeBold>
                        <heading.BodyBaseMedium>{crewInfo?.crew.crew_crewMemberInfo}</heading.BodyBaseMedium>
                      </QuestionDiv>
                      <QuestionDiv>
                        <heading.BodyLargeBold>&nbsp;&nbsp;&middot; 우리 모임 사람들의 연령대는?</heading.BodyLargeBold>
                        <heading.BodyBaseMedium>{crewInfo?.crew.crew_crewAgeInfo}</heading.BodyBaseMedium>
                      </QuestionDiv>
                    </CrewIntroQuestionContainer>
                    <SeparateDiv>
                      <SeparateBar />
                    </SeparateDiv>
                    <heading.BodyBaseMedium style={{ padding: '10px 0px' }}>
                      {crewInfo?.crew.crew_crewContent}
                    </heading.BodyBaseMedium>
                  </div>
                )}
              </BlockDiv>

              {/* 일정 */}
              {crewInfo?.personType !== 'person' && (
                <div id="detail-main-content-schedule">
                  <SubTitle>
                    <heading.BodyLargeBold>일정</heading.BodyLargeBold>
                    <heading.BodySmallBold
                      onClick={() => {
                        changePage('일정');
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      전체보기
                    </heading.BodySmallBold>
                  </SubTitle>
                  {recentSchedule !== null && <ScheduleCard crewInfo={crewInfo}>{recentSchedule}</ScheduleCard>}
                  {recentSchedule === null && <NoScheduleCard />}
                </div>
              )}

              {/* 위치 */}
              <BlockDiv>
                <SubTitle>
                  <heading.BodyLargeBold>위치</heading.BodyLargeBold>
                </SubTitle>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <icons.Mappin />
                    <div>
                      {/* 최근 일정이 없을 경우 : 크루 위치 표시 */}
                      {recentSchedule === null && (
                        <heading.BodyLargeBold>{crewInfo?.crew.crew_crewAddress}</heading.BodyLargeBold>
                      )}
                      {/* 최근 일정이 있을 경우 : 일정 위치 표시 */}
                      {recentSchedule !== null && (
                        <heading.BodyLargeBold>{recentSchedule.scheduleAddress}</heading.BodyLargeBold>
                      )}
                    </div>
                  </div>
                  <SaveBtn
                    onClick={() => {
                      saveAddress(crewInfo.crew.crew_crewAddress);
                    }}
                  >
                    <icons.Files />
                    <heading.BodySmallBold style={{ color: `${colors.point}` }}>주소 복사</heading.BodySmallBold>
                  </SaveBtn>
                </div>
                <TestDiv
                  id="long-crew-staticMap"
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '180px',
                    borderRadius: '4px',
                  }}
                  // eslint-disable-next-line react/jsx-no-comment-textnodes
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '0px',
                      left: '0px',
                      display: 'flex',
                      justifyContent: 'end',
                      width: '100%',
                      height: '100%',
                      zIndex: 1,
                    }}
                  />
                  <TestDiv
                    onClick={event => {
                      // ChildNode에는 어떤 형식의 Node든 다 올 수 있다.
                      const { nextSibling } = event.currentTarget;
                      // 타입 Narrowing
                      if (nextSibling instanceof HTMLElement) {
                        nextSibling.click();
                      }
                    }}
                    style={{ position: 'absolute', top: '4px', right: '4px', cursor: 'pointer', zIndex: 1 }}
                  >
                    <icons.MapCloseBtn />
                  </TestDiv>
                </TestDiv>
              </BlockDiv>

              {/* 캘린더 */}
              {crewInfo.personType !== 'person' && (
                <BlockDiv>
                  {crewInfo?.personType !== 'person' && (
                    <>
                      <SubTitle>
                        <heading.BodyLargeBold>캘린더</heading.BodyLargeBold>
                      </SubTitle>
                      <div style={{ position: 'relative', width: '100%', height: '322px' }}>
                        {/* 달력 이벤트 모달 */}
                        {showCalendarEvent && (
                          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                          <div
                            onClick={() => {
                              setShowCalendarEvent(false);
                            }}
                            style={{
                              position: 'absolute',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: '100%',
                              height: '100%',
                              top: '0px',
                              left: '0px',
                              backgroundColor: 'rgba(0,0,0,0.25)',
                            }}
                          >
                            <div
                              style={{
                                width: '50%',
                                height: '50%',
                                backgroundColor: 'white',
                              }}
                            >
                              <p>{eventInfo!.scheduleTitle}</p>
                              <p>{eventInfo!.scheduleContent}</p>
                            </div>
                          </div>
                        )}
                        {/* 달력 */}
                        <Calendar showEvent eventAction schedule={crewInfo.schedule} onClick={openCalendarEvent} />
                      </div>
                    </>
                  )}
                </BlockDiv>
              )}

              {/* 사진첩 */}
              {crewInfo.personType !== 'person' && (
                <BlockDiv>
                  <SubTitle>
                    <heading.BodyLargeBold>사진첩</heading.BodyLargeBold>
                    <heading.BodySmallBold style={{ cursor: 'pointer' }}>전체보기</heading.BodySmallBold>
                  </SubTitle>
                  <div style={{ display: 'flex', gap: '2%', width: '100%', aspectRatio: 5 }}>
                    <div style={{ width: '25%', height: '100%', border: '1px solid black' }}>사진첩</div>
                    <div style={{ width: '25%', height: '100%', border: '1px solid black' }}>사진첩</div>
                    <div style={{ width: '25%', height: '100%', border: '1px solid black' }}>사진첩</div>
                    <div style={{ width: '25%', height: '100%', border: '1px solid black' }}>사진첩</div>
                  </div>
                </BlockDiv>
              )}

              {/* 호스트 : 게스트만 보여주는 것 */}
              {crewInfo.personType === 'person' && (
                <BlockDiv>
                  <SubTitle>
                    <heading.BodyLargeBold>호스트</heading.BodyLargeBold>
                  </SubTitle>
                  <div>
                    <MemberBox
                      key={crewInfo.crew.captainId}
                      url={crewInfo.crew.captainProfileImage}
                      name={crewInfo.crew.captainNickname}
                      isHost
                    />
                  </div>
                </BlockDiv>
              )}

              {/* 참여중인 크루 : 멤버들에게 보여주는 것 */}
              {crewInfo.personType !== 'person' && (
                <BlockDiv>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1%' }}>
                    <heading.BodyLargeBold>참여중인 크루</heading.BodyLargeBold>
                    <heading.BodySmallBold style={{ color: `${colors.primary}` }}>
                      {crewInfo?.member.length}명 (호스트 제외)
                    </heading.BodySmallBold>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '7px' }}>
                    <MemberBox
                      key={crewInfo.crew.captainId}
                      url={crewInfo.crew.captainProfileImage}
                      name={crewInfo.crew.captainNickname}
                      isHost
                    />
                    {crewInfo?.member.map(person => (
                      <MemberBox
                        key={person.member_memberId}
                        url={person.users_profileImage}
                        name={person.users_nickname}
                      />
                    ))}
                  </div>
                </BlockDiv>
              )}
            </div>
          </>
        )}
        {page === '공지' && <NoticeContent crewInfo={crewInfo} />}
        {page === '일정' && <ScheduleContent crewInfo={crewInfo} />}
        {page === '크루챗' && <Chat />}
      </section>
    </>
  );
}

export default Long;
