import styled from 'styled-components';
import colors from '../../../assets/styles/color';

export const TotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
`;
export const ShowBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  height: fit-content;
  margin-top: 11px;
  color: ${colors.gray400};
`;

export const ShowBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;
  background-color: ${colors.gray200};
  border-radius: 4px;
  padding: 12px;
`;
