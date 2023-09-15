import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from '../../../components/common/ProgressBar';
import icons from '../../../assets/icons';
import HeadLineParagraph from '../../../styledComponent/heading/HeadLineParagraph';
import BodyLong3Paragraph from '../../../styledComponent/heading/BodyLong3Paragraph';
import ButtonDiv from '../../../styledComponent/ButtonDiv';
import colors from '../../../assets/styles/color';
import SmallCardDiv from '../../../styledComponent/SmallCardDiv';

function Gender(): JSX.Element {
  const [gender, setGender] = useState<string>('');
  const changeClickedDivStyle = (event: any): void => {
    const { target } = event;
    if (gender === ``) {
      target.style.backgroundColor = `${colors.primary}`;
      target.style.color = 'white';
      setGender(target.innerText);
    } else if (gender === '여성') {
      if (target.innerText === '여성') {
        target.style.backgroundColor = ``;
        target.style.color = '';
        setGender('');
      } else if (target.innerText === '남성') {
        target.style.backgroundColor = `${colors.primary}`;
        target.style.color = 'white';
        target.parentElement.children[0].style.backgroundColor = '';
        target.parentElement.children[0].style.color = '';
        setGender(target.innerText);
      }
    } else if (gender === '남성') {
      if (target.innerText === '여성') {
        target.style.backgroundColor = `${colors.primary}`;
        target.style.color = 'white';
        target.parentElement.children[1].style.backgroundColor = '';
        target.parentElement.children[1].style.color = '';
        setGender(target.innerText);
      } else if (target.innerText === '남성') {
        target.style.backgroundColor = ``;
        target.style.color = '';
        setGender('');
      }
    }
  };
  const saveGender = (): void => {
    sessionStorage.setItem('gender', gender);
  };
  return (
    <>
      <header>
        <ProgressBar step={3} totalSteps={7} />
      </header>
      <main id="userinfo-main">
        <section style={{ width: 'fit-content', height: 'fit-content' }}>
          <Link to="/login/birthday">
            <icons.chevronLeft style={{ cursor: 'pointer' }} />
          </Link>
        </section>
        <section>
          <HeadLineParagraph>성별</HeadLineParagraph>
          <BodyLong3Paragraph style={{ color: `${colors.Gray600}` }}>성별을 선택해주세요</BodyLong3Paragraph>
        </section>
        <section style={{ display: 'flex', gap: '12px', width: '44.8%', aspectRatio: '2/1' }}>
          <SmallCardDiv onClick={changeClickedDivStyle}>여성</SmallCardDiv>
          <SmallCardDiv onClick={changeClickedDivStyle}>남성</SmallCardDiv>
        </section>
        <section style={{ marginTop: 'auto', marginBottom: '60px' }}>
          {gender !== '' ? (
            <ButtonDiv onClick={saveGender}>
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
                to="/login/profile"
              >
                다음
              </Link>
            </ButtonDiv>
          ) : (
            <ButtonDiv style={{ backgroundColor: `${colors.Gray200}`, color: `${colors.Gray500}` }}>
              성별을 선택해주세요
            </ButtonDiv>
          )}
        </section>
      </main>
    </>
  );
}

export default Gender;
