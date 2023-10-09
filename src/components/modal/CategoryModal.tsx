import React from 'react';
import styled from 'styled-components';
import TitleLargeBold from '../../styledComponent/heading/TitleLargeBold';
import icons from '../../assets/icons';
import InterestMatrix from '../common/InterestMatrix';

const CategoryModalDiv = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 103;
  padding: 0px 16px;
  padding-top: 27px;
  overflow-x: hidden;
`;

function CategoryModal({
  categorySelectClose,
  selectCategory,
}: {
  categorySelectClose: () => void;
  selectCategory: (item: string) => void;
}): JSX.Element {
  return (
    <CategoryModalDiv>
      <div style={{ display: 'flex', justifyContent: 'space-between', height: '6.4%' }}>
        <TitleLargeBold>관심사</TitleLargeBold>
        <icons.close
          style={{ cursor: 'pointer' }}
          onClick={() => {
            categorySelectClose();
          }}
        />
      </div>
      <div style={{ width: '100%', height: '53.69%' }}>
        <InterestMatrix onClick={selectCategory} columns={3} rows={4} />
      </div>
    </CategoryModalDiv>
  );
}

export default CategoryModal;
