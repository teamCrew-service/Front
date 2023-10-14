import React from 'react';
import styled from 'styled-components';
import icons from '../../assets/icons';
import colors from '../../assets/styles/color';
import heading from '../../styledComponent/heading';

const ContainerDiv = styled.div`
  display: flex;
  width: 100%;
  height: 236px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background-color: ${colors.primary50};
`;

function NoScheduleCard(): JSX.Element {
  return (
    <ContainerDiv>
      <icons.NoSchedule />
      <heading.BodyLargeBold style={{ color: `${colors.gray500}`, marginTop: '12px' }}>
        아직 등록된 일정이 없습니다.
      </heading.BodyLargeBold>
      <heading.BodySmallMedium style={{ color: `${colors.gray500}`, marginTop: '4px' }}>
        크루챗에 문의를 남겨보아요!
      </heading.BodySmallMedium>
    </ContainerDiv>
  );
}

export default NoScheduleCard;
