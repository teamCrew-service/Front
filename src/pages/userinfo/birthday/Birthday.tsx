import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import ProgressBar from '../../../components/molecules/ProgressBar';
import icons from '../../../assets/icons';
import HeadLineParagraph from '../../../components/atoms/P/HeadlineParagraph/HeadLineParagraph';
import BodyLong3Paragraph from '../../../components/atoms/P/BodyLong3Paragraph/BodyLong3Paragraph';
import ButtonDiv from '../../../components/atoms/Div/ButtonDiv/ButtonDiv';
import colors from '../../../assets/styles/color';
import ButtonDivParagraph from '../../../components/atoms/P/ButtonDivParagraph/ButtonDivParagraph';

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: ${colors.primary100};
  overflow-y: auto;
  overflow-x: hidden;
  white-space: none;
`;

const StyledOption = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${(1 / 9) * 100}%;
  color: ${colors.Gray400};
  font-size: 18px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: -0.4px;
`;

function Birthday(): JSX.Element {
  const yearList = [
    '',
    '',
    '',
    1987,
    1988,
    1989,
    1990,
    1991,
    1992,
    1993,
    1994,
    1995,
    1996,
    1997,
    1998,
    1999,
    2000,
    '',
    '',
    '',
  ];
  const [open, setOpen] = useState<boolean>(false);
  const [birthYear, setBirthYear] = useState<string>('');
  const [startIndex, setStartIndex] = useState<number>(0);

  const showYearList = yearList.slice(startIndex, startIndex + 7);

  const saveBirthYear = (input: number): void => {
    sessionStorage.setItem('birthyear', String(input));
  };

  const openSelectWindow = (): void => {
    setOpen(true);
  };
  const closeSelectWindow = (event: any): void => {
    setBirthYear(event.currentTarget.innerText);
    saveBirthYear(event.currentTarget.innerText);
    setOpen(false);
  };
  const goNextOption = (): void => {
    if (startIndex !== yearList.length - 7) {
      setStartIndex(prev => prev + 1);
    }
  };
  const goPrevOption = (): void => {
    if (startIndex !== 0) {
      setStartIndex(prev => prev - 1);
    }
  };

  return (
    <>
      <header>
        <ProgressBar step={3} totalSteps={7} />
      </header>
      <main id="category-main">
        <section style={{ width: 'fit-content', height: 'fit-content' }}>
          <Link to="/login/nickname">
            <icons.chevronLeft style={{ cursor: 'pointer' }} />
          </Link>
        </section>
        <section>
          <HeadLineParagraph content="연령대" />
          <BodyLong3Paragraph content="정확한 생년월일을 선택해주세요" color={colors.Gray600} />
        </section>
        <section>
          <ButtonDiv onClick={openSelectWindow} divColor={colors.primary100} fontColor="black">
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
                <ButtonDivParagraph>다음</ButtonDivParagraph>
              </Link>
            </ButtonDiv>
          )}
          {!open && birthYear === '' && (
            <ButtonDiv divColor={colors.Gray200} fontColor={colors.Gray500}>
              <ButtonDivParagraph>생년월일을 선택해주세요</ButtonDivParagraph>
            </ButtonDiv>
          )}
        </section>

        {open && (
          <section style={{ width: '100%', height: '50%', marginBottom: '33px' }}>
            <StyledContainer>
              <StyledOption onClick={goPrevOption}>▲</StyledOption>
              {showYearList.map((item, index) => {
                if (index === 3) {
                  return (
                    <StyledOption onClick={closeSelectWindow} key="selected" style={{ padding: '0px 8px' }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '100%',
                          height: '100%',
                          borderTop: `1px solid ${colors.Gray400}`,
                          borderBottom: `1px solid ${colors.Gray400}`,
                          color: `${colors.primary}`,
                        }}
                      >
                        {item}
                      </div>
                    </StyledOption>
                  );
                }
                return <StyledOption key={Date.now() + Math.random()}>{item}</StyledOption>;
              })}
              <StyledOption onClick={goNextOption}>▼</StyledOption>
            </StyledContainer>
          </section>
        )}
      </main>
    </>
  );
}

export default Birthday;
