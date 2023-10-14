import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ScheduleCardDiv from '../../styledComponent/ScheduleCardDiv';
import heading from '../../styledComponent/heading';
import icons from '../../assets/icons';

const GoDiv = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  height: fit-content;
  border-radius: 50%;
  cursor: pointer;
`;

function NoScheduleCard(): JSX.Element {
  const navigate = useNavigate();
  const goNextFunc = (): void => {
    navigate('/upcomingschedule');
  };
  return (
    <ScheduleCardDiv>
      {/* section 1 */}
      <heading.BodySmallMedium style={{ display: 'flex', justifyContent: 'end' }}>
        <GoDiv onClick={goNextFunc}>
          <icons.chevronRight />
        </GoDiv>
      </heading.BodySmallMedium>
      <div
        style={{
          display: 'flex',
          marginBottom: 'auto',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        현재 참여중인 모임이 없습니다.
      </div>
    </ScheduleCardDiv>
  );
}

export default NoScheduleCard;
