import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import AnswerBox from './common/AnswerBox';
import { attendMethodBool, stepNum } from '../../../atoms/makecrew';
import { OptionBox, QuestionBox } from '../styled';
import TitleLargeBold from '../../../styledComponent/heading/TitleLargeBold';

function CrewAttendMethod({ crewType }: { crewType: '장기' | '단기' }): JSX.Element {
  const setStep = useSetRecoilState(stepNum);
  const [attendMethod, setAttendMethod] = useRecoilState(attendMethodBool);
  return (
    <section>
      <AnswerBox title={`${crewType === '장기' ? '07' : '08'} 참여 방식`} value={attendMethod} />
      {attendMethod === '' && (
        <QuestionBox>
          <TitleLargeBold>참여 방식을 선택해주세요</TitleLargeBold>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
            <OptionBox
              onClick={() => {
                setAttendMethod('누구나 바로 참여 가능');
                setStep(prev => prev + 1);
              }}
            >
              누구나 바로 참여 가능
            </OptionBox>
            <OptionBox
              onClick={() => {
                setAttendMethod('방장 수락 후 참여 가능');
                setStep(prev => prev + 1);
              }}
            >
              방장 수락 후 참여 가능
            </OptionBox>
          </div>
        </QuestionBox>
      )}
    </section>
  );
}

export default CrewAttendMethod;
