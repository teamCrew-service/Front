import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from '../../../components/molecules/ProgressBar';
import icons from '../../../assets/icons';
import './CategoryStyle.css';
import HeadLineParagraph from '../../../components/atoms/P/HeadlineParagraph/HeadLineParagraph';
import BodyLong3Paragraph from '../../../components/atoms/P/BodyLong3Paragraph/BodyLong3Paragraph';
import colors from '../../../assets/styles/color';
import CategoryGrid from '../../../components/molecules/CategoryGrid';
import ButtonDiv from '../../../components/atoms/Div/ButtonDiv/ButtonDiv';
import ButtonDivParagraph from '../../../components/atoms/P/ButtonDivParagraph/ButtonDivParagraph';

function Category(): JSX.Element {
  const [selectedCategoryList, setSelectedCategoryList] = useState<string[]>([]);
  const selectCategory = (event: any): void => {
    const { currentTarget } = event;
    const currentBackColor = currentTarget.style.backgroundColor;
    if (currentBackColor === '') {
      currentTarget.style.backgroundColor = colors.primary;
      currentTarget.style.color = 'white';
      setSelectedCategoryList(prev => [...prev, currentTarget.children[0].innerText]);
    } else {
      currentTarget.style.backgroundColor = '';
      currentTarget.style.color = '';
      setSelectedCategoryList(selectedCategoryList.filter(item => item !== currentTarget.children[0].innerText));
    }
  };
  const saveSelectedCategory = (): void => {
    sessionStorage.setItem('category', JSON.stringify(selectedCategoryList));
  };
  useEffect(() => {
    const cookie = window.location.href.split('token=')[1];
    if (cookie !== undefined) {
      document.cookie = `authorization=${cookie};path=/`;
    }
  }, []);
  return (
    <>
      <header>
        <ProgressBar step={1} totalSteps={7} />
      </header>
      <main id="category-main">
        <section style={{ width: 'fit-content', height: 'fit-content' }}>
          <Link to="/login">
            <icons.chevronLeft style={{ cursor: 'pointer' }} />
          </Link>
        </section>
        <section>
          <HeadLineParagraph content="관심있는 주제" />
          <BodyLong3Paragraph content="관심있는 주제를 3가지 이상 선택해 주세요" color={colors.Gray600} />
        </section>
        <section id="category-grid-container">
          <CategoryGrid onClick={selectCategory} />
        </section>
        <section style={{ marginTop: 'auto', marginBottom: '60px' }}>
          {selectedCategoryList.length >= 3 ? (
            <ButtonDiv onClick={saveSelectedCategory} divColor={colors.primary}>
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
                to="/login/nickname"
              >
                <ButtonDivParagraph>다음</ButtonDivParagraph>
              </Link>
            </ButtonDiv>
          ) : (
            <ButtonDiv divColor={colors.Gray200} fontColor={colors.Gray500}>
              <ButtonDivParagraph>3개 이상 선택</ButtonDivParagraph>
            </ButtonDiv>
          )}
        </section>
      </main>
    </>
  );
}

export default Category;
