import React from 'react';
import { useRecoilValue } from 'recoil';
import { stepNum } from '../../../../atoms/makecrew';

import CrewRecommendMember from '../CrewRecommendMember';

function Long({ crewType }: { crewType: '장기' | '단기' }): JSX.Element {
  const step = useRecoilValue(stepNum);

  return (
    <>
      {step >= 3 && <CrewRecommendMember crewType={crewType} />}
      {step >= 3 && <CrewRecommendMember crewType={crewType} />}
    </>
  );
}

export default Long;
