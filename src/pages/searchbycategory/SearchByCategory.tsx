import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import colors from '../../assets/styles/color';
import icons from '../../assets/icons';
import './style.css';
import { CrewCard, TagDiv, ImageBox } from './styled';
import MockData from './mockdata';

function SearchByCategory(): JSX.Element {
  const location = useLocation();
  const { interest } = location.state ?? {};

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredList, setFilteredList] = useState(MockData); // mock data 사용 api 연결 후 수정
  const [crewTypeFilter, setCrewTypeFilter] = useState('전체');

  useEffect(() => {
    let crews = MockData; // mock data 사용 api 연결 후 수정

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
      <section className="search-by-category-in-search-and-sorting">
        <div className="search-field">
          <input
            className="search-input"
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
            }}
            placeholder=""
          />
        </div>
        <div className="sorting-button-container">
          <button
            type="button"
            className={crewTypeFilter === '전체' ? 'on' : 'off'}
            onClick={() => {
              setCrewTypeFilter('전체');
            }}
          >
            전체
          </button>
          <button
            type="button"
            className={crewTypeFilter === '정모' ? 'on' : 'off'}
            onClick={() => {
              setCrewTypeFilter('정모');
            }}
          >
            정모
          </button>
          <button
            type="button"
            className={crewTypeFilter === '번개' ? 'on' : 'off'}
            onClick={() => {
              setCrewTypeFilter('번개');
            }}
          >
            번개
          </button>
        </div>
      </section>
      <section className="search-by-category-card-div">
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
