import React from 'react';
import styled from 'styled-components';
import colors from '../../assets/styles/color';

import heading from '../../styledComponent/heading';

const HostDiv = styled.div<{ $crewType: string }>`
  padding: 4px;
  border-radius: 4px;
  background-color: ${props => (props.$crewType === '장기' ? colors.primary50 : colors.point50)};
  color: ${props => (props.$crewType === '장기' ? colors.primary700 : colors.point700)};
`;

function MemberBox({
  url,
  name,
  isHost = false,
  crewType,
}: {
  url: string;
  name: string;
  isHost?: boolean;
  crewType: string;
}): JSX.Element {
  let borderColor;
  if (crewType === '장기') {
    borderColor = `${colors.primary}`;
  }
  if (crewType === '단기') {
    borderColor = `${colors.point}`;
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2%' }}>
      <div
        style={{
          width: '8%',
          aspectRatio: 1,
          border: `${isHost && `2px solid ${borderColor}`}`,
          borderRadius: '50%',
          backgroundImage: `url(${url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <heading.BodyBaseBold>{name}</heading.BodyBaseBold>
      {isHost && (
        <HostDiv $crewType={crewType}>
          <heading.CaptionXS>호스트</heading.CaptionXS>
        </HostDiv>
      )}
    </div>
  );
}

export default MemberBox;
