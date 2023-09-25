import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './style.css';
import ScheduleCard from '../../styledComponent/ScheduleCard';
import TitleLargeMedium from '../../styledComponent/heading/TitleLargeMedium';
import colors from '../../assets/styles/color';
import BodySmallBold from '../../styledComponent/heading/BodySmallBold';
import { notice } from '../../api';
import type { Notice as NoticeInterface } from '../../assets/interfaces';

const SmallImageDiv = styled.div<{ $URL: string }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-image: url(${props => props.$URL});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border: 1px solid black;
`;

function UpcomingSchedule(): JSX.Element {
  const currentDate = new Date();

  const [ScheduleList, setScheduleList] = useState<Partial<NoticeInterface[]>>([]);

  async function fetchData(): Promise<Partial<NoticeInterface[]>> {
    try {
      const noticeData = await notice.getUpcomingList();
      return noticeData;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  useEffect(() => {
    fetchData()
      .then(list => {
        setScheduleList(list);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const upcomingEvents = ScheduleList.filter(
    item => item?.isCanceled !== true && item?.noticeDDay != null && new Date(item.noticeDDay) > currentDate,
  );

  const completedEvents = ScheduleList.filter(
    item => item?.isCanceled !== true && item?.noticeDDay != null && new Date(item.noticeDDay) <= currentDate,
  );
  const canceledEvents = ScheduleList.filter(item => item?.isCanceled);
  const [selectedFilter, setSelectedFilter] = useState('All');

  let filteredEvents;
  if (selectedFilter === 'Upcoming') {
    filteredEvents = upcomingEvents;
  } else if (selectedFilter === 'Completed') {
    filteredEvents = completedEvents;
  } else if (selectedFilter === 'Canceled') {
    filteredEvents = canceledEvents;
  } else {
    filteredEvents = ScheduleList;
  }

  return (
    <main>
      <section style={{ marginTop: '14px', width: '100%' }}>
        <div className="sorting-button-container">
          <button
            type="button"
            className={selectedFilter === 'All' ? 'on' : 'off'}
            onClick={() => {
              setSelectedFilter('All');
            }}
          >
            <text className="_SegmentedPicker-option">All</text>
          </button>
          <button
            type="button"
            className={selectedFilter === 'Upcoming' ? 'on' : 'off'}
            onClick={() => {
              setSelectedFilter('Upcoming');
            }}
          >
            <text className="_SegmentedPicker-option">Upcoming</text>
          </button>
          <button
            type="button"
            className={selectedFilter === 'Completed' ? 'on' : 'off'}
            onClick={() => {
              setSelectedFilter('Completed');
            }}
          >
            <text className="_SegmentedPicker-option">Completed</text>
          </button>
          <button
            type="button"
            className={selectedFilter === 'Canceled' ? 'on' : 'off'}
            onClick={() => {
              setSelectedFilter('Canceled');
            }}
          >
            <text className="_SegmentedPicker-option">Canceled</text>
          </button>
        </div>
      </section>
      <section style={{ marginTop: '14px', width: '100%' }}>
        {filteredEvents.length !== 0 ? (
          filteredEvents.map(item => (
            <ScheduleCard style={{ margin: '12px 0px' }}>
              <div key={item?.noticeTitle}>
                {selectedFilter === 'All' && (
                  <div className="event-label">
                    {item?.isCanceled === true && <span>취소된 일정</span>}
                    {item?.isCanceled !== true &&
                      item?.noticeDDay != null &&
                      new Date(item.noticeDDay) > currentDate && <span>다가오는 일정</span>}
                    {item?.isCanceled !== true &&
                      item?.noticeDDay != null &&
                      new Date(item.noticeDDay) <= currentDate && <span>지난 일정</span>}
                  </div>
                )}
                <TitleLargeMedium>
                  {new Date(item?.noticeDDay as string).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long',
                  })}{' '}
                  {new Date(item?.noticeDDay as string).toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </TitleLargeMedium>
                <BodySmallBold style={{ color: `${colors.gray400}` }}>{item?.noticeTitle}</BodySmallBold>
                <div id="profile-list-box">
                  {item?.profileImage?.map(urlItem => <SmallImageDiv key={urlItem} $URL={urlItem} />)}
                </div>
              </div>
            </ScheduleCard>
          ))
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              color: `${colors.gray400}`,
            }}
          >
            <p style={{ fontWeight: 700, fontSize: '16px', lineHeight: '22px', letterSpacing: '-0.4px' }}>
              일정이 없습니다.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

export default UpcomingSchedule;
