import React from 'react';
import NoticeCardDivStyle from './NoticeCardDivStyle';

function NoticeCardDiv({ children }: { children: any }): JSX.Element {
  return <NoticeCardDivStyle>{children}</NoticeCardDivStyle>;
}

export default NoticeCardDiv;
