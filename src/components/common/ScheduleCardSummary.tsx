import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useCalDate from '../../util/useCalDate';
import colors from '../../assets/styles/color';
import heading from '../../styledComponent/heading';
import ScheduleCardDiv from '../../styledComponent/ScheduleCardDiv';
import type { ComingDateSchedule } from '../../assets/interfaces';
import icons from '../../assets/icons';

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

const GoDiv = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  height: fit-content;
  border-radius: 50%;
  cursor: pointer;
`;

export default function ScheduleCardSummary({
  scheduleOne,
  cardRole = 'upcoming',
}: {
  scheduleOne?: ComingDateSchedule;
  cardRole?: string;
}): JSX.Element {
  const navigate = useNavigate();

  const goNextFunc =
    cardRole === 'upcoming'
      ? () => {
          navigate('/upcomingschedule');
        }
      : () => {
          navigate(`/detail/${scheduleOne?.schedule.crewId}`);
        };
  return (
    <ScheduleCardDiv>
      {/* section 1 */}
      <heading.BodySmallMedium
        style={{
          color: `${scheduleOne?.schedule.crewType === '장기' ? colors.primary : colors.point}`,
          display: 'flex',
          width: '100%',
          height: 'fit-content',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {scheduleOne?.schedule.crewType}
        <GoDiv onClick={goNextFunc}>
          <icons.chevronRight />
        </GoDiv>
      </heading.BodySmallMedium>

      {/* section 2 */}
      <heading.TitleLargeBold>
        {scheduleOne?.schedule.scheduleDDay !== undefined && useCalDate(new Date(scheduleOne.schedule.scheduleDDay))}
      </heading.TitleLargeBold>

      {/* section 3 */}
      <heading.BodySmallMedium style={{ color: `${colors.gray500}` }}>
        {scheduleOne?.schedule.scheduleTitle}
      </heading.BodySmallMedium>

      {/* section 4 */}
      <div id="profile-list-box">
        {scheduleOne?.profileImage.map(item => (
          <SmallImageDiv key={item.member_userId} $URL={item.member_profileImage} />
        ))}
      </div>
    </ScheduleCardDiv>
  );
}
