import React from 'react';
import { useRecoilValue } from 'recoil';
import { stepNum } from '../../../../atoms/makecrew';

import CrewRecommendMember from '../CrewRecommendMember';
import CrewTime from '../CrewTime';
import CrewAge from '../CrewAge';
import CrewAttendMethod from '../CrewAttendMethod';
import CrewTitle from '../CrewTitle';
import CrewIntro from '../CrewIntro';
import CrewThumbnail from '../CrewThumbnail';

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
