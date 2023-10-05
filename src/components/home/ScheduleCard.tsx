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

function ScheduleCard({
  scheduleList,
  scheduleOne,
  index,
}: {
  scheduleList?: ComingDateSchedule[];
  scheduleOne?: ComingDateSchedule;
  index?: number;
}): JSX.Element {
  const navigate = useNavigate();
  // scheduleList !== undefined : 홈에서 사용하는 comingDate
  // scheduleList === undefined : upcomingdate 에서 사용하는 컴포넌트
  const schedule: ComingDateSchedule = scheduleList === undefined ? scheduleOne! : scheduleList[index!];
  const goNextFunc =
    scheduleList === undefined
      ? () => {
          navigate(`/detail/${scheduleOne?.schedule.crewId}`);
        }
      : () => {
          navigate('/upcomingschedule', { state: { scheduleList } });
        };
  return (
    <ScheduleCardDiv>
      {/* section 1 */}
      <heading.BodySmallMedium
        style={{
          color: `${schedule.schedule.crewType === '장기' ? colors.primary : colors.point}`,
          display: 'flex',
          width: '100%',
          height: 'fit-content',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {schedule.schedule.crewType}
        <GoDiv onClick={goNextFunc}>
          <icons.chevronRight />
        </GoDiv>
      </heading.BodySmallMedium>

      {/* section 2 */}
      <heading.TitleLargeBold>
        {schedule.schedule.scheduleDDay !== undefined && useCalDate(new Date(schedule.schedule.scheduleDDay))}
      </heading.TitleLargeBold>

      {/* section 3 */}
      <heading.BodySmallMedium style={{ color: `${colors.gray500}` }}>
        {schedule.schedule.scheduleTitle}
      </heading.BodySmallMedium>

      {/* section 4 */}
      <div id="profile-list-box">
        {schedule.profileImage.map(item => (
          <SmallImageDiv key={item.member_userId} $URL={item.member_profileImage} />
        ))}
      </div>
    </ScheduleCardDiv>
  );
}

export default ScheduleCard;
