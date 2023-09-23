/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import type { MemberDetail, Schedule } from '../../assets/interfaces';

import ScheduleCard from './ScheduleCard';

function ScheduleContent({ crewInfo }: { crewInfo: MemberDetail }): JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
        gap: '10px',
      }}
    >
      {crewInfo.schedule.map((item: Schedule, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <ScheduleCard key={index + 1} crewInfo={crewInfo}>
          {item}
        </ScheduleCard>
      ))}
    </div>
  );
}

export default ScheduleContent;
