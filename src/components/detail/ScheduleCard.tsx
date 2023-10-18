import React from 'react';
import styled from 'styled-components';
import useCalDate from '../../util/useCalDate';
import icons from '../../assets/icons';
import colors from '../../assets/styles/color';
import heading from '../../styledComponent/heading';

import type { MemberDetail, Schedule } from '../../assets/interfaces';

import profile from '../../assets/images/profile.jpg';

const ScheduleDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  height: 236px;
  border-radius: 12px;
  background-color: ${colors.primary50};
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.16);
`;

const ImageDiv = styled.div`
  width: 28px;
  aspect-ratio: 1;
  border-radius: 50%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

function ScheduleCard({ children, crewInfo }: { children?: Schedule; crewInfo: MemberDetail }): JSX.Element {
  return (
    <ScheduleDiv>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <heading.BodyLargeBold>{children!.scheduleTitle}</heading.BodyLargeBold>
        <heading.CaptionXS style={{ color: `${colors.gray500}` }}>{children!.scheduleContent}</heading.CaptionXS>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <icons.Calendar />
          <heading.BodySmallMedium>{useCalDate(new Date(children!.scheduleDDay))}</heading.BodySmallMedium>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <icons.Location />
          <heading.BodySmallMedium>{children!.schedulePlaceName}</heading.BodySmallMedium>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <icons.users />
          <heading.BodySmallMedium>
            {children!.scheduleAttendedMember}/{crewInfo.crew.crew_crewMaxMember}{' '}
            <span style={{ color: '#FF453A' }}>
              ({crewInfo.crew.crew_crewMaxMember - Number(children!.scheduleAttendedMember)}자리 남음)
            </span>
          </heading.BodySmallMedium>
        </div>
      </div>
      <div style={{ display: 'inline-flex', alignItems: 'center' }}>
        <ImageDiv style={{ backgroundImage: `url(${profile})` }} />
        <ImageDiv style={{ translate: '-15%', backgroundImage: `url(${profile})` }} />
        <ImageDiv style={{ translate: '-30%', backgroundImage: `url(${profile})` }} />
        <ImageDiv style={{ translate: '-45%', backgroundImage: `url(${profile})` }} />
        <ImageDiv style={{ translate: '-60%', backgroundImage: `url(${profile})` }} />
        <div style={{ translate: '-45%' }}>
          <heading.BodySmallMedium style={{ color: `${colors.gray500}` }}>&#43;1</heading.BodySmallMedium>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <button type="button" style={{ backgroundColor: 'black', padding: '12px 24px', borderRadius: '8px' }}>
          <heading.BodyBaseBold style={{ color: 'white' }}>참여하기</heading.BodyBaseBold>
        </button>
      </div>
    </ScheduleDiv>
  );
}

export default ScheduleCard;
