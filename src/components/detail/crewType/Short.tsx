import React, { useState } from 'react';

import heading from '../../../styledComponent/heading';

import { SubTitle, BlockDiv } from '../../../pages/detail/styled';
import MemberBox from '../MemberBox';

import Location from '../role/Location';

import icons from '../../../assets/icons';
import colors from '../../../assets/styles/color';

import type { MemberDetail } from '../../../assets/interfaces';

import useCalDate from '../../../util/useCalDate';
import CaptainInfo from '../CaptainInfo';
import CrewIntro from '../role/CrewIntro';

function short({
  crewInfo,
  saveAddress,
}: {
  crewInfo: MemberDetail;
  saveAddress: (address: string) => void;
}): JSX.Element {
  const [showHostInfo, setShowHostInfo] = useState<boolean>(false);

  const showHostInfoFunc = (): void => {
    setShowHostInfo(prev => !prev);
  };

  return (
    <section id="detail-main-content">
      <div id="detail-main-content-crewinfo">
        {/* 크루제목 */}
        <heading.TitleLargeBold>{crewInfo.crew.crew_crewTitle}</heading.TitleLargeBold>
        {/* 크루정보 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: 'fit-content',
            padding: '12px',
            gap: '4px',
            backgroundColor: `${colors.point50}`,
            borderRadius: '12px',
          }}
        >
          <div style={{ display: 'flex', gap: '4px' }}>
            <icons.Calendar />
            <heading.BodySmallMedium>{useCalDate(new Date(crewInfo.crew.crew_crewDDay))}</heading.BodySmallMedium>
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <icons.Location />
            <heading.BodySmallMedium>{crewInfo.crew.crew_crewAddress}</heading.BodySmallMedium>
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <icons.users />
            <heading.BodySmallMedium>
              <span style={{ color: `${colors.point}` }}>{crewInfo.member.length}</span>/
              {crewInfo.crew.crew_crewMaxMember}
            </heading.BodySmallMedium>
          </div>
        </div>
      </div>

      <div id="detail-main-content-crewinfo-2">
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
        {crewInfo.personType === 'person' && (
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
                <icons.chevronUp onClick={showHostInfoFunc} />
              ) : (
                <icons.chevronDown onClick={showHostInfoFunc} />
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
        )}

        {/* 참여중인 크루 : 멤버들에게 보여주는 것 */}
        {crewInfo.personType !== 'person' && (
          <BlockDiv style={{ marginBottom: '34px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1%' }}>
              <heading.BodyLargeBold>참여중인 크루</heading.BodyLargeBold>
              <heading.BodySmallBold style={{ color: `${colors.point}` }}>
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
        )}
      </div>
    </section>
  );
}

export default short;
