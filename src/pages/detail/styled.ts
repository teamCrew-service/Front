import styled from 'styled-components';
import colors from '../../assets/styles/color';

export const DetailMenuLi = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 19.2%;
  height: 100%;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.08px;
  color: ${colors.gray400};
  cursor: pointer;
`;

export const ThumbnailDiv = styled.div<{ $url: string }>`
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.$url});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const ThumbnailAbsDiv = styled.div`
  position: absolute;
  display: flex;
  justify-content: end;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
  padding: 12px;
`;

export const CrewInfoContext = styled.h3`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.2px;
`;

export const SubTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0px;
  border-bottom: 1px solid ${colors.gray100};
`;

export const SaveBtn = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${colors.gray100};
  cursor: pointer;
`;

export const SaveCrewThumbnailBtn = styled.div`
  position: absolute;
  top: 55%;
  left: 50%;
  translate: -50% -50%;
  padding: 6px 41.5px;
  border-radius: 16px;
  background-color: ${colors.primary100};
  color: ${colors.primary};
  cursor: pointer;
`;

export const CrewIntroQuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

export const QuestionDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const SeparateDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 64px;
`;

export const SeparateBar = styled.div`
  width: 33.33%;
  height: 4px;
  background-color: ${colors.gray400};
`;

export const BlockDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
`;
