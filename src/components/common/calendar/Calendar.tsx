/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState } from 'react';
import './style.css';
import DayComp from './DayComp';
import type { Schedule } from '../../../assets/interfaces';

function Calendar({ schedule }: { schedule: Schedule[] }): JSX.Element {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  // 달 이동 시 리랜더링 되도록 설정
  const nextMonth = (): void => {
    setMonth(prevMonth => {
      if (prevMonth === 11) {
        setYear(prevYear => prevYear + 1);
        return 0;
      }
      return prevMonth + 1;
    });
  };
  const prevMonth = (): void => {
    setMonth(prevMonth => {
      if (prevMonth === 0) {
        setYear(prevYear => prevYear - 1);
        return 11;
      }
      return prevMonth - 1;
    });
  };

  // 달별 이름 설정 및 달별 총 날짜 결정
  let dayCount = 31;
  let currentMonth;
  switch (month + 1) {
    case 2:
      currentMonth = 'Feb';
      if (year % 4 === 0) {
        if (year % 100 === 0) {
          if (year % 400 === 0) {
            dayCount = 29;
            break;
          }
          dayCount = 28;
          break;
        }
        dayCount = 29;
        break;
      }
      dayCount = 28;
      break;
    case 3:
      currentMonth = 'Mar';
      break;
    case 4:
      currentMonth = 'Apr';
      dayCount = 30;
      break;
    case 5:
      currentMonth = 'May';
      break;
    case 6:
      currentMonth = 'Jun';
      dayCount = 30;
      break;
    case 7:
      currentMonth = 'Jul';
      break;
    case 8:
      currentMonth = 'Aug';
      break;
    case 9:
      currentMonth = 'Sep';
      dayCount = 30;
      break;
    case 10:
      currentMonth = 'Oct';
      break;
    case 11:
      currentMonth = 'Nov';
      dayCount = 30;
      break;
    case 12:
      currentMonth = 'Dec';
      break;
    default:
      currentMonth = 'Jan';
      break;
  }

  // 달력에 날짜 찍기
  const startDate = new Date(year, month, 1);
  const startDay = startDate.getDay();
  const calendarArray = new Array(30).fill('');
  for (let i = 1, j = startDay; i <= dayCount; i += 1, j += 1) {
    const day = new Date(year, month, i).getDay();
    calendarArray[j] = { date: i, day };
  }

  // const eventDate = [new Date(2023, 8, 4), new Date(2023, 8, 11), new Date(2023, 8, 19)];
  const eventDate = schedule.map(item => new Date(item.scheduleDDay));

  return (
    <section id="calendar-container">
      <div id="calendar">
        <div id="year">
          <div onClick={prevMonth} style={{ cursor: 'pointer' }}>
            &lt;
          </div>
          <span>
            {currentMonth}&nbsp;&nbsp;{year}
          </span>
          <div onClick={nextMonth} style={{ cursor: 'pointer' }}>
            &gt;
          </div>
        </div>
        <ul id="day-list">
          <li style={{ color: 'red' }}>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li style={{ color: 'blue' }}>Sat</li>
        </ul>
        <div id="date-list">
          {calendarArray.map((item, index) => {
            if (item === '') return <div key={index} />;
            return (
              <DayComp
                key={index}
                year={year}
                month={month}
                date={item.date}
                day={item.day}
                today={today}
                eventDate={eventDate}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Calendar;
