/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom';

import { crew } from '../../api';

import icons from '../../assets/icons';
import colors from '../../assets/styles/color';

import './style.css';
import BodyLargeBold from '../../styledComponent/heading/BodyLargeBold';
import TitleLargeBold from '../../styledComponent/heading/TitleLargeBold';
import BodySmallBold from '../../styledComponent/heading/BodySmallBold';
import NoticeContent from './NoticeContent';
import CaptionXS from '../../styledComponent/heading/CaptionXS';
import Calendar from '../../components/common/calendar/Calendar';
import BodyBaseMedium from '../../styledComponent/heading/BodyBaseMedium';
import { DetailMenuLi, CrewInfoContext, SubTitle, SaveBtn } from './styled';

import MemberBox from './MemberBox';
import ScheduleContent from './ScheduleContent';
import Chat from './Chat';
import ScheduleCard from './ScheduleCard';
import type { Schedule } from '../../assets/interfaces';

function Detail(): JSX.Element {
  const [page, setPage] = useState<string>('모임정보');
  // 소개 부분 접었다 펴기
  const [infoOpen, setInfoOpen] = useState<boolean>(true);
  const [showCalendarEvent, setShowCalendarEvent] = useState<boolean>(false);

  const [eventInfo, setEventInfo] = useState<Schedule | null>(null);

  const { id } = useParams();

  const findRecentEvent = (sorted: Schedule[]): any => {
    const today = new Date();
    // eslint-disable-next-line array-callback-return, consistent-return
    for (let i = 0; i < sorted.length; i += 1) {
      if (new Date(sorted[i].scheduleDDay).getTime() > today.getTime()) {
        return sorted[i];
      }
    }
    return null;
  };

  const {
    status,
    data: crewInfo,
    refetch,
  } = useQuery(
    'crewDetail',
    async () => {
      const result = await crew.getDetail(id!);
      if (result.personType !== 'person') {
        const sortedArray = result.schedule.sort(
          (a, b) => new Date(a.scheduleDDay).getTime() - new Date(b.scheduleDDay).getTime(),
        );
        const recentSchedule = findRecentEvent(sortedArray);
        return { result, recentSchedule };
      }
      return { result };
    },
    {
      onSuccess: res => {
        console.log(res);
      },
      refetchOnWindowFocus: false,
    },
  );

  const signUpCrew = useMutation(
    async () => {
      const result = await crew.signUp(crewInfo!.result.crew.crew_crewId);
      return result;
    },
    {
      onSuccess: async res => {
        console.log(res);
        await refetch();
      },
      onError: (error: any) => {
        alert(error.response.data.message);
      },
    },
  );

  const changePage = (goPage: string): void => {
    if (goPage !== '모임정보' && crewInfo?.result.personType === 'person') {
      alert('크루 멤버만 볼 수 있는 페이지 입니다.');
      return;
    }

    setPage(goPage);
  };

  const openInfoWindow = (): void => {
    setInfoOpen(true);
  };

  const closeInfoWindow = (): void => {
    setInfoOpen(false);
  };

  const openCalendarEvent = (input: any): void => {
    setEventInfo(input);
    setShowCalendarEvent(true);
  };

  const saveAddress = (address: string): void => {
    navigator.clipboard
      .writeText(address)
      .then(() => {
        console.log('paste success');
      })
      .catch(() => {});
  };

  if (status === 'loading') {
    return <div>loading...</div>;
  }

  if (status === 'error') {
    return <div>somthing wrong!</div>;
  }

  return (
    <>
      {/* 헤더 */}
      <header id="detail-header">
        <Link to="/findcrew">
          <icons.chevronLeft />
        </Link>
        <BodyLargeBold>{crewInfo?.result.crew.crew_crewType}</BodyLargeBold>
        <div style={{ width: '24px', height: '24px' }} />
      </header>
      <main id="detail-main">
        {/* 썸네일 */}
        <section
          id="detail-main-thumbnail"
          style={{
            backgroundImage: `url(${crewInfo?.result.crew.crew_thumbnail})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* 메뉴 */}
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

        {/* 메인 콘텐츠 */}
        <section id="detail-main-content">
          {/* 모임정보 */}
          {page === '모임정보' && (
            <>
              <div id="detail-main-content-crewinfo">
                <TitleLargeBold>{crewInfo?.result.crew.crew_crewTitle}</TitleLargeBold>
                <CrewInfoContext>
                  <icons.users />
                  {crewInfo?.result.crew.crewAttendedMember}/{crewInfo?.result.crew.crew_crewMaxMember}
                </CrewInfoContext>
                <CrewInfoContext>
                  <icons.CrewDuration />
                  모임이 생긴지 <span style={{ fontWeight: 700 }}>{crewInfo?.result.createdCrewPeriod}</span>일
                </CrewInfoContext>
                <CrewInfoContext>
                  <icons.MeetCount />
                  지난달 정모 횟수{' '}
                  <span style={{ fontWeight: 700 }}>
                    {crewInfo?.result.personType !== 'person' ? crewInfo?.result.schedule.length : 0}
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
                      <BodyBaseMedium>{crewInfo?.result.crew.crew_crewMemberInfo}</BodyBaseMedium>
                    </div>
                    <div>
                      <BodyBaseMedium>&nbsp;&nbsp;&middot; 우리 모임 사람들의 연령대는?</BodyBaseMedium>
                      <BodyBaseMedium>{crewInfo?.result.crew.crew_crewAgeInfo}</BodyBaseMedium>
                    </div>
                  </div>
                  <BodyBaseMedium style={{ padding: '10px 0px' }}>
                    {crewInfo?.result.crew.crew_crewContent}
                  </BodyBaseMedium>
                </>
              )}
              <div id="detail-main-content-schedule">
                {/* 일정 */}
                {crewInfo?.result.personType !== 'person' && crewInfo?.recentSchedule !== null ? (
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
                    <ScheduleCard crewInfo={crewInfo!.result}>{crewInfo!.recentSchedule}</ScheduleCard>
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
                      <BodyLargeBold>{crewInfo?.result.crew.crew_crewAddress}</BodyLargeBold>
                      <CaptionXS>서울시 마포구 당인동 1</CaptionXS>
                    </div>
                  </div>
                  <SaveBtn
                    onClick={() => {
                      saveAddress(crewInfo!.result.crew.crew_crewAddress);
                    }}
                  >
                    <BodySmallBold style={{ color: `${colors.errorRed}` }}>주소 복사</BodySmallBold>
                  </SaveBtn>
                </div>
                <div
                  style={{ width: '100%', aspectRatio: 2, backgroundColor: `${colors.gray100}`, borderRadius: '4px' }}
                >
                  카카오 정적 맵
                </div>

                {/* 캘린더 */}
                {crewInfo?.result.personType !== 'person' && (
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
                      <Calendar schedule={crewInfo!.result.schedule} onClick={openCalendarEvent} />
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
                    key={crewInfo!.result.crew.captainId}
                    url={crewInfo!.result.crew.captainProfileImage}
                    name={crewInfo!.result.crew.captainNickname}
                    address={crewInfo!.result.crew.captainLocation}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1%' }}>
                  <BodyLargeBold>참여자</BodyLargeBold>
                  <BodySmallBold>{crewInfo?.result.member.length}명</BodySmallBold>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '7px' }}>
                  {crewInfo?.result.member.map(person => (
                    <MemberBox
                      key={person.member_memberId}
                      url={person.users_profileImage}
                      name={person.users_nickname}
                      address={person.users_location}
                    />
                  ))}
                </div>
                {crewInfo?.result.personType === 'person' && (
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
          {page === '공지' && <NoticeContent crewInfo={crewInfo!.result} />}
          {page === '일정' && <ScheduleContent crewInfo={crewInfo!.result} />}
          {page === '크루챗' && <Chat />}
        </section>
      </main>
      <footer style={{ position: 'relative', width: '100%', border: '1px solid black' }}>
        {page === '일정' && (
          <button
            type="button"
            style={{
              position: 'absolute',
              top: '-74px',
              right: '21px',
              width: '48px',
              aspectRatio: 1,
              borderRadius: '50%',
              backgroundColor: `${colors.primary}`,
              border: 'none',
              color: 'white',
            }}
          >
            &#43;
          </button>
        )}
        {page === '공지' && (
          <button
            type="button"
            style={{
              position: 'absolute',
              top: '-74px',
              right: '21px',
              width: '48px',
              aspectRatio: 1,
              borderRadius: '50%',
              backgroundColor: `${colors.primary}`,
              border: 'none',
              color: 'white',
            }}
          >
            &#43;
          </button>
        )}
      </footer>
    </>
  );
}

export default Detail;
