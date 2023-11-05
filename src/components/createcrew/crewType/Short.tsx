import React from 'react';
import { useRecoilValue } from 'recoil';
import { stepNum } from '../../../atoms/createcrew';

import CrewDate from '../questionComp/CrewDate';
import CrewRecommendMember from '../questionComp/CrewRecommendMember';
import CrewTime from '../questionComp/CrewTime';
import CrewAge from '../questionComp/CrewAge';
import CrewAttendMethod from '../questionComp/CrewAttendMethod';
import CrewTitle from '../questionComp/CrewTitle';
import CrewIntro from '../questionComp/CrewIntro';
import CrewThumbnail from '../questionComp/CrewThumbnail';

function Short({ crewType }: { crewType: '장기' | '단기' }): JSX.Element {
  const step = useRecoilValue(stepNum);
  console.log('short step = ', step);

  return (
    <>
      {step >= 3 && <CrewDate />}
      {step >= 4 && <CrewRecommendMember crewType={crewType} />}
      {step >= 5 && <CrewTime crewType={crewType} />}
      {step >= 6 && <CrewAge crewType={crewType} />}
      {step >= 7 && <CrewAttendMethod crewType={crewType} />}
      {step >= 8 && <CrewTitle crewType={crewType} />}
      {step >= 9 && <CrewThumbnail crewType={crewType} />}
      {step >= 10 && <CrewIntro crewType={crewType} />}
    </>
  );
}

export default Short;
