import styled from 'styled-components';
import colors from '../../../../assets/styles/color';

const NoticeCardDivStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 343px;
  height: fit-content;
  gap: 4px;
  padding: 12px;
  border-radius: 22px;
  background-color: ${colors.blueGray100};
`;

export default NoticeCardDivStyle;
