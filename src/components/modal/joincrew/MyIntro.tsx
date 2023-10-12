import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import heading from '../../../styledComponent/heading';
import colors from '../../../assets/styles/color';
import { myIntroStr } from '../../../atoms/joincrew';

const StyledTextarea = styled(TextareaAutosize)`
  font-family: Pretendard;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.2px;
  width: 100%;
  resize: none;
  border: none;
  &:focus {
    outline: none;
  }
`;

const TextareaDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 12px;
  margin-top: 16px;
  border: 1px solid ${colors.primary};
  border-radius: 4px;
  font-family: Pretendard;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.2px;
`;

function MyIntro({ crewType, question }: { crewType: string; question?: string }): JSX.Element {
  const [myIntro, setMyIntro] = useRecoilState(myIntroStr);
  const changeIntro = (event: any): void => {
    setMyIntro(event.target.value);
  };
  return (
    <section>
      <div>
        <heading.TitleLargeBold>{question}</heading.TitleLargeBold>
        <heading.BodyBaseMedium style={{ color: `${colors.gray500}` }}>
          호스트가 우리에게 더 나은 경험을 제공하는데 도움이 됩니다!
        </heading.BodyBaseMedium>
      </div>
      <TextareaDiv>
        {crewType === '장기' && (
          <>
            <StyledTextarea
              onChange={changeIntro}
              cacheMeasurements
              maxLength={400}
              placeholder="20자 이상 입력해주세요"
            />
            <p>{myIntro.length}/400</p>
          </>
        )}
        {crewType === '단기' && (
          <>
            <StyledTextarea
              onChange={changeIntro}
              cacheMeasurements
              maxLength={80}
              placeholder="20자 이상 입력해주세요"
            />
            <p style={{ color: `${colors.gray400}`, marginLeft: 'auto' }}>{myIntro.length}/80</p>
          </>
        )}
      </TextareaDiv>
    </section>
  );
}

export default MyIntro;
