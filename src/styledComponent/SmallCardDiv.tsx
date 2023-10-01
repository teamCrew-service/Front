import styled from 'styled-components';

const SmallCardDiv = styled.div<{ $image?: any }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 25.67%;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.01em;
  cursor: pointer;
  background-image: url(${props => props.$image});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

export default SmallCardDiv;
