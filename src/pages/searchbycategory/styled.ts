import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from '../../assets/styles/color';

export const CrewCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: fit-content;
  border-radius: 8px;
  padding: 16px;
  background-color: ${colors.gray100};
`;

export const TagDiv = styled.div<{ $color: string }>`
  width: fit-content;
  height: 18px;
  background-color: ${props => props.$color};
  padding: 2px 8px;
  border-radius: 200px;
`;

export const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  border-radius: 8px;
  border: 1px solid black;
`;

export const CategoryDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  width: fit-content;
  border: 1px solid ${colors.gray400};
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

export const SearchingDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  gap: 32px;
  padding: 12px 16px;
  border: 1px solid ${colors.gray400};
  border-radius: 10px;
`;

export const SearchingInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  font-size: 12px;
  font-weight: 500;
  &:focus {
    outline: none;
  }
`;

export const SearchingNav = styled.ul`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50%;
  gap: 1.17%;
`;

export const NavItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 11.99%;
  height: 100%;
  background-color: ${colors.gray200};
  border-radius: 200px;
`;

export const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;
