import React from 'react';
import { useRecoilValue } from 'recoil';
import { stepNum } from '../../../../atoms/makecrew';

import CrewDate from './CrewDate';
import CrewRecommendMember from '../CrewRecommendMember';

function Short({ crewType }: { crewType: '장기' | '단기' }): JSX.Element {
  const step = useRecoilValue(stepNum);

  return (
    <>
      {step >= 3 && <CrewDate />}
      {step >= 4 && <CrewRecommendMember crewType={crewType} />}
    </>
  );
}

export default Short;
