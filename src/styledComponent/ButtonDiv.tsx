import styled from 'styled-components';
import colors from '../assets/styles/color';

const ButtonDiv = styled.button`
  background-color: ${colors.primary};
  color: white;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 56px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.408px;
`;

export default ButtonDiv;
