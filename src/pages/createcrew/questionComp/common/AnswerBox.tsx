import React from 'react';

import { AnswerBoxStyle } from '../../styled';
import BodyLargeBold from '../../../../styledComponent/heading/BodyLargeBold';

import colors from '../../../../assets/styles/color';

function AnswerBox({ title, value }: { title: string; value: any }): JSX.Element {
  return (
    <AnswerBoxStyle $isActive={value !== ''}>
      <BodyLargeBold style={{ color: `${colors.gray400}` }}>{title}</BodyLargeBold>
      {value !== '' && (
        <BodyLargeBold style={{ color: 'black' }}>
          {value.includes('%2F') === true ? value.replace('%2F', '/') : value}
        </BodyLargeBold>
      )}
    </AnswerBoxStyle>
  );
}

export default AnswerBox;
