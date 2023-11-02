import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from '../../assets/styles/color';

export const CrewCardDiv = styled.div<{ $image: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 262px;
  border-radius: 12px;
  padding: 16px;
  text-decoration: none;
  color: inherit;
  background-image: url(${props => props.$image});
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const TagDiv = styled.div<{ $color: string }>`
  width: fit-content;
  height: fit-content;
  background-color: ${props => props.$color};
  padding: 4px 10px;
  border-radius: 200px;
`;

export const CategoryDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  width: fit-content;
  border: 1px solid ${colors.gray200};
  border-radius: 8px;
  padding: 4px 6px;
  cursor: pointer;
`;

export const BackLink = styled(Link)`
  position: absolute;
  top: 21px;
  left: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 102;
`;
