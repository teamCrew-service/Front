import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import heading from '../../../styledComponent/heading';
import colors from '../../../assets/styles/color';
import { myAdjListArray } from '../../../atoms/joincrew';

const GridDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 8px;
  margin-top: 16px;
`;

const ItemDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: ${colors.gray100};
  border-radius: 22px;
`;

const SelectedDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: ${colors.primary};
  border-radius: 22px;
`;

function MyAdj({ question }: { question?: string }): JSX.Element {
  const [adjList, setAdjList] = useRecoilState(myAdjListArray);
  const PlusAdj = (input: string): void => {
    if (adjList.includes(input)) {
      setAdjList(adjList.filter(item => item !== input));
      return;
    }
    setAdjList([...adjList, input]);
  };
  return (
    <section>
      <heading.TitleLargeBold>{question}</heading.TitleLargeBold>
      <GridDiv>
        {[
          '다정한',
          '자신감 있는',
          '공감을 잘하는',
          '창의적인',
          '책임감 있는',
          '정직한',
          '긍정적인',
          '부지런한',
          '침착한',
          '열정적인',
          '매력적인',
          '웃긴',
        ].map(item => {
          if (adjList.includes(item)) {
            return (
              <SelectedDiv
                onClick={() => {
                  PlusAdj(item);
                }}
              >
                <heading.BodyBaseBold style={{ color: 'white' }}>{item}</heading.BodyBaseBold>
              </SelectedDiv>
            );
          }
          return (
            <ItemDiv
              onClick={() => {
                PlusAdj(item);
              }}
            >
              <heading.BodyBaseBold>{item}</heading.BodyBaseBold>
            </ItemDiv>
          );
        })}
      </GridDiv>
    </section>
  );
}

export default MyAdj;
