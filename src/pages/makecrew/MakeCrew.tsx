import React from 'react';
import { useRecoilValue } from 'recoil';

import { typeStr, stepNum } from '../../atoms/makecrew';

import './style.css';

import ProgressBar from '../../components/common/ProgressBar';
import CrewType from './questionComp/CrewType';
import CrewCategory from './questionComp/CrewCategory';
import CrewLocation from './questionComp/CrewLocation';
import Short from './questionComp/short/Short';
import Long from './questionComp/long/Long';

function MakeCrew(): JSX.Element {
  const step = useRecoilValue(stepNum);
  const crewType = useRecoilValue(typeStr);

  return (
    <>
      <header>
        <ProgressBar step={step} totalSteps={crewType === '단기' ? 10 : 9} />
      </header>
      <main id="makecrew-container">
        {step >= 0 && <CrewType />}
        {step >= 1 && <CrewCategory />}

        {step >= 2 && <CrewLocation />}
        {crewType === '단기' && <Short crewType={crewType} />}
        {crewType === '장기' && <Long crewType={crewType} />}
      </main>
    </>
  );
}

export default MakeCrew;
