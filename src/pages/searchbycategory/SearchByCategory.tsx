import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import icons from '../../assets/icons';
import './style.css';
import CrewCard from '../../components/common/CrewCard';
import heading from '../../styledComponent/heading';
import { SearchingDiv, SearchingInput, SearchingNav, NavItem, ListBox } from './styled';
import { searchByCategory } from '../../api';
// import type { SearchByCategory as CategoryInterface } from '../../assets/interfaces';
import Loading from '../../components/common/Loading';

function SearchByCategory(): JSX.Element {
  const navigate = useNavigate();
  // 선택된 카테고리
  const { interest }: { interest: string } = useLocation().state;

  // 크루 타입 nav
  const [crewTypeFilter, setCrewTypeFilter] = useState('전체');

  // 검색 시 사용되는 항목
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: crewList,
    isLoading,
    isError,
  } = useQuery(
    'getCrewByCategory',
    async () => {
      const result = await searchByCategory.getSearchByCategory(interest);
      const all = result;
      const long = result.filter(item => item.crew_crewType === '장기');
      const short = result.filter(item => item.crew_crewType === '단기');
      return { all, long, short };
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

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>somthing wrong!</div>;
  }

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
            {searchTerm === '' && (
              <>
                {crewTypeFilter === '전체' &&
                  crewList?.all.length !== 0 &&
                  crewList?.all.map(spot => <CrewCard key={spot?.crew_crewId} spot={spot} page="searchbycategory" />)}
                {crewTypeFilter === '장기' &&
                  crewList?.long.length !== 0 &&
                  crewList?.long.map(spot => <CrewCard key={spot?.crew_crewId} spot={spot} page="searchbycategory" />)}
                {crewTypeFilter === '단기' &&
                  crewList?.short.length !== 0 &&
                  crewList?.short.map(spot => <CrewCard key={spot?.crew_crewId} spot={spot} page="searchbycategory" />)}
              </>
            )}
            {searchTerm !== '' && (
              <>
                {crewTypeFilter === '전체' &&
                  crewList?.all.length !== 0 &&
                  crewList?.all
                    .filter(spot => spot.crew_crewTitle.includes(searchTerm))
                    .map(spot => <CrewCard key={spot?.crew_crewId} spot={spot} page="searchbycategory" />)}
                {crewTypeFilter === '장기' &&
                  crewList?.long.length !== 0 &&
                  crewList?.long
                    .filter(spot => spot.crew_crewTitle.includes(searchTerm))
                    .map(spot => <CrewCard key={spot?.crew_crewId} spot={spot} page="searchbycategory" />)}
                {crewTypeFilter === '단기' &&
                  crewList?.short.length !== 0 &&
                  crewList?.short
                    .filter(spot => spot.crew_crewTitle.includes(searchTerm))
                    .map(spot => <CrewCard key={spot?.crew_crewId} spot={spot} page="searchbycategory" />)}
              </>
            )}
          </ListBox>
        </section>
      </main>
    </>
  );
}

export default SearchByCategory;
