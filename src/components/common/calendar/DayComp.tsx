/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

interface Props {
  year: number;
  month: number;
  date: number;
  day: number;
  today: Date;
  eventDate?: Date[] | null;
  getDate?: boolean;
}

function DayComp({ year, month, date, day, today, eventDate = null, getDate = false }: Props): JSX.Element {
  const newDate = new Date(year, month, date);
  const check = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const hasEvent = (): boolean => {
    if (eventDate === null) return false;
    let result = false;
    // eslint-disable-next-line array-callback-return
    eventDate.map(event => {
      if (
        event.getFullYear() === newDate.getFullYear() &&
        event.getMonth() === newDate.getMonth() &&
        event.getDate() === newDate.getDate()
      ) {
        result = true;
      }
    });
    return result;
  };

  const onClick = getDate
    ? () => {
        console.log(newDate);
      }
    : () => {};

  // 오늘 이전 날짜
  if (newDate < check) {
    // 이벤트가 있는 날짜
    if (hasEvent()) {
      return (
        <div className="day" onClick={onClick}>
          <span style={{ color: '#DDDDDD', border: '1px solid #DDDDDD' }}>{date}</span>
        </div>
      );
    }
    return (
      <div className="day" onClick={onClick}>
        <span style={{ color: '#DDDDDD' }}>{date}</span>
      </div>
    );
  }

  // 이벤트가 있는 날짜
  if (hasEvent()) {
    return (
      <div className="day" onClick={onClick}>
        <span style={{ color: '#0A84FF', border: '2px solid #0A84FF' }}>{date}</span>
      </div>
    );
  }

  // 오늘 날짜
  if (newDate.getTime() === check.getTime()) {
    return (
      <div className="day" onClick={onClick}>
        <span style={{ backgroundColor: 'black', color: 'white' }}>{date}</span>
      </div>
    );
  }

  // 일요일
  if (day === 0) {
    return (
      <div className="day" onClick={onClick}>
        <span style={{ color: 'red' }}>{date}</span>
      </div>
    );
  }

  // 토요일
  if (day === 6) {
    return (
      <div className="day" onClick={onClick}>
        <span style={{ color: 'blue' }}>{date}</span>
      </div>
    );
  }

  return (
    <div className="day" onClick={onClick}>
      <span>{date}</span>
    </div>
  );
}

export default DayComp;
