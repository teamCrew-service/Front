import React from 'react';
import { useRecoilValue } from 'recoil';
import { stepNum } from '../../../../atoms/createcrew';

import CrewDate from './CrewDate';
import CrewRecommendMember from '../CrewRecommendMember';
import CrewTime from '../CrewTime';
import CrewAge from '../CrewAge';
import CrewAttendMethod from '../CrewAttendMethod';
import CrewTitle from '../CrewTitle';
import CrewIntro from '../CrewIntro';
import CrewThumbnail from '../CrewThumbnail';

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
