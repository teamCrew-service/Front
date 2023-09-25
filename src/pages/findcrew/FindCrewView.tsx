import React from 'react';
import './style.css';
import TitleLargeMedium from '../../styledComponent/heading/TitleLargeMedium';
import { CrewCard, TagDiv, ImageBox, CategoryDiv, BackLink } from './styled';
import useCalDate from '../../util/useCalDate';
import icons from '../../assets/icons';
import colors from '../../assets/styles/color';
import CategoryModal from '../../components/modal/CategoryModal';
import type { Spot } from '../../assets/interfaces';

interface PropsType {
  loading: boolean;
  categoryOpen: boolean;
  category: string;
  categorySelectClose: () => void;
  categorySelectOpen: () => void;
  selectCategory: (event: any) => void;
  mapDiv: any;
  list: Spot[];
}

function FindCrewView({
  loading,
  categoryOpen,
  category,
  categorySelectClose,
  categorySelectOpen,
  selectCategory,
  mapDiv,
  list,
}: PropsType): JSX.Element {
  console.log('re-render');
  return loading ? (
    <main>
      {categoryOpen && <CategoryModal categorySelectClose={categorySelectClose} selectCategory={selectCategory} />}
      <BackLink to="/home">
        <icons.chevronLeft />
      </BackLink>
      <section ref={mapDiv} id="findcrew-map" />
      <section id="findcrew-absolute-div">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <TitleLargeMedium>내 주변 크루</TitleLargeMedium>
          <div
            style={{
              width: 'fit-content',
              height: 'fit-const first = useContext(second)',
              backgroundColor: `${colors.gray200}`,
              textAlign: 'center',
              borderRadius: '200px',
              padding: '2px 8px',
            }}
          >
            + {list.length}
          </div>
        </div>
        <CategoryDiv
          onClick={() => {
            categorySelectOpen();
          }}
        >
          <p style={{ fontSize: '12px', lineHeight: '18px', letterSpacing: '-0.4px', fontWeight: 700 }}>{category}</p>
          <icons.chevronDown />
        </CategoryDiv>
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
          {list.length !== 0 ? (
            list.map(spot => (
              <CrewCard to={`/detail/${spot.crew_crewId}`} key={spot.crew_crewId}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <TagDiv $color="rgb(255, 234, 125, 0.5)">
                    <p style={{ fontSize: '10px', lineHeight: '14px' }}>{spot.crew_category}</p>
                  </TagDiv>
                  <TagDiv $color={spot.crew_crewType === '장기' ? colors.primary100 : colors.point100}>
                    <p style={{ fontSize: '10px', lineHeight: '14px' }}>{spot.crew_crewType}</p>
                  </TagDiv>
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 700, lineHeight: '24px', letterSpacing: '-0.4px' }}>
                    {spot.crew_crewTitle}
                  </p>
                  {/* <p style={{ fontSize: '10px', lineHeight: '14px' }}>{spot.subTitle}</p> */}
                </div>
                <div>
                  {spot.crew_thumbnail !== undefined ? (
                    <ImageBox image={spot.crew_thumbnail} />
                  ) : (
                    <ImageBox image="">no image</ImageBox>
                  )}
                </div>
                <div>
                  {spot.crew_crewDDay !== undefined && (
                    <div style={{ display: 'flex', gap: '2px' }}>
                      <icons.Calendar />
                      <p style={{ fontSize: '12px', lineHeight: '18px', letterSpacing: '-0.2px' }}>
                        {useCalDate(new Date(spot.crew_crewDDay))}
                      </p>
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: '2px' }}>
                    <icons.Location />
                    <p style={{ fontSize: '12px', lineHeight: '18px', letterSpacing: '-0.2px' }}>
                      {spot.crew_crewAddress} 근처
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    gap: '4px',
                    textAlign: 'center',
                    backgroundColor: 'white',
                    padding: '4px 10px',
                    borderRadius: '200px',
                    marginLeft: 'auto',
                  }}
                >
                  <icons.users />
                  <p style={{ fontSize: '12px', lineHeight: '18px', letterSpacing: '-0.2px' }}>
                    {spot.crewAttendedMember}/{spot.crew_crewMaxMember}
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
                color: `${colors.gray200}`,
              }}
            >
              <p style={{ fontWeight: 700, fontSize: '16px', lineHeight: '22px', letterSpacing: '-0.4px' }}>
                이 지역에 결과가 없습니다.
              </p>
              <p style={{ fontWeight: 700, fontSize: '12px', lineHeight: '18px', letterSpacing: '-0.4px' }}>
                지도를 축소해서 재검색 해주세요
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  ) : (
    // 로딩 화면
    <div style={{ width: '100%', height: '812px', border: 'none' }}>loading</div>
  );
}

export default FindCrewView;
