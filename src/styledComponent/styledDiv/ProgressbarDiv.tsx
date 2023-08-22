import styled from 'styled-components';
import colors from '../../style/color';

const ProgressbarDiv = styled.div<{ $width: string; $display?: string; $color?: string }>`
  width: ${props => props.$width};
  height: 5px;
  display: ${props => props.$display};
  background-color: ${props => props.$color};
`;

ProgressbarDiv.defaultProps = {
  $color: `${colors.lightGray}`,
};

export default ProgressbarDiv;
