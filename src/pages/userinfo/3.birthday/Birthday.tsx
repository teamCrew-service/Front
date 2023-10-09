import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProgressBar from '../../../components/common/ProgressBar';
import icons from '../../../assets/icons';
import BodySmallMedium from '../../../styledComponent/heading/BodySmallMedium';
import ButtonDiv from '../../../styledComponent/ButtonDiv';
import colors from '../../../assets/styles/color';

import '../style.css';
import TitleLargeBold from '../../../styledComponent/heading/TitleLargeBold';
import BodyLargeBold from '../../../styledComponent/heading/BodyLargeBold';

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: ${colors.primary50};
`;

const SelectedDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-top: 0.3px solid ${colors.gray400};
  border-bottom: 0.3px solid ${colors.gray400};
  color: ${colors.primary};
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: -0.4px;
`;

const StyleOption = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

function Birthday(): JSX.Element {
  const yearList = [1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000];
  const [open, setOpen] = useState<boolean>(false);
  const [birthYear, setBirthYear] = useState<string>('');

  const openSelectWindow = (): void => {
    setOpen(true);
  };

  const closeSelectWindow = (): void => {
    sessionStorage.setItem('birthyear', birthYear);
    setOpen(false);
  };

  return (
    <>
      <header>
        <ProgressBar step={2} totalSteps={7} />
      </header>
      <main id="userinfo-main">
        <section style={{ width: 'fit-content', height: 'fit-content' }}>
          <Link to="/login/nickname">
            <icons.chevronLeft style={{ cursor: 'pointer' }} />
          </Link>
        </section>
        <section>
          <TitleLargeBold>연령대</TitleLargeBold>
          <BodySmallMedium style={{ color: `${colors.gray700}` }}>정확한 생년월일을 선택해주세요</BodySmallMedium>
        </section>
        <section>
          <ButtonDiv onClick={openSelectWindow} style={{ backgroundColor: `${colors.primary50}`, color: 'black' }}>
            <div style={{ width: 'calc(100% - 16px)' }}>{birthYear}</div>
          </ButtonDiv>
        </section>
        <section style={{ marginTop: 'auto', marginBottom: `${open ? '0px' : '60px'}` }}>
          {!open && birthYear !== '' && (
            <ButtonDiv>
              <Link
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
                to="/login/gender"
              >
                <BodyLargeBold>다음</BodyLargeBold>
              </Link>
            </ButtonDiv>
          )}
          {!open && birthYear === '' && (
            <ButtonDiv style={{ backgroundColor: `${colors.gray200}`, color: `${colors.gray400}` }}>
              <BodyLargeBold>생년월일을 선택해주세요</BodyLargeBold>
            </ButtonDiv>
          )}
        </section>

        {open && (
          <section
            style={{
              position: 'absolute',
              left: '0px',
              bottom: '0px',
              width: '100%',
              height: '224px',
              overflow: 'hidden',
            }}
          >
            <StyledContainer>
              <Swiper
                modules={[Mousewheel]}
                mousewheel
                height={224}
                direction="vertical"
                slidesPerView={7}
                centeredSlides
                onSwiper={swiper => {
                  // eslint-disable-next-line no-param-reassign
                  swiper.activeIndex = swiper.slides.findIndex(slide => slide.innerText === birthYear);
                }}
                onSlideChange={swiper => {
                  setBirthYear(swiper.slides[swiper.activeIndex].innerText);
                }}
              >
                {yearList.map(item => (
                  <SwiperSlide
                    style={{
                      width: '100%',
                      height: '32px',
                      color: `${colors.gray200}`,
                      fontSize: '16px',
                      fontWeight: 700,
                      lineHeight: '28px',
                      letterSpacing: '-0.4px',
                    }}
                    key={item}
                  >
                    {({ isActive }) => (
                      <StyleOption>
                        {isActive ? <SelectedDiv onClick={closeSelectWindow}>{item}</SelectedDiv> : item}
                      </StyleOption>
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </StyledContainer>
          </section>
        )}
      </main>
    </>
  );
}

export default Birthday;
