import React from 'react';

import heading from '../../../styledComponent/heading';

import { SubTitle } from '../../../pages/detail/styled';

import Location from '../role/Location';

import icons from '../../../assets/icons';
import colors from '../../../assets/styles/color';

import type { MemberDetail } from '../../../assets/interfaces';

import useCalDate from '../../../util/useCalDate';
import CrewIntro from '../role/CrewIntro';
import GuestView from '../role/GuestView';
import MemberView from '../role/MemberView';
import {
  ContentContainer,
  DetailInfoContainer,
  SummaryInfoContainer,
  SummaryInfoDiv,
  SummaryInfoItem,
} from '../../../layouts/detail/detail-layout';

function short({
  crewInfo,
  saveAddress,
}: {
  crewInfo: MemberDetail;
  saveAddress: (address: string) => void;
}): JSX.Element {
  return (
    <ContentContainer>
      <SummaryInfoContainer>
        {/* 크루제목 */}
        <heading.TitleLargeBold>{crewInfo.crew.crew_crewTitle}</heading.TitleLargeBold>
        {/* 크루정보 */}
        <SummaryInfoDiv>
          <SummaryInfoItem>
            <icons.Calendar />
            <heading.BodySmallMedium>{useCalDate(new Date(crewInfo.crew.crew_crewDDay))}</heading.BodySmallMedium>
          </SummaryInfoItem>
          <SummaryInfoItem>
            <icons.Location />
            <heading.BodySmallMedium>{crewInfo.crew.crew_crewAddress}</heading.BodySmallMedium>
          </SummaryInfoItem>
          <SummaryInfoItem>
            <icons.users />
            <heading.BodySmallMedium>
              <span style={{ color: `${colors.point}` }}>{crewInfo.member.length}</span>/
              {crewInfo.crew.crew_crewMaxMember}
            </heading.BodySmallMedium>
          </SummaryInfoItem>
        </SummaryInfoDiv>
      </SummaryInfoContainer>

      <DetailInfoContainer>
        {/* 소개 */}
        <CrewIntro
          crewMemberInfo={crewInfo.crew.crew_crewMemberInfo}
          crewAgeInfo={crewInfo.crew.crew_crewAgeInfo}
          crewContent={crewInfo.crew.crew_crewContent}
        />

        {/* 위치 */}
        <Location crewInfo={crewInfo} recentSchedule={null} saveAddress={saveAddress} />

        {/* 사진 */}
        <SubTitle>
          <heading.BodyLargeBold>사진</heading.BodyLargeBold>
        </SubTitle>
        <div style={{ width: '100%', aspectRatio: 0.95, border: '1px solid black', borderRadius: '8px' }} />

        {/* 호스트 : 게스트만 보여주는 것 */}
        {crewInfo.personType === 'person' && <GuestView crewInfo={crewInfo} />}

        {/* 참여중인 크루 : 멤버들에게 보여주는 것 */}
        {crewInfo.personType !== 'person' && <MemberView crewInfo={crewInfo} />}

        {/* 크루 가입 버튼에 가리는 부분 제거하기 위해 추가 */}
        {crewInfo.personType === 'person' && <div style={{ height: '34px' }} />}
      </DetailInfoContainer>
    </ContentContainer>
  );
}

export default short;
