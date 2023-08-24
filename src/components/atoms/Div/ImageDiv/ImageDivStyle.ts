import styled from 'styled-components';

const ImageDivStyle = styled.div<{ $imageURL: string }>`
  width: 307px;
  height: 234px;
  background-image: url(${props => props.$imageURL});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export default ImageDivStyle;
