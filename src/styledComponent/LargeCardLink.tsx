import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from '../assets/styles/color';

const LargeCardLink = styled(Link)`
  width: 50%;
  aspect-ratio: 1.14;
  border-radius: 22px;
  text-decoration: none;
  color: black;
  background-color: ${colors.primary100};
  padding: 18px 14px;
`;

export default LargeCardLink;
