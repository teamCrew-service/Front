import React from 'react';
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
  width: 100%;
  padding: 16px;
  margin-top: 16px;
  border: 1px solid ${colors.primary};
  border-radius: 4px;
`;

function MyIntro({ crewType }: { crewType: string }): JSX.Element {
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
        {crewType === '장기' && <StyledTextarea cacheMeasurements maxLength={400} />}
        {crewType === '단기' && <StyledTextarea cacheMeasurements maxLength={80} />}
      </TextareaDiv>
    </section>
  );
}

export default MyIntro;
