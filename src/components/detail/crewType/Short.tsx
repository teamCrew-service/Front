import React from 'react';
import TitleLargeBold from '../../../styledComponent/heading/TitleLargeBold';
import BodySmallMedium from '../../../styledComponent/heading/BodySmallMedium';
import BodySmallBold from '../../../styledComponent/heading/BodySmallBold';
import BodyBaseMedium from '../../../styledComponent/heading/BodyBaseMedium';
import BodyLargeBold from '../../../styledComponent/heading/BodyLargeBold';
import CaptionXS from '../../../styledComponent/heading/CaptionXS';

import { SubTitle, SaveBtn } from '../../../pages/detail/styled';

import icons from '../../../assets/icons';
import colors from '../../../assets/styles/color';

import type { MemberDetail } from '../../../assets/interfaces';

import useCalDate from '../../../util/useCalDate';
import BodyBaseBold from '../../../styledComponent/heading/BodyBaseBold';

function short({
  crewInfo,
  infoOpen,
  openInfoWindow,
  closeInfoWindow,
  saveAddress,
  signUpCrew,
}: {
  crewInfo: MemberDetail;
  infoOpen: boolean;
  openInfoWindow: () => void;
  closeInfoWindow: () => void;
  saveAddress: (address: string) => void;
  signUpCrew: any;
}): JSX.Element {
  return (
    <section id="short-detail-main-content">
      <div id="short-detail-main-content-crewinfo">
        {/* 크루제목 */}
        <TitleLargeBold>{crewInfo.crew.crew_crewTitle}</TitleLargeBold>
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
            <BodySmallMedium>{useCalDate(new Date(crewInfo.crew.crew_crewDDay))}</BodySmallMedium>
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <icons.Location />
            <BodySmallMedium>{crewInfo.crew.crew_crewAddress}</BodySmallMedium>
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <icons.users />
            <BodySmallMedium>
              <span style={{ color: `${colors.point}` }}>{crewInfo.member.length}</span>/
              {crewInfo.crew.crew_crewMaxMember}
            </BodySmallMedium>
          </div>
        </div>
        {/* 소개 */}
        <div id="detail-main-content-intro">
          <SubTitle>
            <BodyLargeBold>소개</BodyLargeBold>
            {infoOpen ? (
              <icons.chevronUp style={{ cursor: 'pointer' }} onClick={closeInfoWindow} />
            ) : (
              <icons.chevronDown style={{ cursor: 'pointer' }} onClick={openInfoWindow} />
            )}
          </SubTitle>
        </div>
        {infoOpen && (
          <>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                borderBottom: '0.3px solid black',
                padding: '10px 0px',
              }}
            >
              <div>
                <BodyBaseMedium>&nbsp;&nbsp;&middot; 우리 모임 사람들의 특징은?</BodyBaseMedium>
                <BodyBaseMedium>{crewInfo?.crew.crew_crewMemberInfo}</BodyBaseMedium>
              </div>
              <div>
                <BodyBaseMedium>&nbsp;&nbsp;&middot; 우리 모임 사람들의 연령대는?</BodyBaseMedium>
                <BodyBaseMedium>{crewInfo?.crew.crew_crewAgeInfo}</BodyBaseMedium>
              </div>
            </div>
            <BodyBaseMedium style={{ padding: '10px 0px' }}>{crewInfo?.crew.crew_crewContent}</BodyBaseMedium>
          </>
        )}
        {/* 위치 */}
        <SubTitle>
          <BodyLargeBold>위치</BodyLargeBold>
        </SubTitle>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <icons.Mappin />
            <div>
              <BodyLargeBold>{crewInfo?.crew.crew_crewAddress}</BodyLargeBold>
              <CaptionXS>서울시 마포구 당인동 1</CaptionXS>
            </div>
          </div>
          <SaveBtn
            onClick={() => {
              saveAddress(crewInfo.crew.crew_crewAddress);
            }}
          >
            <BodySmallBold style={{ color: `${colors.point}` }}>주소 복사</BodySmallBold>
          </SaveBtn>
        </div>
        <div
          style={{
            width: '100%',
            aspectRatio: 2,
            backgroundColor: `${colors.gray100}`,
            borderRadius: '4px',
          }}
        >
          카카오 정적 맵
        </div>
        <SubTitle>
          <BodyLargeBold>사진</BodyLargeBold>
        </SubTitle>
        <div style={{ width: '100%', aspectRatio: 0.95, border: '1px solid black', borderRadius: '8px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', height: '56px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '21.33%',
              padding: '0px 12px',
              border: `1px solid ${colors.gray200}`,
              borderRadius: '8px',
            }}
          >
            <icons.heart />
            <BodyBaseBold style={{ color: `${colors.primary}` }}>
              {crewInfo.likeCount > 99 ? '99+' : crewInfo.likeCount}
            </BodyBaseBold>
          </div>
          {/* 참여 버튼  */}
          <div style={{ width: '74.34%' }}>
            <button
              disabled={crewInfo.personType !== 'person'}
              type="button"
              onClick={signUpCrew}
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: `${crewInfo.personType !== 'person' ? 'black' : colors.primary}`,
                borderRadius: '8px',
              }}
            >
              <BodyBaseBold style={{ color: `${crewInfo.personType !== 'person' ? colors.gray500 : 'white'}` }}>
                {crewInfo.personType !== 'person' ? '참여 중' : '모임 참가하기'}
              </BodyBaseBold>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default short;
