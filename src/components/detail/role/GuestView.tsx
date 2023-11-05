import React, { useState } from 'react';

import heading from '../../../styledComponent/heading';
import icons from '../../../assets/icons';

import { BlockDiv, SubTitle } from '../../../pages/detail/styled';
import MemberBox from '../MemberBox';
import CaptainInfo from '../CaptainInfo';

import type { MemberDetail } from '../../../assets/interfaces';

function GuestView({ crewInfo }: { crewInfo: MemberDetail }): JSX.Element {
  const [showHostInfo, setShowHostInfo] = useState<boolean>(true);
  const showHostInfoHandler = (): void => {
    setShowHostInfo(prev => !prev);
  };
  return (
    <BlockDiv style={{ marginBottom: '34px' }}>
      <SubTitle>
        <heading.BodyLargeBold>호스트</heading.BodyLargeBold>
      </SubTitle>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <MemberBox
          key={crewInfo.crew.captainId}
          url={crewInfo.crew.captainProfileImage}
          name={crewInfo.crew.captainNickname}
          isHost
          crewType={crewInfo.crew.crew_crewType}
        />
        {showHostInfo ? (
          <icons.chevronUp onClick={showHostInfoHandler} />
        ) : (
          <icons.chevronDown onClick={showHostInfoHandler} />
        )}
      </div>
      {showHostInfo && (
        <CaptainInfo
          age={crewInfo.crew.captainAge}
          location={crewInfo.crew.captainLocation}
          message={crewInfo.crew.captainMessage}
          topics={crewInfo.captainTopics}
        />
      )}
    </BlockDiv>
  );
}

export default GuestView;
