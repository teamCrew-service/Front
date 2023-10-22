import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import { useRecoilState } from 'recoil';
import ProgressBar from '../../../components/common/ProgressBar';

import ButtonDiv from '../../../styledComponent/ButtonDiv';

import icons from '../../../assets/icons';
import colors from '../../../assets/styles/color';
import heading from '../../../styledComponent/heading';

import { userBirtYear } from '../../../atoms/login';

import 'swiper/css';
import '../style.css';

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
  const navigate = useNavigate();
  const yearList = [1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000];
  const [open, setOpen] = useState<boolean>(false);
  const [myBirthYear, setMyBirthYear] = useRecoilState(userBirtYear);

  const openSelectWindow = (): void => {
    setOpen(true);
  };

  const closeSelectWindow = (): void => {
    setOpen(false);
  };

  const goPrevFunc = (): void => {
    setMyBirthYear('');
    navigate('/login/nickname');
  };

  const goNextFunc = (): void => {
    console.log('저장된 출생년도 = ', myBirthYear);
    navigate('/login/gender');
  };

  return (
    <>
      <header>
        <ProgressBar step={2} totalSteps={7} />
      </header>
      <main id="userinfo-main">
        <section style={{ width: 'fit-content', height: 'fit-content' }}>
          <icons.chevronLeft style={{ cursor: 'pointer' }} onClick={goPrevFunc} />
        </section>
        <section>
          <heading.TitleLargeBold>연령대</heading.TitleLargeBold>
          <heading.BodySmallMedium style={{ color: `${colors.gray700}` }}>
            정확한 생년월일을 선택해주세요
          </heading.BodySmallMedium>
        </section>
        <section>
          <ButtonDiv onClick={openSelectWindow} style={{ backgroundColor: `${colors.primary50}`, color: 'black' }}>
            <heading.BodyBaseMedium>{myBirthYear}</heading.BodyBaseMedium>
          </ButtonDiv>
        </section>
        <section style={{ marginTop: 'auto', marginBottom: `${open ? '0px' : '60px'}` }}>
          {!open && myBirthYear !== '' && (
            <ButtonDiv onClick={goNextFunc}>
              <heading.BodyLargeBold>다음</heading.BodyLargeBold>
            </ButtonDiv>
          )}
          {!open && myBirthYear === '' && (
            <ButtonDiv style={{ backgroundColor: `${colors.gray200}`, color: `${colors.gray400}` }}>
              <heading.BodyLargeBold>생년월일을 선택해주세요</heading.BodyLargeBold>
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
                  swiper.activeIndex = swiper.slides.findIndex(slide => slide.innerText === myBirthYear);
                }}
                onSlideChange={swiper => {
                  setMyBirthYear(swiper.slides[swiper.activeIndex].innerText);
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
