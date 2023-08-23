import styled from 'styled-components';

const ButtonDivStyle = styled.div<{ $color?: string; $backgroundColor?: string; $border?: string }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 343px;
  height: 56px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background-color: ${props => props.$backgroundColor};
  border: ${props => props.$border};
  color: ${props => props.$color};
  &:hover {
    background-color: white;
    border: 1px solid blue;
    color: blue;
  }
`;

export default ButtonDivStyle;
