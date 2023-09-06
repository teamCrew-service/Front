import styled from 'styled-components';
import colors from 'assets/styles/color';

const StepbarDivStyle = styled.div<{ $width?: string }>`
  width: ${props => props.$width};
  height: 5px;
  background-color: ${colors.blue};
`;

export default StepbarDivStyle;
