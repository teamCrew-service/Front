import React from 'react';

import { AnswerBoxStyle } from '../../styled';
import BodyLargeBold from '../../../../styledComponent/heading/BodyLargeBold';

function AnswerBox({ title, value }: { title: string; value: any }): JSX.Element {
  return (
    <AnswerBoxStyle $isActive={value !== ''}>
      <BodyLargeBold>{title}</BodyLargeBold>
      {value !== '' && <BodyLargeBold style={{ color: 'black' }}>{value}</BodyLargeBold>}
    </AnswerBoxStyle>
  );
}

export default AnswerBox;
