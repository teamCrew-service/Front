import styled from 'styled-components';
import colors from '../assets/styles/color';

const ScheduleCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 12px;
  border-radius: 16px;
  background-color: ${colors.gray50};
`;

export default ScheduleCardDiv;
