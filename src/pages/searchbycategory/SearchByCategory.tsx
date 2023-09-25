import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import colors from '../../assets/styles/color';
import icons from '../../assets/icons';
import './style.css';
import { CrewCard, TagDiv, ImageBox } from './styled';
import { searchByCategory } from '../../api';
import type { SearchByCategory as CategoryInterface } from '../../assets/interfaces';

function SearchByCategory(): JSX.Element {
  const location = useLocation();
  const { interest } = location.state ?? {};

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredList, setFilteredList] = useState<Partial<CategoryInterface[]>>([]);
  const [crewTypeFilter, setCrewTypeFilter] = useState('전체');

  async function fetchData(
    search: string,
    typeFilter: string,
    category: string,
  ): Promise<Partial<CategoryInterface[]>> {
    try {
      let crews = await searchByCategory.getSearchByCategory(category);

      if (search !== '') {
        crews = crews.filter(crew => crew.crew_crewTitle.includes(search));
      }

      if (typeFilter !== '') {
        crews = crews.filter(crew => crew.crew_crewType === typeFilter || typeFilter === '전체');
      }

      if (category !== '') {
        crews = crews.filter(crew => crew.crew_category === category);
      }

      return crews;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  useEffect(() => {
    fetchData(searchTerm, crewTypeFilter, interest)
      .then(crews => {
        setFilteredList(crews);
      })
      .catch(error => {
        console.log(error);
      });
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
              <CrewCard key={spot?.crew_crewTitle}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <TagDiv $color={colors.gray400}>
                    <p style={{ fontSize: '10px', lineHeight: '14px' }}>{spot?.crew_category}</p>
                  </TagDiv>
                  <TagDiv $color={spot?.crew_crewType === '정모' ? colors.blue : colors.blue}>
                    <p style={{ fontSize: '10px', lineHeight: '14px' }}>{spot?.crew_crewType}</p>
                  </TagDiv>
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 700, lineHeight: '24px', letterSpacing: '-0.4px' }}>
                    {spot?.crew_crewTitle}
                  </p>
                  <p style={{ fontSize: '10px', lineHeight: '14px' }}>{spot?.crew_category}</p>
                </div>
                <div>
                  {spot?.crew_thumbnail !== undefined ? <ImageBox>image</ImageBox> : <ImageBox>no image</ImageBox>}
                </div>
                <div>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    <icons.Location />
                    <p style={{ fontSize: '12px', lineHeight: '18px', letterSpacing: '-0.2px' }}>
                      {spot?.crew_crewAddress} 근처
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
                    backgroundColor: `${colors.gray400}`,
                    padding: '4px 10px',
                    borderRadius: '200px',
                  }}
                >
                  <icons.users />
                  <p style={{ fontSize: '12px', lineHeight: '18px', letterSpacing: '-0.2px' }}>
                    {spot?.crewAttendedMember}/{spot?.crew_crewMaxMember}
                  </p>
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
                color: `${colors.gray400}`,
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
