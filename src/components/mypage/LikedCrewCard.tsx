import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import colors from '../../assets/styles/color';

import type { SearchByCategory } from '../../assets/interfaces';

const CardContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 241px;
  height: 100%;
  padding: 16px;
  border-radius: 12px;
  background-color: ${colors.gray100};
`;

function LikedCrewCard({ crewInfo }: { crewInfo: SearchByCategory }): JSX.Element {
  return <CardContainer to={`/detail/${crewInfo.crew_crewId}`}>{crewInfo.crew_category}</CardContainer>;
}

export default LikedCrewCard;
