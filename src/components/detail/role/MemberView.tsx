import React from 'react';

import heading from '../../../styledComponent/heading';
import colors from '../../../assets/styles/color';

import { BlockDiv } from '../../../pages/detail/styled';
import MemberBox from '../MemberBox';
import type { MemberDetail } from '../../../assets/interfaces';

function MemberView({ crewInfo }: { crewInfo: MemberDetail }): JSX.Element {
  return (
    <BlockDiv style={{ marginBottom: '34px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1%' }}>
        <heading.BodyLargeBold>참여중인 크루</heading.BodyLargeBold>
        <heading.BodySmallBold style={{ color: `${colors.primary}` }}>
          {crewInfo?.member.length}명 (호스트 제외)
        </heading.BodySmallBold>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '7px' }}>
        <MemberBox
          key={crewInfo.crew.captainId}
          url={crewInfo.crew.captainProfileImage}
          name={crewInfo.crew.captainNickname}
          isHost
          crewType={crewInfo.crew.crew_crewType}
        />
        {crewInfo?.member.map(person => (
          <MemberBox
            key={person.member_memberId}
            url={person.users_profileImage}
            name={person.users_nickname}
            crewType={crewInfo.crew.crew_crewType}
          />
        ))}
      </div>
    </BlockDiv>
  );
}

export default MemberView;
