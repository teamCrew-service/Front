import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import SmallCardDiv from '../../styledComponent/SmallCardDiv';
import category from '../../atoms/login';
import colors from '../../assets/styles/color';
import widgets from '../../assets/icons/widgets';

const GridDiv = styled.div<{ $columns: number; $rows: number }>`
  display: grid;
  justify-content: center;
  width: 100%;
  height: 100%;
  column-gap: 2.05%;
  row-gap: 3.02%;
  grid-template-columns: repeat(${props => props.$columns}, 1fr);
  grid-template-rows: repeat(${props => props.$rows}, 1fr);
`;

function InterestMatrix({
  onClick,
  columns,
  rows,
}: {
  onClick: (input: any) => void;
  columns: number;
  rows: number;
}): JSX.Element {
  const selectedCategory: string[] = useRecoilValue(category);
  const categoryList = [
    { code: 1, name: '여행', item: widgets.Travel, color: `${colors.gray200}` },
    { code: 2, name: '운동', item: widgets.Workout, color: '#D1F4FF' },
    { code: 3, name: '자기계발', item: widgets.Self, color: '#ECE8FF' },
    { code: 4, name: '반려동물', item: widgets.Animal, color: '#E0FFED' },
    { code: 5, name: '책/글', item: widgets.Books, color: '#D1F4FF' },
    { code: 6, name: '공연/축제', item: widgets.Festival, color: '#ECE8FF' },
    { code: 7, name: '영화/음악', item: widgets.MovieMusic, color: '#E0FFED' },
    { code: 8, name: '게임', item: widgets.Game, color: `${colors.gray200}` },
    { code: 9, name: '일일체험', item: widgets.Experience, color: '#ECE8FF' },
    { code: 10, name: '친목', item: widgets.Gather, color: '#E0FFED' },
    { code: 11, name: '정기모임', item: widgets.Regular, color: `${colors.gray200}` },
    { code: 12, name: '단기모임', item: widgets.Meetup, color: '#D1F4FF' },
  ];
  return (
    <GridDiv $columns={columns} $rows={rows}>
      {categoryList.map(item => {
        if (selectedCategory.includes(item.name)) {
          return (
            <SmallCardDiv
              style={{ backgroundColor: `${colors.primary}`, color: 'white' }}
              onClick={() => {
                onClick(item.name);
              }}
              key={item.code}
              $image={item.item}
              $backColor={item.color}
            />
          );
        }
        return (
          <SmallCardDiv
            onClick={() => {
              onClick(item.name);
            }}
            key={item.code}
            $image={item.item}
            $backColor={item.color}
          />
        );
      })}
    </GridDiv>
  );
}

export default InterestMatrix;
