import React from 'react';
import SmallImageDivStyle from './SmallImageDivStyle';

function SmallImageDiv({ Url }: { Url: string }): JSX.Element {
  return <SmallImageDivStyle $URL={Url} />;
}

export default SmallImageDiv;
