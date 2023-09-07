import styled from 'styled-components';

const ImageDivStyle = styled.div<{ $imageURL: string }>`
  width: 89.5%;
  height: 28.82%;
  background-image: url(${props => props.$imageURL});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export default ImageDivStyle;
