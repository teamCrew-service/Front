import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { myCrew } from '../../../../api';

import { ListBox } from '../../../../pages/searchbycategory/styled';
import CrewCard from '../../../common/CrewCard';

import heading from '../../../../styledComponent/heading';
import colors from '../../../../assets/styles/color';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ExistPermissionDiv = styled.div`
  display: flex;
  width: 100%;
  height: 48px;
  justify-content: space-between;
  align-items: center;
`;

const PermissionBtnDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 132px;
  height: 100%;
  border-radius: 8px;
  background: linear-gradient(146deg, #7353f4 -4.01%, #a3e6ff 55.93%, #aaf2c7 102.64%);
`;

function MyCreatedCrew(): JSX.Element {
  const navigate = useNavigate();

  const goPermissionModal = (id: string): void => {
    navigate('/permission', { state: { crewId: id } });
  };

  const { data: myCreatedCrewList, isLoading } = useQuery('getMyCreatedCrew', myCrew.getMyCreatedCrew, {
    onSuccess: res => {
      console.log('내가 생성한 크루 = ', res);
    },
    refetchOnWindowFocus: false,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <ListBox>
      {myCreatedCrewList?.map(item => (
        <StyledDiv key={item.crew_crewId}>
          <CrewCard key={item.crew_crewId} spot={item} />
          {item.existSignup !== '0' && (
            <ExistPermissionDiv>
              <heading.BodySmallMedium style={{ color: `${colors.primary}` }}>
                대기중인 예비 크루들이 있어요!
              </heading.BodySmallMedium>
              <PermissionBtnDiv
                onClick={() => {
                  goPermissionModal(item.crew_crewId);
                }}
              >
                <heading.BodyBaseBold>확인하기</heading.BodyBaseBold>
              </PermissionBtnDiv>
            </ExistPermissionDiv>
          )}
        </StyledDiv>
      ))}
    </ListBox>
  );
}

export default MyCreatedCrew;
