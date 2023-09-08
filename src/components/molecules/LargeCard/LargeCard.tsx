import React from 'react';
import HeadLineParagraph from '../../atoms/P/HeadlineParagraph/HeadLineParagraph';
import LargeCardDiv from '../../atoms/Div/LargeCardDiv/LargeCardDiv';
import LargeCardStyle from './LargeCardStyle';

function LargeCard({ content, goPage = '' }: { content: string; goPage: string }): JSX.Element {
  return (
    <LargeCardStyle to={goPage}>
      <LargeCardDiv>
        <HeadLineParagraph content={content} />
      </LargeCardDiv>
    </LargeCardStyle>
  );
}

export default LargeCard;
