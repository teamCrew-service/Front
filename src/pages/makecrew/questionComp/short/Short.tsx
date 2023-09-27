import React from 'react';
import { useRecoilValue } from 'recoil';
import { stepNum } from '../../../../atoms/makecrew';

import CrewDate from './CrewDate';
import CrewRecommendMember from '../CrewRecommendMember';
import CrewTime from '../CrewTime';
import CrewAge from '../CrewAge';

function Short({ crewType }: { crewType: '장기' | '단기' }): JSX.Element {
  const step = useRecoilValue(stepNum);

  return (
    <>
      {step >= 3 && <CrewDate />}
      {step >= 4 && <CrewRecommendMember crewType={crewType} />}
      {step >= 5 && <CrewTime crewType={crewType} />}
      {step >= 6 && <CrewAge crewType={crewType} />}
    </>
  );
}

export default Short;
