import styled from 'styled-components';

const SmallCardDiv = styled.div<{ $image?: any; $backColor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 25.67%;
  cursor: pointer;
  background-color: ${props => props.$backColor};
  background-image: url(${props => props.$image});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

export default SmallCardDiv;
