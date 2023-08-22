import styled from 'styled-components';
import colors from '../../../../assets/styles/color';

const ProgressbarDivStyle = styled.div<{ $width?: string; $display?: string; $color?: string }>`
  width: ${props => props.$width};
  height: 5px;
  display: ${props => props.$display};
  background-color: ${props => props.$color};
`;

ProgressbarDivStyle.defaultProps = {
  $color: `${colors.lightGray}`,
};

export default ProgressbarDivStyle;
