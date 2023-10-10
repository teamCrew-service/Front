import React from 'react';
import styled from 'styled-components';
import colors from '../../assets/styles/color';

import heading from '../../styledComponent/heading';

const HostDiv = styled.div`
  padding: 4px;
  border-radius: 4px;
  background-color: ${colors.primary50};
  color: ${colors.primary};
`;

function MemberBox({ url, name, isHost = false }: { url: string; name: string; isHost?: boolean }): JSX.Element {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2%' }}>
      <div
        style={{
          width: '8%',
          aspectRatio: 1,
          border: `${isHost && `2px solid ${colors.primary}`}`,
          borderRadius: '50%',
          backgroundImage: `url(${url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <heading.BodyBaseBold>{name}</heading.BodyBaseBold>
      {isHost && (
        <HostDiv>
          <heading.CaptionXS>호스트</heading.CaptionXS>
        </HostDiv>
      )}
    </div>
  );
}

export default MemberBox;
