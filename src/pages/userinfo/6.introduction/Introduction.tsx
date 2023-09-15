import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ProgressBar from '../../../components/common/ProgressBar';
import icons from '../../../assets/icons';
import HeadLineParagraph from '../../../styledComponent/heading/HeadLineParagraph';
import BodyLong3Paragraph from '../../../styledComponent/heading/BodyLong3Paragraph';
import colors from '../../../assets/styles/color';
import ButtonDiv from '../../../styledComponent/ButtonDiv';

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  background-color: ${colors.primary100};
  border: none;
  resize: none;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.2px;
  word-spacing: -5px;
  &:focus {
    outline: none;
  }
`;

function Introduction(): JSX.Element {
  const [intro, setIntro] = useState<string>('');
  const changeIntro = (event: any): void => {
    const { target } = event;
    setIntro(target.value);
  };
  const saveIntro = (): void => {
    sessionStorage.setItem('introduction', intro);
  };
  return (
    <>
      <header>
        <ProgressBar step={5} totalSteps={7} />
      </header>
      <main id="userinfo-main">
        <section style={{ width: 'fit-content', height: 'fit-content' }}>
          <Link to="/login/profile">
            <icons.chevronLeft style={{ cursor: 'pointer' }} />
          </Link>
        </section>
        <section>
          <HeadLineParagraph>자기 소개</HeadLineParagraph>
          <BodyLong3Paragraph style={{ color: `${colors.Gray600}` }}>
            어떤 취미를 가지고 있는지 나에 대해 간단히 소개해 주세요
          </BodyLong3Paragraph>
        </section>
        <section style={{ width: '100%', height: '10.59%', padding: '12px', backgroundColor: `${colors.primary100}` }}>
          <StyledTextArea
            onChange={changeIntro}
            placeholder="예) 최근에 골프를 시작한 골린이 입니다! 직업은 뷰티 마케터입니다"
          />
        </section>
        <section style={{ marginTop: 'auto', marginBottom: '60px' }}>
          {intro.length >= 12 ? (
            <ButtonDiv onClick={saveIntro}>
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
                to="/login/location"
              >
                다음
              </Link>
            </ButtonDiv>
          ) : (
            <ButtonDiv style={{ backgroundColor: `${colors.blueGray200}`, color: `${colors.Gray400}` }}>
              소개를 입력해주세요 (12자 이상)
            </ButtonDiv>
          )}
        </section>
      </main>
    </>
  );
}

export default Introduction;
