import React, { useState } from 'react';
import styled from 'styled-components';

import type { MemberDetail, VoteCreateInfo, VoteResultInfo } from '../../../../../assets/interfaces';

import colors from '../../../../../assets/styles/color';
import icons from '../../../../../assets/icons';
import heading from '../../../../../styledComponent/heading';

import useCalDate from '../../../../../util/useCalDate';

const NoticeDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  background-color: ${colors.gray50};
  padding: 12px;
  border-radius: 12px;
`;

const StyledLi = styled.li`
  display: flex;
  border-radius: 200px;
  background-color: ${colors.gray200};
  padding: 4px 12px;
  cursor: pointer;
`;

const NoticeTypeDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  width: fit-content;
  height: 24px;
  background-color: ${colors.primary50};
  border-radius: 200px;
  padding: 4px 10px;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${colors.gray500};
`;

const ContentText = styled(heading.CaptionXS)`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${colors.gray500};
`;

function NoticeContent({
  crewInfo,
  openNoticeDetailModal,
  openVoteDetailModal,
  openVoteResultModal,
}: {
  crewInfo: MemberDetail;
  openNoticeDetailModal: (input: string) => void;
  openVoteDetailModal: (input: VoteCreateInfo) => void;
  openVoteResultModal: (input: VoteResultInfo) => void;
}): JSX.Element {
  const [selected, setSelected] = useState<string>('정모 공지');

  const changeSelectedHandler = (input: string): void => {
    setSelected(input);
  };

  return (
    <div id="detail-main-content-notice">
      <nav style={{ width: '100%', marginBottom: '9px' }}>
        <ul style={{ display: 'flex', gap: '2.36%' }}>
          {['정모 공지', '되는 시간 투표'].map(item => {
            if (item === selected) {
              return (
                <StyledLi key={item} style={{ backgroundColor: `${colors.primary}` }}>
                  {item === '정모 공지' && <icons.MegaPhone stroke="white" />}
                  {item === '되는 시간 투표' && <icons.VoteIcon stroke="white" />}
                  <heading.BodySmallBold style={{ color: 'white' }}>{item}</heading.BodySmallBold>
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
                {item === '정모 공지' && <icons.MegaPhone stroke={colors.primary} />}
                {item === '되는 시간 투표' && <icons.VoteIcon stroke={colors.primary} />}
                <heading.BodySmallBold>{item}</heading.BodySmallBold>
              </StyledLi>
            );
          })}
        </ul>
      </nav>
      {/* 정모 공지 탭일 경우 */}
      {selected === '정모 공지' && crewInfo.allNotice.regularNotice.length === 0 && (
        // 정모 공지 없을 경우
        <NoticeDiv>공지 없음</NoticeDiv>
      )}{' '}
      {selected === '정모 공지' &&
        // 공지 있을 경우
        crewInfo.allNotice.regularNotice.length !== 0 &&
        crewInfo.allNotice.regularNotice.map(item => (
          <NoticeDiv
            onClick={() => {
              openNoticeDetailModal(item.noticeId);
            }}
            key={item.noticeId}
          >
            <NoticeTypeDiv>
              <icons.MegaPhone stroke={colors.primary} />
              <heading.BodySmallMedium style={{ color: `${colors.primary}` }}>정모 공지</heading.BodySmallMedium>
            </NoticeTypeDiv>
            <div>
              <heading.BodyBaseBold>{item.noticeTitle}</heading.BodyBaseBold>
              <ContentText>{item.noticeContent}</ContentText>
            </div>
            <div>
              <InfoContainer>
                <icons.Calendar />
                <heading.BodySmallMedium>{useCalDate(new Date(item.noticeDDay))}</heading.BodySmallMedium>
              </InfoContainer>
              <InfoContainer>
                <icons.Mappin width={16} />
                <heading.BodySmallMedium>{item.noticePlaceName}</heading.BodySmallMedium>
              </InfoContainer>
            </div>
          </NoticeDiv>
        ))}
      {/* 투표 탭일 경우 */}
      {selected === '되는 시간 투표' && crewInfo.allNotice.voteForm.length === 0 && (
        <NoticeDiv>투표 없음</NoticeDiv>
      )}{' '}
      {selected === '되는 시간 투표' &&
        crewInfo.allNotice.voteForm.length !== 0 &&
        crewInfo.allNotice.voteForm.map(item => (
          <NoticeDiv
            key={item.voteFormId}
            onClick={() => {
              if (item.alreadyVote === 1) {
                openVoteResultModal({ isOpen: true, crewId: crewInfo.crew.crew_crewId, voteFormId: item.voteFormId });
                return;
              }
              openVoteDetailModal({ isOpen: true, voteFormId: item.voteFormId });
            }}
          >
            <NoticeTypeDiv>
              <icons.VoteIcon stroke={colors.primary} />
              <heading.BodySmallMedium style={{ color: `${colors.primary}` }}>되는 시간 투표</heading.BodySmallMedium>
            </NoticeTypeDiv>
            <div>
              <heading.BodyBaseBold>{item.voteFormTitle}</heading.BodyBaseBold>
              <ContentText>{item.voteFormContent}</ContentText>
            </div>
            <InfoContainer>
              <icons.Mappin width={16} />
              <heading.BodySmallMedium>{useCalDate(new Date(item.voteFormEndDate))}</heading.BodySmallMedium>
            </InfoContainer>
          </NoticeDiv>
        ))}
    </div>
  );
}

export default NoticeContent;
