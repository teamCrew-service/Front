import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeadLineParagraph from '../../styledComponent/heading/HeadLineParagraph';
import colors from '../../assets/styles/color';
import icons from '../../assets/icons';
import { CrewCard, TagDiv, ImageBox } from './styled';

function SearchByCategory(): JSX.Element {
  const location = useLocation();
  const { interest } = location.state ?? {};

  let list: any[] = [
    { title: 'T친목', category: '친목', crewType: '정모', subTitle: '소', imageList: [], location: 'dd' },
    { title: 'T음료', category: '음료', crewType: '정모', subTitle: '소', imageList: [], location: 'dd' },
    { title: 'T여행', category: '여행', crewType: '정모', subTitle: '소', imageList: [], location: 'dd' },
    { title: 'T운동', category: '운동', crewType: '정모', subTitle: '소', imageList: [], location: 'dd' },
    { title: 'T책/글', category: '책/글', crewType: '정모', subTitle: '소', imageList: [], location: 'dd' },
    {
      title: 'T커리어',
      category: '커리어',
      crewType: '정모',
      subTitle: '소',
      imageList: [],
      location: 'dd',
    },
    {
      title: 'T공연/축제',
      category: '공연/축제',
      crewType: '정모',
      subTitle: '소',
      imageList: [],
      location: 'dd',
    },
    { title: 'T음악', category: '음악', crewType: '정모', subTitle: '소', imageList: [], location: 'dd' },
    {
      title: 'T만들기',
      category: '만들기',
      crewType: '정모',
      subTitle: '소',
      imageList: [],
      location: 'dd',
    },
    { title: 'T사진', category: '사진', crewType: '정모', subTitle: '소', imageList: [], location: 'dd' },
    {
      title: 'T반려동물',
      category: '반려동물',
      crewType: '정모',
      subTitle: '소',
      imageList: [],
      location: 'dd',
    },
    {
      title: 'T자유주제',
      category: '자유주제',
      crewType: '정모',
      subTitle: '소',
      imageList: [],
      location: 'dd',
    },
  ];

  list = [
    ...list,
    ...list.map(item => ({
      ...item,
      crewType: '번개',
    })),
  ];

  list = list.map(item => ({
    ...item,
    title: `${item.title} ${item.crewType}`,
    current: 5,
  }));

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredList, setFilteredList] = useState(list);
  const [crewTypeFilter, setCrewTypeFilter] = useState('');

  useEffect(() => {
    let crews = list;

    if (searchTerm !== '') {
      crews = crews.filter(crew => crew.title.includes(searchTerm));
    }

    if (crewTypeFilter !== '') {
      crews = crews.filter(crew => crew.crewType === crewTypeFilter || crewTypeFilter === '전체');
    }

    if (interest !== '') {
      crews = crews.filter(crew => crew.category === interest);
    }

    setFilteredList(crews);
  }, [searchTerm, crewTypeFilter, interest]);

  return (
    <main>
      <section id="search-by-category-in-search-and-sorting">
        <input
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value);
          }}
          placeholder="Search by title..."
        />

        <div className="sorting-button-container" style={{ display: 'flex', justifyContent: 'left' }}>
          <button
            type="button"
            onClick={() => {
              setCrewTypeFilter('전체');
            }}
          >
            전체
          </button>
          <button
            type="button"
            onClick={() => {
              setCrewTypeFilter('정모');
            }}
          >
            정모
          </button>
          <button
            type="button"
            onClick={() => {
              setCrewTypeFilter('번개');
            }}
          >
            번개
          </button>
        </div>
      </section>
      <section id="search-by-category-absolute-div">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <HeadLineParagraph>관심사별 모임 찾기</HeadLineParagraph>
          <div
            style={{
              width: 'fit-content',
              height: 'fit-const first = useContext(second)',
              backgroundColor: `${colors.Gray200}`,
              textAlign: 'center',
              borderRadius: '200px',
              padding: '2px 8px',
            }}
          >
            + {filteredList.length}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '100%',
            height: '100%',
            overflowY: 'scroll',
            overflowX: 'hidden',
          }}
        >
          {filteredList.length !== 0 ? (
            filteredList.map(spot => (
              <CrewCard key={spot.title}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <TagDiv $color={colors.Gray300}>
                    <p style={{ fontSize: '10px', lineHeight: '14px' }}>{spot.category}</p>
                  </TagDiv>
                  <TagDiv $color={spot.crewType === '정모' ? colors.blue : colors.red}>
                    <p style={{ fontSize: '10px', lineHeight: '14px' }}>{spot.crewType}</p>
                  </TagDiv>
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 700, lineHeight: '24px', letterSpacing: '-0.4px' }}>
                    {spot.title}
                  </p>
                  <p style={{ fontSize: '10px', lineHeight: '14px' }}>{spot.subTitle}</p>
                </div>
                <div>{spot.imageList !== undefined ? <ImageBox>image</ImageBox> : <ImageBox>no image</ImageBox>}</div>
                <div>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    <icons.Location />
                    <p style={{ fontSize: '12px', lineHeight: '18px', letterSpacing: '-0.2px' }}>
                      {spot.location} 근처
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    right: '16px',
                    display: 'flex',
                    gap: '4px',
                    zIndex: 101,
                    textAlign: 'center',
                    backgroundColor: `${colors.blueGray300}`,
                    padding: '4px 10px',
                    borderRadius: '200px',
                  }}
                >
                  <icons.users />
                  <p style={{ fontSize: '12px', lineHeight: '18px', letterSpacing: '-0.2px' }}>{spot.current}/8</p>
                </div>
                <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 102 }}>
                  <icons.heart style={{ cursor: 'pointer' }} />
                </div>
              </CrewCard>
            ))
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                color: `${colors.Gray200}`,
              }}
            >
              <p style={{ fontWeight: 700, fontSize: '16px', lineHeight: '22px', letterSpacing: '-0.4px' }}>
                검색 결과가 없습니다.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default SearchByCategory;
