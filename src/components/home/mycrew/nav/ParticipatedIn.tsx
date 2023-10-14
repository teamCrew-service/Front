import React from 'react';
import { useQuery } from 'react-query';
import { myCrew } from '../../../../api';
import CrewCard from '../../../common/CrewCard';
import { ListBox } from '../../../../pages/searchbycategory/styled';

function ParticipatedIn(): JSX.Element {
  const { data: joinedCrewList, isLoading } = useQuery('getJoindeCrewList', myCrew.getJoinedCrew, {
    onSuccess: res => {
      console.log('참여중 크루 리스트 = ', res);
    },
    refetchOnWindowFocus: false,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <ListBox>{joinedCrewList?.joinedCrew.map(item => <CrewCard key={item.crew_crewId} spot={item} />)}</ListBox>;
}

export default ParticipatedIn;
