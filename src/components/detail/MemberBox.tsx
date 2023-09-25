import React from 'react';

function MemberBox({
  url,
  name,
  address,
  isHost = false,
}: {
  url: string;
  name: string;
  address: string;
  isHost?: boolean;
}): JSX.Element {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2%' }}>
      <div
        style={{
          width: '8%',
          aspectRatio: 1,
          border: '1px solid black',
          borderRadius: '50%',
          backgroundImage: `url(${url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <h6>{name}</h6>
      <h6>{address}</h6>
      {isHost && <div>호스트</div>}
    </div>
  );
}

export default MemberBox;
