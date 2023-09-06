import React from 'react';
import HeadLineParagraph from 'components/atoms/P/HeadlineParagraph/HeadLineParagraph';
import icons from 'assets/icons';
import SmallCardDiv from 'components/atoms/Div/SmallCardDiv/SmallCardDiv';

function CategoryModal({
  categorySelectClose,
  selectCategory,
}: {
  categorySelectClose: () => void;
  selectCategory: (item: string) => void;
}): JSX.Element {
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
          <HeadLineParagraph content="관심사" />
          <icons.close
            style={{ cursor: 'pointer' }}
            onClick={() => {
              categorySelectClose();
            }}
          />
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gridTemplateRows: '1fr 1fr 1fr',
            gap: '9px',
            marginTop: '50px',
          }}
        >
          {categoryList.map(item => (
            <SmallCardDiv
              key={item.code}
              onClick={() => {
                selectCategory(item.name);
              }}
            >
              {item.name}
            </SmallCardDiv>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryModal;
