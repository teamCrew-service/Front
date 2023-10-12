import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';

import heading from '../../../styledComponent/heading';
import colors from '../../../assets/styles/color';

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

function MyIntro({ crewType }: { crewType: string }): JSX.Element {
  const [intro, setIntro] = useState<string>('');
  const changeIntro = (event: any): void => {
    setIntro(event.target.value);
  };
  return (
    <section>
      <div>
        {crewType === '장기' && <heading.TitleLargeBold>자기소개 또는 가입 동기</heading.TitleLargeBold>}
        {crewType === '단기' && <heading.TitleLargeBold>참여하게 된 계기</heading.TitleLargeBold>}
        <heading.BodyBaseMedium style={{ color: `${colors.gray500}` }}>
          호스트가 우리에게 더 나은 경험을 제공하는데 도움이 됩니다!
        </heading.BodyBaseMedium>
      </div>
      <TextareaDiv>
        {crewType === '장기' && (
          <>
            <StyledTextarea
              value={intro}
              onChange={changeIntro}
              cacheMeasurements
              maxLength={400}
              placeholder="20자 이상 입력해주세요"
            />
            <p>{intro.length}/400</p>
          </>
        )}
        {crewType === '단기' && (
          <>
            <StyledTextarea
              value={intro}
              onChange={changeIntro}
              cacheMeasurements
              maxLength={80}
              placeholder="20자 이상 입력해주세요"
            />
            <p style={{ color: `${colors.gray400}`, marginLeft: 'auto' }}>{intro.length}/80</p>
          </>
        )}
      </TextareaDiv>
    </section>
  );
}

export default MyIntro;
