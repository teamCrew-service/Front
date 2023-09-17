import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProgressBar from '../../../components/common/ProgressBar';
import icons from '../../../assets/icons';
import HeadLine from '../../../styledComponent/heading/HeadLine';
import BodyLong3Paragraph from '../../../styledComponent/heading/BodyLong3Paragraph';
import ButtonDiv from '../../../styledComponent/ButtonDiv';
import colors from '../../../assets/styles/color';

import '../style.css';

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: ${colors.primary100};
`;

const SelectedDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-top: 1px solid ${colors.Gray400};
  border-bottom: 1px solid ${colors.Gray400};
  color: ${colors.primary};
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
  const [birthYear, setBirthYear] = useState<string>('1987');

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
          <HeadLine>연령대</HeadLine>
          <BodyLong3Paragraph style={{ color: `${colors.Gray600}` }}>정확한 생년월일을 선택해주세요</BodyLong3Paragraph>
        </section>
        <section>
          <ButtonDiv onClick={openSelectWindow} style={{ backgroundColor: `${colors.primary100}`, color: 'black' }}>
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
                다음
              </Link>
            </ButtonDiv>
          )}
          {!open && birthYear === '' && (
            <ButtonDiv style={{ backgroundColor: `${colors.Gray200}`, color: `${colors.Gray500}` }}>
              생년월일을 선택해주세요
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