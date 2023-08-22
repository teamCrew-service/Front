import styled from 'styled-components';
import colors from '../../style/color';

const ButtonDiv = styled.div<{ $divColor?: string }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 343px;
  height: 56px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background-color: ${props => props.$divColor};
`;

ButtonDiv.defaultProps = {
  $divColor: `${colors.blue}`,
};

export default ButtonDiv;
