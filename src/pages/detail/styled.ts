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

export const CrewInfoContext = styled.h3`
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.2px;
`;

export const SubTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SaveBtn = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 10px;
  border-radius: 4px;
  background-color: ${colors.gray100};
  cursor: pointer;
`;
