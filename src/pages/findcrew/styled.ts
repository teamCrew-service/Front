import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from '../../assets/styles/color';

const CrewCard = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: fit-content;
  border-radius: 8px;
  padding: 16px;
  background-color: ${colors.gray100};
  text-decoration: none;
  color: inherit;
`;

const TagDiv = styled.div<{ $color: string }>`
  width: fit-content;
  height: 18px;
  background-color: ${props => props.$color};
  padding: 2px 8px;
  border-radius: 200px;
`;

const ImageBox = styled.div<{ image: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  border-radius: 8px;
  border: 1px solid black;
  background-image: url(${props => props.image});
  background-size: cover;
  background-repeat: no-repeat;
`;

const CategoryDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  width: fit-content;
  border: 1px solid ${colors.gray200};
  border-radius: 8px;
  padding: 4px 6px;
  cursor: pointer;
`;

const BackLink = styled(Link)`
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

export { CrewCard, TagDiv, ImageBox, CategoryDiv, BackLink };
