import styled from 'styled-components';
import colors from '../../assets/styles/color';

export const AnswerBoxStyle = styled.div<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 56px;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 4px;
  background-color: ${props => {
    if (props.$isActive) {
      return colors.gray50;
    }
    return colors.primary;
  }};
  color: ${props => {
    if (props.$isActive) {
      return colors.gray500;
    }
    return 'white';
  }};
`;

export const QuestionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const OptionBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48%;
  height: 56px;
  border: 1px solid ${colors.primary};
  border-radius: 4px;
  cursor: pointer;
`;
