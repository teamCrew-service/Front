import styled from 'styled-components';
import colors from '../assets/styles/color';

const SmallCardDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 22px;
  background-color: ${colors.primary50};
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.01em;
  cursor: pointer;
`;

export default SmallCardDiv;
