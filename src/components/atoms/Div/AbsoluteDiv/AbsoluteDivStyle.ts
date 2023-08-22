import styled from 'styled-components';

const AbsoluteDivStyle = styled.div<{ $left?: string; $top?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: ${props => props.$left};
  top: ${props => props.$top};
`;

export default AbsoluteDivStyle;
