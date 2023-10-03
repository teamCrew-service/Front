import styled from 'styled-components';

const LargeCardDiv = styled.div<{ $image: any; $backColor: string }>`
  width: 50%;
  height: 100%;
  border-radius: 22px;
  text-decoration: none;
  background-color: ${props => props.$backColor};
  color: black;
  cursor: pointer;
  background-image: url(${props => props.$image});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  &:active {
    background-color: black;
  }
`;

export default LargeCardDiv;
