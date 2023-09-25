/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import type { Schedule } from '../../../assets/interfaces';

interface Props {
  year: number;
  month: number;
  date: number;
  day: number;
  today: Date;
  showEvent?: boolean;
  schedule?: Schedule[] | null;
  eventAction?: boolean;
  onClick?: () => void;
  eventHandler?: (input: any) => void;
}

function DayComp({
  year,
  month,
  date,
  day,
  today,
  // 이벤트 날짜 표시 유/무
  showEvent = false,
  // 이벤트 날짜 입력 값
  schedule = null,
  // 날짜 컴포넌트 클릭 시 실행되는 함수
  onClick = () => {},
  // 이벤트 표시 부분 클릭 시 함수 실행 여부
  eventAction = false,
  // 이벤트 표시 부분 클릭 시 실행되는 함수
  eventHandler = () => {},
}: Props): JSX.Element {
  const newDate = new Date(year, month, date);
  const check = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  // 이벤트 표시 함수
  const hasEvent = (): { result: boolean; eventSchedule: any } => {
    let result = false;
    let eventSchedule: any = '';
    if (schedule === null) return { result, eventSchedule };

    // eslint-disable-next-line array-callback-return
    schedule.map(item => {
      if (
        new Date(item.scheduleDDay).getFullYear() === newDate.getFullYear() &&
        new Date(item.scheduleDDay).getMonth() === newDate.getMonth() &&
        new Date(item.scheduleDDay).getDate() === newDate.getDate()
      ) {
        eventSchedule = item;
        result = true;
      }
    });
    return { result, eventSchedule };
  };

  // 오늘 이전 날짜
  if (newDate < check) {
    // 이벤트가 있는 날짜
    if (showEvent && hasEvent().result) {
      return (
        <div
          className="day"
          onClick={
            eventAction
              ? () => {
                  eventHandler(hasEvent().eventSchedule);
                }
              : onClick
          }
        >
          <span style={{ color: '#DDDDDD', border: '1px solid #DDDDDD', cursor: 'pointer' }}>{date}</span>
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
  if (showEvent && hasEvent().result) {
    return (
      <div
        className="day"
        onClick={
          eventAction
            ? () => {
                eventHandler(hasEvent().eventSchedule);
              }
            : onClick
        }
      >
        <span style={{ color: '#0A84FF', border: '2px solid #0A84FF', cursor: 'pointer' }}>{date}</span>
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
