import React from 'react';
import styled from 'styled-components';
import useCalDate from '../../util/useCalDate';
import icons from '../../assets/icons';
import colors from '../../assets/styles/color';
import CaptionXS from '../../styledComponent/heading/CaptionXS';
import BodyLargeBold from '../../styledComponent/heading/BodyLargeBold';
import BodySmallMedium from '../../styledComponent/heading/BodySmallMedium';
import type { MemberDetail } from '../../assets/interfaces';
import BodyBaseBold from '../../styledComponent/heading/BodyBaseBold';
import BodySmallBold from '../../styledComponent/heading/BodySmallBold';

const ScheduleDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  height: fit-content;
  border-radius: 12px;
  background-color: ${colors.primary100};
  padding: 12px;
  padding-top: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.16);
`;

const ImageDiv = styled.div`
  border: 1px solid black;
  width: 8.78%;
  aspect-ratio: 1;
  border-radius: 50%;
`;

function ScheduleCard({ children, crewInfo }: { children?: any; crewInfo: MemberDetail }): JSX.Element {
  return (
    <ScheduleDiv>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <BodyLargeBold>{children.scheduleTitle}</BodyLargeBold>
        <CaptionXS style={{ color: `${colors.gray500}` }}>{children.scheduleContent}</CaptionXS>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <icons.Calendar />
          <BodySmallMedium>{useCalDate(new Date(children.scheduleDDay))}</BodySmallMedium>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <icons.Location />
          <BodySmallMedium>{children.scheduleAddress}</BodySmallMedium>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <icons.users />
          <BodySmallMedium>/{crewInfo.crew.crew_crewMaxMember}</BodySmallMedium>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1%' }}>
        <ImageDiv />
        <ImageDiv />
        <ImageDiv />
        <ImageDiv />
        <ImageDiv />
        <div style={{ backgroundColor: 'white', padding: '0px 8px', borderRadius: '12px' }}>
          <BodySmallBold style={{ color: `${colors.primary}` }}>&#43;1</BodySmallBold>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <button type="button" style={{ backgroundColor: 'black', padding: '12px 24px', borderRadius: '8px' }}>
          <BodyBaseBold style={{ color: 'white' }}>참여하기</BodyBaseBold>
        </button>
      </div>
    </ScheduleDiv>
  );
}

export default ScheduleCard;
