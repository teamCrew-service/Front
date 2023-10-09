import React, { useState } from 'react';
import styled from 'styled-components';
import './style.css';
import { useLocation, useNavigate } from 'react-router-dom';
import ScheduleCard from '../../components/home/ScheduleCard';
import { type ComingDateSchedule } from '../../assets/interfaces';
import icons from '../../assets/icons';
import heading from '../../styledComponent/heading';
import colors from '../../assets/styles/color';

const StyledUl = styled.ul`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0px 16px;
  border-bottom: 1px solid ${colors.gray100};
`;

const StyledLi = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 100%;
  color: ${colors.gray400};
`;

const SelectedLi = styled(StyledLi)`
  color: ${colors.primary};
  border-bottom: 2px solid ${colors.primary};
  translate: 0px 1px;
`;

function UpcomingSchedule(): JSX.Element {
  const navigate = useNavigate();
  const { scheduleList } = useLocation().state;
  const [selected, setSelected] = useState<string>('다가오는');

  return (
    <>
      <header id="upcomingschedule-header">
        <icons.chevronLeft
          onClick={() => {
            navigate('/home');
          }}
        />
        <heading.BodyLargeBold>내 일정</heading.BodyLargeBold>
        <div style={{ width: '24px', height: '24px' }} />
      </header>
      <nav id="upcomingschedule-nav">
        <StyledUl>
          {['다가오는', '참여 완료'].map(item => {
            if (item === selected) {
              return (
                <SelectedLi key={item}>
                  <heading.BodyBaseMedium>{item}</heading.BodyBaseMedium>
                </SelectedLi>
              );
            }
            return (
              <StyledLi
                onClick={() => {
                  setSelected(item);
                }}
                key={item}
              >
                <heading.BodyBaseMedium>{item}</heading.BodyBaseMedium>
              </StyledLi>
            );
          })}
        </StyledUl>
      </nav>
      <main>
        <section id="upcomingschedule-schedule-list">
          {scheduleList.map((item: ComingDateSchedule) => (
            <ScheduleCard key={item.schedule.scheduleId} scheduleOne={item} />
          ))}
        </section>
      </main>
    </>
  );
}

export default UpcomingSchedule;
