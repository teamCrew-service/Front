import React from 'react';
import LargeCardDiv from 'components/atoms/Div/LargeCardDiv/LargeCardDiv';
import HeadLineParagraph from 'components/atoms/P/HeadlineParagraph/HeadLineParagraph';
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
