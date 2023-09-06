import styled from 'styled-components';
import colors from 'assets/styles/color';

const SmallCardDivStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border-radius: 22px;
  background-color: ${colors.blueGray100};
  &:hover {
    background-color: ${colors.blue};
    color: white;
  }
`;

export default SmallCardDivStyle;
