import styled from 'styled-components';

const Body3ParagrpahStyle = styled.p<{ $color: string }>`
  font-size: 12px;
  color: ${props => props.$color};
  line-height: 18px;
  letter-spacing: -0.2px;
`;

export default Body3ParagrpahStyle;
