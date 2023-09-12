import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from '../../../components/molecules/ProgressBar';
import icons from '../../../assets/icons';
import HeadLineParagraph from '../../../components/atoms/P/HeadlineParagraph/HeadLineParagraph';
import BodyLong3Paragraph from '../../../components/atoms/P/BodyLong3Paragraph/BodyLong3Paragraph';
import ButtonDiv from '../../../components/atoms/Div/ButtonDiv/ButtonDiv';
import colors from '../../../assets/styles/color';
import ButtonDivParagraph from '../../../components/atoms/P/ButtonDivParagraph/ButtonDivParagraph';
import SmallCardDiv from '../../../components/atoms/Div/SmallCardDiv/SmallCardDiv';

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
      <main id="category-main">
        <section style={{ width: 'fit-content', height: 'fit-content' }}>
          <Link to="/login/birthday">
            <icons.chevronLeft style={{ cursor: 'pointer' }} />
          </Link>
        </section>
        <section>
          <HeadLineParagraph content="성별" />
          <BodyLong3Paragraph content="성별을 선택해주세요" color={colors.Gray600} />
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
                <ButtonDivParagraph>다음</ButtonDivParagraph>
              </Link>
            </ButtonDiv>
          ) : (
            <ButtonDiv divColor={colors.Gray200} fontColor={colors.Gray500}>
              <ButtonDivParagraph>성별을 선택해주세요</ButtonDivParagraph>
            </ButtonDiv>
          )}
        </section>
      </main>
    </>
  );
}

export default Gender;
