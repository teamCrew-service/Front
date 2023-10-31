import React, { useState } from 'react';

import type { MemberDetail, Schedule, VoteCreateInfo, VoteResultInfo } from '../../../../assets/interfaces';

import heading from '../../../../styledComponent/heading';

import { DetailMenuLi, CrewInfoContext, SubTitle, BlockDiv } from '../../../../pages/detail/styled';

import icons from '../../../../assets/icons';
import colors from '../../../../assets/styles/color';

import NoticeContent from './nav/NoticeContent';
import ScheduleContent from './nav/ScheduleContent';
import Chat from './nav/Chat';
import ScheduleCard from '../../ScheduleCard';
import Calendar from '../../../common/calendar/Calendar';
import NoScheduleCard from '../../NoScheduleCard';
import Location from '../../role/Location';
import CrewIntro from '../../role/CrewIntro';
import GuestView from '../../role/GuestView';
import MemberView from '../../role/MemberView';
import {
  RecentScheduleContainer,
  ContentContainer,
  DetailInfoContainer,
  LongNavContainer,
  LongNavItem,
  SummaryInfoContainer,
  CalendarContainer,
} from '../../../../layouts/detail/detail-layout';
import CalendarEventModal from '../../../modal/CalendarEventModal';

function Long({
  page,
  changePage,
  crewInfo,
  saveAddress,
  recentSchedule,
  openNoticeDetailModal,
  openVoteDetailModal,
  openVoteResultModal,
}: {
  page: string;
  changePage: (input: string) => void;
  crewInfo: MemberDetail;
  saveAddress: (input: string) => void;
  recentSchedule: Schedule | null;
  openNoticeDetailModal: (input: string) => void;
  openVoteDetailModal: (input: VoteCreateInfo) => void;
  openVoteResultModal: (input: VoteResultInfo) => void;
}): JSX.Element {
  const [showCalendarEvent, setShowCalendarEvent] = useState<boolean>(false);
  const [eventInfo, setEventInfo] = useState<Schedule | null>(null);

  const openCalendarEvent = (input: any): void => {
    setEventInfo(input);
    setShowCalendarEvent(true);
  };

  const closeCalendarEvent = (): void => {
    setShowCalendarEvent(false);
  };

  return (
    <>
      <LongNavContainer>
        <LongNavItem>
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
        </LongNavItem>
      </LongNavContainer>

      <ContentContainer>
        {page === '모임정보' && (
          <>
            <SummaryInfoContainer>
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
            </SummaryInfoContainer>

            <DetailInfoContainer>
              <CrewIntro
                crewMemberInfo={crewInfo.crew.crew_crewMemberInfo}
                crewAgeInfo={crewInfo.crew.crew_crewAgeInfo}
                crewContent={crewInfo.crew.crew_crewContent}
              />

              {crewInfo?.personType !== 'person' && (
                <RecentScheduleContainer>
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
                </RecentScheduleContainer>
              )}

              {/* 위치 */}
              <Location crewInfo={crewInfo} recentSchedule={recentSchedule} saveAddress={saveAddress} />

              {/* 캘린더 */}
              {crewInfo.personType !== 'person' && (
                <BlockDiv>
                  <SubTitle>
                    <heading.BodyLargeBold>캘린더</heading.BodyLargeBold>
                  </SubTitle>
                  <CalendarContainer>
                    {/* 달력 이벤트 모달 */}
                    {showCalendarEvent && (
                      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                      <CalendarEventModal closeModal={closeCalendarEvent} eventInfo={eventInfo} />
                    )}
                    {/* 달력 */}
                    <Calendar showEvent eventAction schedule={crewInfo.schedule} onClick={openCalendarEvent} />
                  </CalendarContainer>
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
              {crewInfo.personType === 'person' && <GuestView crewInfo={crewInfo} />}

              {/* 참여중인 크루 : 멤버들에게 보여주는 것 */}
              {crewInfo.personType !== 'person' && <MemberView crewInfo={crewInfo} />}

              {/* 크루 가입 버튼에 가리는 부분 제거하기 위해 추가 */}
              {crewInfo.personType === 'person' && <div style={{ height: '34px' }} />}
            </DetailInfoContainer>
          </>
        )}
        {page === '공지' && (
          <NoticeContent
            crewInfo={crewInfo}
            openNoticeDetailModal={openNoticeDetailModal}
            openVoteDetailModal={openVoteDetailModal}
            openVoteResultModal={openVoteResultModal}
          />
        )}
        {page === '일정' && <ScheduleContent crewInfo={crewInfo} />}
        {page === '크루챗' && <Chat />}
      </ContentContainer>
    </>
  );
}

export default Long;
