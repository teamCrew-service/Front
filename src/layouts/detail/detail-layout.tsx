import styled from 'styled-components';

import colors from '../../assets/styles/color';

// 전체 높이 : 814px

/* 56px */
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 7.32%;
  padding: 8px 16px;
`;

/* 709px */
export const Main = styled.main`
  width: 100%;
  height: 92.68%;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ThumbnailContainer = styled.section`
  width: 100%;
  height: 375px;
`;

/* 481px */
export const ContentContainer = styled.section`
  width: 100%;
  height: calc(93.23% - 375px);
  padding: 0px 16px;
`;

export const SummaryInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
  padding-top: 16px;
`;

export const DetailInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 40px;
`;

export const IntroTitle = styled.div`
  width: 100%;
  height: fit-content;
  margin-top: 36px;
`;
export const IntroContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  padding: 12px 0px;
`;

// 장기
export const LongNavContainer = styled.nav`
  position: sticky;
  top: 0;
  width: 100%;
  height: 6.77%;
  padding: 0px 16px;
  border-bottom: 0.3px solid #dadada;
  background-color: white;
  z-index: 103;
`;
export const LongNavItem = styled.ul`
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`;
/* 282px */
export const CalendarContainer = styled.div`
  width: 100%;
  height: 276px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
`;
export const RecentScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 10px;
  padding: 16px 18px;
`;

// 단기
export const SummaryInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  padding: 12px;
  gap: 4px;
  background-color: ${colors.point50};
  border-radius: 12px;
`;
export const SummaryInfoItem = styled.div`
  display: flex;
  gap: 4px;
`;
