import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './style.css';
import ScheduleCard from '../../styledComponent/ScheduleCard';
import HeadLineParagraph from '../../styledComponent/heading/HeadLineParagraph';
import colors from '../../assets/styles/color';
import Body3Paragraph from '../../styledComponent/heading/Body3Paragrpah';

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

  const ScheduleList: Array<{
    noticeTitle: string;
    noticeDDay: Date;
    UrlList: Array<{ number: number; url: string }>;
    isCanceled: boolean;
  }> = [
    {
      noticeTitle: 'Future Event 1',
      noticeDDay: new Date(new Date().getTime() + 86400000),
      UrlList: [
        { number: 1, url: '' },
        { number: 2, url: '' },
        { number: 3, url: '' },
        { number: 4, url: '' },
        { number: 5, url: '' },
      ],
      isCanceled: false,
    },
    {
      noticeTitle: 'Past Event 1',
      noticeDDay: new Date(new Date().getTime() - 86400000),
      UrlList: [
        { number: 1, url: '' },
        { number: 2, url: '' },
        { number: 3, url: '' },
        { number: 4, url: '' },
        { number: 5, url: '' },
      ],
      isCanceled: false,
    },
    {
      noticeTitle: 'Canceled Event 1',
      noticeDDay: new Date(new Date().getTime() + 10000),
      UrlList: [
        { number: 1, url: '' },
        { number: 2, url: '' },
        { number: 3, url: '' },
        { number: 4, url: '' },
        { number: 5, url: '' },
      ],
      isCanceled: true,
    },
  ];

  const upcomingEvents = ScheduleList.filter(item => !item.isCanceled && item.noticeDDay > currentDate);
  const completedEvents = ScheduleList.filter(item => !item.isCanceled && item.noticeDDay <= currentDate);
  const canceledEvents = ScheduleList.filter(item => item.isCanceled);
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

  useEffect(() => {
    const cookie = window.location.href.split('token=')[1];
    if (cookie !== undefined) {
      document.cookie = `authorization=${cookie};path=/`;
    }
  }, []);

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
        {filteredEvents.map(item => (
          <ScheduleCard style={{ margin: '12px 0px' }}>
            <div key={item.noticeTitle}>
              {selectedFilter === 'All' && (
                <div className="event-label">
                  {item.isCanceled && <span>취소된 일정</span>}
                  {!item.isCanceled && item.noticeDDay > currentDate && <span>다가오는 일정</span>}
                  {!item.isCanceled && item.noticeDDay <= currentDate && <span>지난 일정</span>}
                </div>
              )}
              <HeadLineParagraph>
                {item.noticeDDay.toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long',
                })}{' '}
                {item.noticeDDay.toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </HeadLineParagraph>
              <Body3Paragraph style={{ color: `${colors.Gray500}` }}>{item.noticeTitle}</Body3Paragraph>
              <div id="profile-list-box">
                {item.UrlList.map(urlItem => (
                  <SmallImageDiv key={urlItem.number} $URL={urlItem.url} />
                ))}
              </div>
            </div>
          </ScheduleCard>
        ))}
      </section>
    </main>
  );
}

export default UpcomingSchedule;
