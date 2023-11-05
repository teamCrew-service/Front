import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import './style.css';
import { useNavigate } from 'react-router-dom';
import ScheduleCardSummary from '../../components/common/ScheduleCardSummary';
import { type ComingDateSchedule } from '../../assets/interfaces';
import icons from '../../assets/icons';
import heading from '../../styledComponent/heading';
import colors from '../../assets/styles/color';
import { schedule } from '../../api';

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

const ScheduleCardContainer = styled.div``;

function UpcomingSchedule(): JSX.Element {
  const navigate = useNavigate();
  const { data: scheduleList, isLoading } = useQuery('getWholeSchedule', schedule.getWholeSchedule, {
    onSuccess: res => {
      console.log(res);
    },
  });
  const [selected, setSelected] = useState<string>('다가오는');

  if (isLoading) {
    return <div>loading</div>;
  }

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
          {selected === '다가오는' &&
            scheduleList?.comingSchedule.map((item: ComingDateSchedule) => (
              <ScheduleCardContainer>
                <ScheduleCardSummary key={item.schedule.scheduleId} scheduleOne={item} cardRole="goDetail" />
              </ScheduleCardContainer>
            ))}
          {selected === '참여 완료' &&
            scheduleList?.participateSchedule.map((item: ComingDateSchedule) => (
              <ScheduleCardContainer>
                <ScheduleCardSummary key={item.schedule.scheduleId} scheduleOne={item} cardRole="goDetail" />
              </ScheduleCardContainer>
            ))}
        </section>
      </main>
    </>
  );
}

export default UpcomingSchedule;
