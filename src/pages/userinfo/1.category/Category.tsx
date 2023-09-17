import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from '../../../components/common/ProgressBar';
import icons from '../../../assets/icons';
import HeadLine from '../../../styledComponent/heading/HeadLine';
import BodyLong3Paragraph from '../../../styledComponent/heading/BodyLong3Paragraph';
import colors from '../../../assets/styles/color';
import InterestMatrix from '../../../components/common/InterestMatrix';
import ButtonDiv from '../../../styledComponent/ButtonDiv';

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
        <ProgressBar step={0} totalSteps={7} />
      </header>
      <main id="userinfo-main">
        <section style={{ width: 'fit-content', height: 'fit-content' }}>
          <Link to="/login">
            <icons.chevronLeft style={{ cursor: 'pointer' }} />
          </Link>
        </section>
        <section>
          <HeadLine>관심있는 주제</HeadLine>
          <BodyLong3Paragraph style={{ color: `${colors.Gray600}` }}>
            관심있는 주제를 3가지 이상 선택해 주세요
          </BodyLong3Paragraph>
        </section>
        <section id="category-grid-container">
          <InterestMatrix onClick={selectCategory} />
        </section>
        <section style={{ marginTop: 'auto', marginBottom: '60px' }}>
          {selectedCategoryList.length >= 3 ? (
            <ButtonDiv onClick={saveSelectedCategory} style={{ backgroundColor: `${colors.primary}` }}>
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
                다음
              </Link>
            </ButtonDiv>
          ) : (
            <ButtonDiv style={{ backgroundColor: `${colors.Gray200}`, color: `${colors.Gray500}` }}>
              3개 이상 선택
            </ButtonDiv>
          )}
        </section>
      </main>
    </>
  );
}

export default Category;
