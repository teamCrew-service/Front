import React from 'react';
import { useRecoilValue } from 'recoil';
import { stepNum } from '../../../atoms/createcrew';

import CrewRecommendMember from '../questionComp/CrewRecommendMember';
import CrewTime from '../questionComp/CrewTime';
import CrewAge from '../questionComp/CrewAge';
import CrewAttendMethod from '../questionComp/CrewAttendMethod';
import CrewTitle from '../questionComp/CrewTitle';
import CrewIntro from '../questionComp/CrewIntro';
import CrewThumbnail from '../questionComp/CrewThumbnail';

function Long({ crewType }: { crewType: '장기' | '단기' }): JSX.Element {
  const step = useRecoilValue(stepNum);

  return (
    <>
      {step >= 3 && <CrewRecommendMember crewType={crewType} />}
      {step >= 4 && <CrewTime crewType={crewType} />}
      {step >= 5 && <CrewAge crewType={crewType} />}
      {step >= 6 && <CrewAttendMethod crewType={crewType} />}
      {step >= 7 && <CrewTitle crewType={crewType} />}
      {step >= 8 && <CrewThumbnail crewType={crewType} />}
      {step >= 9 && <CrewIntro crewType={crewType} />}
    </>
  );
}

export default Long;
