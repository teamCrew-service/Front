import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { categoryStr, stepNum } from '../../../atoms/createcrew';

import InterestMatrix from '../../../components/common/InterestMatrix';
import AnswerBox from './common/AnswerBox';

function CrewCategory(): JSX.Element {
  const [category, setCategory] = useRecoilState(categoryStr);
  const setStep = useSetRecoilState(stepNum);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const saveCategory = (input: any): void => {
    setCategory(input);
    setStep(prev => prev + 1);
  };
  return (
    <section>
      <AnswerBox title="02 관심사" value={category} />
      {category === '' && (
        <div style={{ width: '100%', aspectRatio: 4 / 3 }}>
          <InterestMatrix onClick={saveCategory} columns={3} rows={4} />
        </div>
      )}
    </section>
  );
}

export default CrewCategory;
