import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import HeadLine from '../../styledComponent/heading/HeadLine';
import { notice } from '../../api';
import colors from '../../assets/styles/color';

const NoticeCard = styled.div`
  width: 100%;
  height: 21.62%;
  background-color: ${colors.Gray50};
  padding: 12px;
`;

function NoticeContent(): JSX.Element {
  const { status, data } = useQuery(
    'getNoticeList',
    async () => {
      const result = await notice.getNoticeList();
      return result.data;
    },
    {
      onSuccess: res => {
        console.log(res);
      },
      refetchOnWindowFocus: false,
    },
  );
  if (status === 'loading') {
    return <div>loading</div>;
  }
  if (status === 'error') {
    return <div>something wrong!</div>;
  }
  return (
    <div id="detail-main-content-notice">
      {data !== undefined ? (
        data.map(card => (
          <NoticeCard key={card.noticeTitle}>
            <HeadLine>{card?.noticeTitle}</HeadLine>
          </NoticeCard>
        ))
      ) : (
        <div>no notice</div>
      )}
    </div>
  );
}

export default NoticeContent;
