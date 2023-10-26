import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import colors from '../../assets/styles/color';
import icons from '../../assets/icons';
import './style.css';
import CrewCard from '../../components/common/CrewCard';
import heading from '../../styledComponent/heading';
import { SearchingDiv, SearchingInput, SearchingNav, NavItem, ListBox } from './styled';
import { searchByCategory } from '../../api';
import type { SearchByCategory as CategoryInterface } from '../../assets/interfaces';

function SearchByCategory(): JSX.Element {
  const navigate = useNavigate();
  // 선택된 카테고리
  const { interest }: { interest: string } = useLocation().state;
  // const { interest } = location.state ?? {};

  // 검색 시 사용되는 항목
  const [searchTerm, setSearchTerm] = useState('');
  const [crewTypeFilter, setCrewTypeFilter] = useState('전체');

  // 검색으로 보여지는 리스트
  const [filteredList, setFilteredList] = useState<Partial<CategoryInterface[]>>([]);

  const {
    data: crewList,
    isLoading,
    isError,
    refetch,
  } = useQuery(
    'getCrewByCategory',
    async () => {
      let category = interest;
      if (interest.includes('%2F')) {
        category = interest.replace('%2F', '/');
      }
      const result = await searchByCategory.getSearchByCategory(category);
      return result;
    },
    {
      onSuccess: res => {
        console.log('카테고리별 크루 = ', res);
      },
      onError: err => {
        console.log('카테고리별 크루 에러 ', err);
      },
      refetchOnWindowFocus: false,
    },
  );

  function fetchData(search: string, typeFilter: string): any {
    let crews = crewList!;
    // 검색 항목으로 리스트 찾기
    if (search !== '') {
      crews = crews.filter(crew => crew.crew_crewTitle.includes(search));
    }

    if (typeFilter !== '') {
      crews = crews.filter(crew => crew.crew_crewType === typeFilter || typeFilter === '전체');
    }
    return crews;
  }

  useEffect(() => {
    if (!isLoading && !isError) {
      const searchedCrewList = fetchData(searchTerm, crewTypeFilter);
      setFilteredList(searchedCrewList);
    }
  }, [searchTerm, crewTypeFilter]);

  return (
    <>
      <header id="interest-header">
        <icons.chevronLeft
          onClick={() => {
            navigate('/home');
          }}
          style={{ cursor: 'pointer' }}
        />
        <heading.BodyLargeBold>
          {interest.includes('%2F') ? interest.replace('%2F', '/') : interest}
        </heading.BodyLargeBold>
        <div style={{ width: '24px' }} />
      </header>
      <main id="interest-main">
        {/* 검색 박스 */}
        <section id="searching-box">
          <SearchingDiv>
            <SearchingInput
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
              }}
            />
            <icons.search />
          </SearchingDiv>
        </section>

        {/* 네비게이션 */}
        <section id="navigation">
          <SearchingNav>
            {['전체', '장기', '단기'].map(item => {
              if (item === crewTypeFilter) {
                return (
                  <NavItem key={item} style={{ backgroundColor: 'black' }}>
                    <heading.BodySmallBold style={{ color: 'white' }}>{item}</heading.BodySmallBold>
                  </NavItem>
                );
              }
              return (
                <NavItem
                  key={item}
                  onClick={() => {
                    setCrewTypeFilter(item);
                  }}
                >
                  <heading.BodySmallMedium>{item}</heading.BodySmallMedium>
                </NavItem>
              );
            })}
          </SearchingNav>
        </section>

        {/* 리스트 박스 */}
        <section id="interest-list-box">
          <ListBox>
            {filteredList.length !== 0 ? (
              filteredList.map(spot => (
                <CrewCard key={spot?.crew_crewId} spot={spot} page="searchbycategory" refetch={refetch} />
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
          </ListBox>
        </section>
      </main>
    </>
  );
}

export default SearchByCategory;
