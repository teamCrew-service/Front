import React, { useState } from 'react';
import styled from 'styled-components';
import type { MemberDetail, Schedule } from '../../../../../assets/interfaces';

import ScheduleCard from '../../../ScheduleCard';
import colors from '../../../../../assets/styles/color';
import BodySmallBold from '../../../../../styledComponent/heading/BodySmallBold';

const StyledLi = styled.li`
  border-radius: 200px;
  padding: 4px 8px;
  background-color: ${colors.gray200};
`;

function ScheduleContent({ crewInfo }: { crewInfo: MemberDetail }): JSX.Element {
  const [selected, setSelected] = useState<string>('전체');
  const changeSelectedHandler = (input: string): void => {
    setSelected(input);
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '16px',
        gap: '16px',
      }}
    >
      <nav style={{ width: '100%' }}>
        <ul style={{ display: 'flex', gap: '2.36%' }}>
          {['전체', '예정된 일정', '종료된 일정'].map(item => {
            if (item === selected) {
              return (
                <StyledLi key={item} style={{ backgroundColor: `${colors.primary}` }}>
                  <BodySmallBold style={{ color: 'white' }}>{item}</BodySmallBold>
                </StyledLi>
              );
            }
            return (
              <StyledLi
                key={item}
                onClick={() => {
                  changeSelectedHandler(item);
                }}
              >
                <BodySmallBold>{item}</BodySmallBold>
              </StyledLi>
            );
          })}
        </ul>
      </nav>
      {selected === '전체' &&
        crewInfo.schedule.map((item: Schedule, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <ScheduleCard key={index + 1} crewInfo={crewInfo}>
            {item}
          </ScheduleCard>
        ))}
      {selected === '예정된 일정' &&
        // eslint-disable-next-line array-callback-return, consistent-return
        crewInfo.schedule.map((item: Schedule, index) => {
          if (new Date(item.scheduleDDay).getTime() >= new Date().getTime()) {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <ScheduleCard key={index + 1} crewInfo={crewInfo}>
                {item}
              </ScheduleCard>
            );
          }
        })}
      {selected === '종료된 일정' &&
        // eslint-disable-next-line array-callback-return, consistent-return
        crewInfo.schedule.map((item: Schedule, index) => {
          if (new Date(item.scheduleDDay).getTime() < new Date().getTime()) {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <ScheduleCard key={index + 1} crewInfo={crewInfo}>
                {item}
              </ScheduleCard>
            );
          }
        })}
    </div>
  );
}

export default ScheduleContent;
