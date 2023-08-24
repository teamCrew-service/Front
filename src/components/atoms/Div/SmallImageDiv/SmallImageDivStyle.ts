import styled from 'styled-components';

const SmallImageDivStyle = styled.div<{ $URL: string }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-image: url(${props => props.$URL});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border: 1px solid black;
`;

export default SmallImageDivStyle;
