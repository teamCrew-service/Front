import styled from 'styled-components';
import colors from '../assets/styles/color';

const ScheduleCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 12px;
  border-radius: 22px;
  background-color: ${colors.gray50};
`;

export default ScheduleCard;
