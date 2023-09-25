import React from 'react';
import * as M from '../makeCrewStyle';

interface PropsType {
  setFormData: (event: any) => void;
}
function CrewType({ setFormData }: PropsType): JSX.Element {
  return (
    <M.StepWrap>
      <button type="button" className="btnCondition">
        01모임 유형
      </button>
      <div className="stepCont">
        <h2>모임 유형이 어떻게 될까요?</h2>
        <div>
          <button
            type="button"
            onClick={() => {
              setFormData('유형저장');
            }}
          >
            단기 모임 (번개)
          </button>
          <button type="button">장기 모임 (정모)</button>
        </div>
      </div>
    </M.StepWrap>
  );
}

export default CrewType;
