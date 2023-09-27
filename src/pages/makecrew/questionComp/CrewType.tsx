import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { typeStr, stepNum } from '../../../atoms/makecrew';

import { QuestionBox, OptionBox } from '../styled';
import BodyBaseBold from '../../../styledComponent/heading/BodyBaseBold';
import AnswerBox from './common/AnswerBox';

function CrewType(): JSX.Element {
  const [crewType, setCrewType] = useRecoilState(typeStr);
  const setStep = useSetRecoilState(stepNum);
  const saveCrewType = (input: string): void => {
    setCrewType(input);
    setStep(prev => prev + 1);
  };
  return (
    <section>
      <AnswerBox title="01 모임 유형" value={crewType} />
      {crewType === '' && (
        <QuestionBox>
          <h1>모임 유형이 어떻게 될까요?</h1>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <OptionBox
              onClick={() => {
                saveCrewType('단기');
              }}
            >
              <BodyBaseBold>단기 모임 (번개)</BodyBaseBold>
            </OptionBox>
            <OptionBox
              onClick={() => {
                saveCrewType('장기');
              }}
            >
              <BodyBaseBold>장기 모임 (정모)</BodyBaseBold>
            </OptionBox>
          </div>
        </QuestionBox>
      )}
    </section>
  );
}

export default CrewType;
