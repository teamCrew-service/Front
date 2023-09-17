import React from 'react';
import './style.css';
import HeadLine from '../../styledComponent/heading/HeadLine';
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
          <HeadLine>내 주변 크루</HeadLine>
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
              <CrewCard to={`/detail/${spot.crewId}`} key={spot.crewTitle}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <TagDiv $color={colors.Gray300}>
                    <p style={{ fontSize: '10px', lineHeight: '14px' }}>{spot.category}</p>
                  </TagDiv>
                  {/* <TagDiv $color={spot.crewType === '정모' ? colors.blue : colors.red}>
                    <p style={{ fontSize: '10px', lineHeight: '14px' }}>{spot.crewType}</p>
                  </TagDiv> */}
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 700, lineHeight: '24px', letterSpacing: '-0.4px' }}>
                    {spot.crewTitle}
                  </p>
                  {/* <p style={{ fontSize: '10px', lineHeight: '14px' }}>{spot.subTitle}</p> */}
                </div>
                <div>{spot.thumbnail !== undefined ? <ImageBox>image</ImageBox> : <ImageBox>no image</ImageBox>}</div>
                <div>
                  {spot.crewDDay !== undefined && (
                    <div style={{ display: 'flex', gap: '2px' }}>
                      <icons.Calendar />
                      <p style={{ fontSize: '12px', lineHeight: '18px', letterSpacing: '-0.2px' }}>
                        {useCalDate(new Date(spot.crewDDay))}
                      </p>
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: '2px' }}>
                    <icons.Location />
                    <p style={{ fontSize: '12px', lineHeight: '18px', letterSpacing: '-0.2px' }}>
                      {spot.crewAddress} 근처
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
                  {/* <p style={{ fontSize: '12px', lineHeight: '18px', letterSpacing: '-0.2px' }}>{spot.current}/8</p> */}
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