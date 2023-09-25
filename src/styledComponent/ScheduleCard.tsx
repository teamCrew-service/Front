import styled from 'styled-components';
import colors from '../assets/styles/color';

const ScheduleCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  aspect-ratio: 3;
  gap: 4px;
  padding: 12px;
  border-radius: 22px;
  background-color: ${colors.gray50};
`;

export default ScheduleCard;
