import styled from 'styled-components';

const LargeCardDiv = styled.div<{ $image: any }>`
  width: 50%;
  height: 100%;
  border-radius: 22px;
  text-decoration: none;
  color: black;
  cursor: pointer;
  background-image: url(${props => props.$image});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

export default LargeCardDiv;
