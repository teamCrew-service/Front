import styled from 'styled-components';
import colors from '../../../../assets/styles/color';

const LargeCardDivStyle = styled.div`
  width: 100%;
  height: 204px;
  border-radius: 22px;
  padding: 18px 14px;
  background-color: ${colors.blueGray100};
  &:hover {
    background-color: ${colors.blue};
    color: white;
  }
`;

export default LargeCardDivStyle;
