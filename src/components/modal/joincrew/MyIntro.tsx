import React from 'react';
import styled from 'styled-components';

import heading from '../../../styledComponent/heading';
import colors from '../../../assets/styles/color';

const StyledTextArea = styled.textarea`
  font-family: Pretendard;
  resize: none;
  width: 100%;
  padding: 12px;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.2px;
  border: 1px solid ${colors.primary};
  border-radius: 4px;
  margin-top: 16px;
  &:focus {
    outline: none;
  }
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
      {crewType === '장기' && <StyledTextArea maxLength={400} />}
      {crewType === '단기' && <StyledTextArea maxLength={80} />}
    </section>
  );
}

export default MyIntro;
