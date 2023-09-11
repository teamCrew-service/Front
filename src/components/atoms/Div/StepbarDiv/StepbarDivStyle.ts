import styled from 'styled-components';
import colors from '../../../../assets/styles/color';

const StepbarDivStyle = styled.div<{ $totalSteps: number }>`
  width: ${props => (1 / props.$totalSteps) * 100}%;
  height: 5px;
  background-color: ${colors.primary};
`;

export default StepbarDivStyle;
