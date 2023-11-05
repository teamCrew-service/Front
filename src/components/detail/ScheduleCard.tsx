import React from 'react';
import styled from 'styled-components';
import { useMutation } from 'react-query';
import { type AxiosError } from 'axios';
import useCalDate from '../../util/useCalDate';
import icons from '../../assets/icons';
import colors from '../../assets/styles/color';
import heading from '../../styledComponent/heading';

import type { MemberDetail, Schedule } from '../../assets/interfaces';
import { schedule } from '../../api';

const ScheduleDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  height: fit-content;
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

function ScheduleCard({
  children,
  crewInfo,
  refetch,
}: {
  children?: Schedule;
  crewInfo: MemberDetail;
  refetch?: any;
}): JSX.Element {
  let memberList: number[] = [];
  if (children !== undefined) {
    memberList = children?.participants.map(item => item.participantUserId);
  }

  console.log('멤버리스트 = ', memberList);

  const signUpMutation = useMutation(
    async () => {
      if (children === undefined) return null;
      const data = await schedule.signUpSchedule(crewInfo.crew.crew_crewId, children.scheduleId);
      return data;
    },
    {
      onSuccess: res => {
        alert(res.message);
        if (refetch !== undefined) {
          refetch();
        }
      },
      onError: (err: AxiosError<{ message: string }>) => {
        alert(err.response?.data.message);
      },
    },
  );

  const cancelMutation = useMutation(
    async () => {
      if (children === undefined) return null;
      const data = await schedule.cancelSchedule(crewInfo.crew.crew_crewId, children.scheduleId);
      return data;
    },
    {
      onSuccess: res => {
        alert(res.message);
        if (refetch !== undefined) {
          refetch();
        }
      },
      onError: (err: AxiosError<{ message: string }>) => {
        alert(err.response?.data.message);
      },
    },
  );

  return (
    <ScheduleDiv>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <heading.BodyLargeBold>{children!.scheduleTitle}</heading.BodyLargeBold>
        <heading.CaptionXS style={{ color: `${colors.gray500}` }}>{children!.scheduleContent}</heading.CaptionXS>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <icons.Calendar stroke={colors.gray700} />
          <heading.BodySmallMedium>{useCalDate(new Date(children!.scheduleDDay))}</heading.BodySmallMedium>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <icons.Location stroke={colors.gray700} />
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
        {children?.participants[0] !== undefined && (
          <ImageDiv style={{ backgroundImage: `url(${children?.participants[0].participantProfileImage})` }} />
        )}
        {children?.participants[1] !== undefined && (
          <ImageDiv
            style={{ translate: '-15%', backgroundImage: `url(${children.participants[1].participantProfileImage})` }}
          />
        )}
        {children?.participants[2] !== undefined && (
          <ImageDiv
            style={{ translate: '-30%', backgroundImage: `url(${children.participants[2].participantProfileImage})` }}
          />
        )}
        {children?.participants[3] !== undefined && (
          <ImageDiv
            style={{ translate: '-45%', backgroundImage: `url(${children.participants[3].participantProfileImage})` }}
          />
        )}
        {children?.participants[4] !== undefined && (
          <ImageDiv
            style={{ translate: '-60%', backgroundImage: `url(${children.participants[4].participantProfileImage})` }}
          />
        )}
        {children !== undefined && children.participants.length > 5 && (
          <div style={{ translate: '-45%' }}>
            <heading.BodySmallMedium style={{ color: `${colors.gray500}` }}>&#43;1</heading.BodySmallMedium>
          </div>
        )}
      </div>

      {children !== undefined && crewInfo.personType !== 'captain' && (
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          {memberList.includes(Number(crewInfo.myUserId)) ? (
            <button
              onClick={() => {
                cancelMutation.mutate();
              }}
              type="button"
              style={{ backgroundColor: 'black', padding: '12px 24px', borderRadius: '8px' }}
            >
              <heading.BodyBaseBold style={{ color: 'white' }}>취소하기</heading.BodyBaseBold>
            </button>
          ) : (
            <button
              onClick={() => {
                signUpMutation.mutate();
              }}
              type="button"
              style={{ backgroundColor: 'black', padding: '12px 24px', borderRadius: '8px' }}
            >
              <heading.BodyBaseBold style={{ color: 'white' }}>참여하기</heading.BodyBaseBold>
            </button>
          )}
        </div>
      )}
    </ScheduleDiv>
  );
}

export default ScheduleCard;
