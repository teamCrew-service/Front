import React from 'react';
import { useQuery } from 'react-query';
import { notice } from '../../api';
import type { MemberDetail } from '../../assets/interfaces';

function NoticeContent({ crewInfo }: { crewInfo: MemberDetail }): JSX.Element {
  const {
    data: noticeInfo,
    isLoading,
    isError,
  } = useQuery(
    ['notice'],
    async () => {
      const result = await notice.getNotice(crewInfo.crew.crew_crewId);
      return result;
    },
    {
      onSuccess: result => {
        console.log(result);
      },
    },
  );
  if (isLoading) {
    return <div>loading</div>;
  }

  if (isError) {
    return <div>something wrong!</div>;
  }
  return (
    <div id="detail-main-content-notice">
      {noticeInfo!.voteForm.map(item => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={item.voteFormId}>{item.voteTitle}</div>
      ))}
    </div>
  );
}

export default NoticeContent;
