import React from 'react';
import styled from 'styled-components';
import SmallCardDiv from '../../styledComponent/SmallCardDiv';

const GridDiv = styled.div`
  display: grid;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 8px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
`;

function InterestMatrix({ onClick = () => {} }: { onClick?: (event: any) => void }): JSX.Element {
  const categoryList = [
    { code: 1, name: '친목' },
    { code: 2, name: '음료' },
    { code: 3, name: '여행' },
    { code: 4, name: '운동' },
    { code: 5, name: '책/글' },
    { code: 6, name: '커리어' },
    { code: 7, name: '공연/축제' },
    { code: 8, name: '음악' },
    { code: 9, name: '만들기' },
    { code: 10, name: '사진' },
    { code: 11, name: '반려동물' },
    { code: 12, name: '자유주제' },
  ];
  return (
    <GridDiv>
      {categoryList.map(item => (
        <SmallCardDiv onClick={onClick} key={item.code}>
          {item.name}
        </SmallCardDiv>
      ))}
    </GridDiv>
  );
}

export default InterestMatrix;
