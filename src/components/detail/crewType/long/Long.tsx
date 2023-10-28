import React, { useState } from 'react';

import type { MemberDetail, Schedule, VoteCreateInfo, VoteResultInfo } from '../../../../assets/interfaces';

import heading from '../../../../styledComponent/heading';

import {
  CrewIntroQuestionContainer,
  DetailMenuLi,
  CrewInfoContext,
  SubTitle,
  QuestionDiv,
  SeparateDiv,
  SeparateBar,
  BlockDiv,
} from '../../../../pages/detail/styled';

import icons from '../../../../assets/icons';
import colors from '../../../../assets/styles/color';

import NoticeContent from './nav/NoticeContent';
import ScheduleContent from './nav/ScheduleContent';
import Chat from './nav/Chat';
import ScheduleCard from '../../ScheduleCard';
import MemberBox from '../../MemberBox';
import Calendar from '../../../common/calendar/Calendar';
import NoScheduleCard from '../../NoScheduleCard';
import Location from '../../role/Location';

function Long({
  page,
  changePage,
  crewInfo,
  infoOpen,
  closeInfoWindow,
  openInfoWindow,
  saveAddress,
  recentSchedule,
  openNoticeDetailModal,
  openVoteDetailModal,
  openVoteResultModal,
}: {
  page: string;
  changePage: (input: string) => void;
  crewInfo: MemberDetail;
  infoOpen: boolean;
  closeInfoWindow: () => void;
  openInfoWindow: () => void;
  saveAddress: (input: string) => void;
  recentSchedule: Schedule | null;
  openNoticeDetailModal: (input: string) => void;
  openVoteDetailModal: (input: VoteCreateInfo) => void;
  openVoteResultModal: (input: VoteResultInfo) => void;
}): JSX.Element {
  const [showHostInfo, setShowHostInfo] = useState<boolean>(false);
  const [showCalendarEvent, setShowCalendarEvent] = useState<boolean>(false);
  const [eventInfo, setEventInfo] = useState<Schedule | null>(null);

  const openCalendarEvent = (input: any): void => {
    setEventInfo(input);
    setShowCalendarEvent(true);
  };

  const showHostInfoFunc = (): void => {
    setShowHostInfo(prev => !prev);
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
                        <heading.BodyLargeBold>&middot;&nbsp;&nbsp; 우리 모임 사람들의 특징은?</heading.BodyLargeBold>
                        <heading.BodyBaseMedium>{crewInfo?.crew.crew_crewMemberInfo}</heading.BodyBaseMedium>
                      </QuestionDiv>
                      <QuestionDiv>
                        <heading.BodyLargeBold>&middot;&nbsp;&nbsp; 우리 모임 사람들의 연령대는?</heading.BodyLargeBold>
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
              <Location crewInfo={crewInfo} recentSchedule={recentSchedule} saveAddress={saveAddress} />

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
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <MemberBox
                      key={crewInfo.crew.captainId}
                      url={crewInfo.crew.captainProfileImage}
                      name={crewInfo.crew.captainNickname}
                      isHost
                      crewType={crewInfo.crew.crew_crewType}
                    />
                    {showHostInfo ? (
                      <icons.chevronUp onClick={showHostInfoFunc} />
                    ) : (
                      <icons.chevronDown onClick={showHostInfoFunc} />
                    )}
                  </div>
                  {showHostInfo && (
                    <div>
                      <p>{crewInfo.crew.captainLocation}</p>
                      <p>{crewInfo.crew.captainMessage}</p>
                      <p>{new Date().getFullYear() - crewInfo.crew.captainAge + 1}세</p>
                      {crewInfo.captainTopics.map(item => (
                        <p>{item}</p>
                      ))}
                    </div>
                  )}
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
                      crewType={crewInfo.crew.crew_crewType}
                    />
                    {crewInfo?.member.map(person => (
                      <MemberBox
                        key={person.member_memberId}
                        url={person.users_profileImage}
                        name={person.users_nickname}
                        crewType={crewInfo.crew.crew_crewType}
                      />
                    ))}
                  </div>
                </BlockDiv>
              )}
            </div>
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
      </section>
    </>
  );
}

export default Long;
