import React, { useState } from 'react';

import type { MemberDetail, Schedule } from '../../../assets/interfaces';

import TitleLargeBold from '../../../styledComponent/heading/TitleLargeBold';
import BodyLargeBold from '../../../styledComponent/heading/BodyLargeBold';
import BodyBaseMedium from '../../../styledComponent/heading/BodyBaseMedium';
import BodySmallBold from '../../../styledComponent/heading/BodySmallBold';
import CaptionXS from '../../../styledComponent/heading/CaptionXS';

import { DetailMenuLi, CrewInfoContext, SubTitle, SaveBtn } from '../../../pages/detail/styled';

import icons from '../../../assets/icons';
import colors from '../../../assets/styles/color';

import NoticeContent from '../../../pages/detail/nav/NoticeContent';
import ScheduleContent from '../../../pages/detail/nav/ScheduleContent';
import Chat from '../../../pages/detail/nav/Chat';
import ScheduleCard from '../ScheduleCard';
import MemberBox from '../MemberBox';
import Calendar from '../../common/calendar/Calendar';

function Long({
  crewInfo,
  infoOpen,
  closeInfoWindow,
  openInfoWindow,
  signUpCrew,
  saveAddress,
  recentSchedule,
}: {
  crewInfo: MemberDetail;
  infoOpen: boolean;
  closeInfoWindow: () => void;
  openInfoWindow: () => void;
  signUpCrew: any;
  saveAddress: (input: string) => void;
  recentSchedule: Schedule;
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
        {/* 모임정보 */}
        {page === '모임정보' && (
          <>
            <div id="detail-main-content-crewinfo">
              <TitleLargeBold>{crewInfo?.crew.crew_crewTitle}</TitleLargeBold>
              <CrewInfoContext>
                <icons.users />
                {crewInfo?.crew.crewAttendedMember}/{crewInfo?.crew.crew_crewMaxMember}
              </CrewInfoContext>
              <CrewInfoContext>
                <icons.CrewDuration />
                모임이 생긴지 <span style={{ fontWeight: 700 }}>{crewInfo?.createdCrewPeriod}</span>일
              </CrewInfoContext>
              <CrewInfoContext>
                <icons.MeetCount />
                지난달 정모 횟수{' '}
                <span style={{ fontWeight: 700 }}>
                  {crewInfo?.personType !== 'person' ? crewInfo?.schedule.length : 0}
                </span>
                번
              </CrewInfoContext>
            </div>

            {/* 소개 */}
            <div id="detail-main-content-intro">
              <SubTitle>
                <BodyLargeBold>소개</BodyLargeBold>
                {infoOpen ? (
                  <icons.chevronUp style={{ cursor: 'pointer' }} onClick={closeInfoWindow} />
                ) : (
                  <icons.chevronDown style={{ cursor: 'pointer' }} onClick={openInfoWindow} />
                )}
              </SubTitle>
            </div>
            {infoOpen && (
              <>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    borderBottom: '0.3px solid black',
                    padding: '10px 0px',
                  }}
                >
                  <div>
                    <BodyBaseMedium>&nbsp;&nbsp;&middot; 우리 모임 사람들의 특징은?</BodyBaseMedium>
                    <BodyBaseMedium>{crewInfo?.crew.crew_crewMemberInfo}</BodyBaseMedium>
                  </div>
                  <div>
                    <BodyBaseMedium>&nbsp;&nbsp;&middot; 우리 모임 사람들의 연령대는?</BodyBaseMedium>
                    <BodyBaseMedium>{crewInfo?.crew.crew_crewAgeInfo}</BodyBaseMedium>
                  </div>
                </div>
                <BodyBaseMedium style={{ padding: '10px 0px' }}>{crewInfo?.crew.crew_crewContent}</BodyBaseMedium>
              </>
            )}
            <div id="detail-main-content-schedule">
              {/* 일정 */}
              {crewInfo?.personType !== 'person' && recentSchedule !== null ? (
                <>
                  <SubTitle>
                    <BodyLargeBold>일정</BodyLargeBold>
                    <BodySmallBold
                      onClick={() => {
                        changePage('일정');
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      전체보기
                    </BodySmallBold>
                  </SubTitle>
                  <ScheduleCard crewInfo={crewInfo}>{recentSchedule}</ScheduleCard>
                </>
              ) : (
                <div>no schedule</div>
              )}

              {/* 위치 */}
              <SubTitle>
                <BodyLargeBold>위치</BodyLargeBold>
              </SubTitle>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <icons.Mappin />
                  <div>
                    <BodyLargeBold>{crewInfo?.crew.crew_crewAddress}</BodyLargeBold>
                    <CaptionXS>서울시 마포구 당인동 1</CaptionXS>
                  </div>
                </div>
                <SaveBtn
                  onClick={() => {
                    saveAddress(crewInfo.crew.crew_crewAddress);
                  }}
                >
                  <BodySmallBold style={{ color: `${colors.errorRed}` }}>주소 복사</BodySmallBold>
                </SaveBtn>
              </div>
              <div
                style={{
                  width: '100%',
                  aspectRatio: 2,
                  backgroundColor: `${colors.gray100}`,
                  borderRadius: '4px',
                }}
              >
                카카오 정적 맵
              </div>

              {/* 캘린더 */}
              {crewInfo?.personType !== 'person' && (
                <>
                  <SubTitle>
                    <BodyLargeBold>캘린더</BodyLargeBold>
                  </SubTitle>
                  <div style={{ position: 'relative', width: '100%', height: 'fit-content' }}>
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

              {/* 사진첩 */}
              <SubTitle>
                <BodyLargeBold>사진첩</BodyLargeBold>
                <BodySmallBold style={{ cursor: 'pointer' }}>전체보기</BodySmallBold>
              </SubTitle>
              <div style={{ display: 'flex', gap: '2%', width: '100%', aspectRatio: 5 }}>
                <div style={{ width: '25%', height: '100%', border: '1px solid black' }}>사진첩</div>
                <div style={{ width: '25%', height: '100%', border: '1px solid black' }}>사진첩</div>
                <div style={{ width: '25%', height: '100%', border: '1px solid black' }}>사진첩</div>
                <div style={{ width: '25%', height: '100%', border: '1px solid black' }}>사진첩</div>
              </div>

              <SubTitle>
                <BodyLargeBold>호스트</BodyLargeBold>
                <BodySmallBold style={{ cursor: 'pointer' }}>가입신청서</BodySmallBold>
              </SubTitle>
              <div>
                <MemberBox
                  key={crewInfo.crew.captainId}
                  url={crewInfo.crew.captainProfileImage}
                  name={crewInfo.crew.captainNickname}
                  address={crewInfo.crew.captainLocation}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1%' }}>
                <BodyLargeBold>참여자</BodyLargeBold>
                <BodySmallBold>{crewInfo?.member.length}명</BodySmallBold>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '7px' }}>
                {crewInfo?.member.map(person => (
                  <MemberBox
                    key={person.member_memberId}
                    url={person.users_profileImage}
                    name={person.users_nickname}
                    address={person.users_location}
                  />
                ))}
              </div>
              {crewInfo?.personType === 'person' && (
                <button
                  onClick={() => {
                    signUpCrew.mutate();
                  }}
                  type="button"
                >
                  가입하기
                </button>
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
