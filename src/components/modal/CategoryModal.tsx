import React from 'react';
import HeadLine from '../../styledComponent/heading/HeadLine';
import icons from '../../assets/icons';
import InterestMatrix from '../common/InterestMatrix';

function CategoryModal({
  categorySelectClose,
  selectCategory,
}: {
  categorySelectClose: () => void;
  selectCategory: (item: string) => void;
}): JSX.Element {
  return (
    <div
      style={{
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: '102',
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: '0px',
          width: '100%',
          height: '55%',
          backgroundColor: 'white',
          borderTopLeftRadius: '32px',
          borderTopRightRadius: '32px',
          zIndex: '102',
          padding: '0px 16px',
          paddingTop: '27px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <HeadLine>관심사</HeadLine>
          <icons.close
            style={{ cursor: 'pointer' }}
            onClick={() => {
              categorySelectClose();
            }}
          />
        </div>
        <InterestMatrix onClick={selectCategory} />
      </div>
    </div>
  );
}

export default CategoryModal;
