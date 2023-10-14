import React from 'react';
import { useQuery } from 'react-query';
import { myCrew } from '../../../../api';

import { ListBox } from '../../../../pages/searchbycategory/styled';
import CrewCard from '../../../common/CrewCard';

function WaitingCrew(): JSX.Element {
  const { data: waitingCrewList, isLoading } = useQuery('getWaitingCrew', myCrew.getWaitingCrew, {
    onSuccess: res => {
      console.log('참여 기다리는 크루 리스트 = ', res);
    },
    refetchOnWindowFocus: false,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <ListBox>{waitingCrewList?.map(item => <CrewCard key={item.crew_crewId} spot={item} />)}</ListBox>;
}

export default WaitingCrew;
