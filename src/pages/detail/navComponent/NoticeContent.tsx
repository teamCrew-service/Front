import React, { useState } from 'react';
import styled from 'styled-components';
import type { MemberDetail } from '../../../assets/interfaces';
import colors from '../../../assets/styles/color';
import BodyBaseBold from '../../../styledComponent/heading/BodyBaseBold';
import CaptionXS from '../../../styledComponent/heading/CaptionXS';
import BodySmallBold from '../../../styledComponent/heading/BodySmallBold';

const NoticeDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  background-color: ${colors.primary50};
  padding: 12px;
  border-radius: 12px;
`;

const StyledLi = styled.li`
  border-radius: 200px;
  background-color: ${colors.gray200};
  padding: 4px 12px;
  cursor: pointer;
`;

function NoticeContent({ crewInfo }: { crewInfo: MemberDetail }): JSX.Element {
  const [selected, setSelected] = useState<string>('정모 공지');
  //   const {
  //     data: noticeInfo,
  //     isLoading,
  //     isError,
  //   } = useQuery(
  //     ['notice'],
  //     async () => {
  //       const result = await notice.getNotice(crewInfo.crew.crew_crewId);
  //       return result;
  //     },
  //     {
  //       onSuccess: result => {
  //         console.log(result);
  //       },
  //     },
  //   );
  const changeSelectedHandler = (input: string): void => {
    setSelected(input);
  };
  // if (isLoading) {
  //   return <div>loading</div>;
  // }

  // if (isError) {
  //   return <div>something wrong!</div>;
  // }
  return (
    <div id="detail-main-content-notice">
      <nav style={{ width: '100%', marginBottom: '9px' }}>
        <ul style={{ display: 'flex', gap: '2.36%' }}>
          {['정모 공지', '투표'].map(item => {
            if (item === selected) {
              return (
                <StyledLi key={item} style={{ backgroundColor: `${colors.primary}` }}>
                  <BodySmallBold style={{ color: 'white' }}>{item}</BodySmallBold>
                </StyledLi>
              );
            }
            return (
              <StyledLi
                key={item}
                onClick={() => {
                  changeSelectedHandler(item);
                }}
              >
                <BodySmallBold>{item}</BodySmallBold>
              </StyledLi>
            );
          })}
        </ul>
      </nav>
      {selected === '정모 공지' &&
        crewInfo.allNotice.regularNotice.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <NoticeDiv key={index + 1}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '72px',
                height: '20px',
                backgroundColor: `${colors.gray400}`,
                borderRadius: '200px',
              }}
            >
              <CaptionXS>정모 공지</CaptionXS>
            </div>
            <div>
              <BodyBaseBold>{item.noticeTitle}</BodyBaseBold>
              <CaptionXS>{item.noticeContent}</CaptionXS>
            </div>
          </NoticeDiv>
        ))}
      {selected === '투표' &&
        crewInfo.allNotice.voteForm.map(item => (
          <NoticeDiv key={item.voteFormId}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '72px',
                height: '20px',
                backgroundColor: `${colors.gray400}`,
                borderRadius: '200px',
              }}
            >
              <CaptionXS>투표</CaptionXS>
            </div>
            <div>
              <BodyBaseBold>{item.voteTitle}</BodyBaseBold>
              <CaptionXS>{item.voteContent}</CaptionXS>
            </div>
          </NoticeDiv>
        ))}
    </div>
  );
}

export default NoticeContent;
