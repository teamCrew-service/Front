import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import ProgressBar from '../../../components/common/ProgressBar';
import icons from '../../../assets/icons';
import BodySmallMedium from '../../../styledComponent/heading/BodySmallMedium';
import colors from '../../../assets/styles/color';
import InterestMatrix from '../../../components/common/InterestMatrix';
import TitleLargeBold from '../../../styledComponent/heading/TitleLargeBold';
import GoPageBtn from '../components/GoPageBtn';
import category from '../../../atoms/login';

function Category(): JSX.Element {
  const [selectedCategoryList, setSelectedCategoryList] = useRecoilState(category);
  const selectCategory = (input: any): void => {
    console.log('선택된 카테고리 = ', input);
    if (selectedCategoryList.includes(input)) {
      setSelectedCategoryList(prev => prev.filter(item => item !== input));
      return;
    }
    setSelectedCategoryList(prev => [...prev, input]);
  };
  const saveSelectedCategory = (): void => {
    let saveItem = '';
    // eslint-disable-next-line array-callback-return
    selectedCategoryList.map((item: string, index) => {
      if (index === 0) {
        saveItem = item;
        return;
      }
      saveItem += `,${item}`;
    });
    sessionStorage.setItem('category', saveItem);
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
          <TitleLargeBold>관심있는 주제</TitleLargeBold>
          <BodySmallMedium style={{ color: `${colors.gray700}` }}>
            관심있는 주제를 3가지 이상 선택해 주세요
          </BodySmallMedium>
        </section>
        <section id="category-grid-container">
          <InterestMatrix onClick={selectCategory} columns={4} rows={3} />
        </section>
        <GoPageBtn
          judge={selectedCategoryList.length >= 3}
          path="/login/nickname"
          prevTitle="3개 이상 선택"
          action={saveSelectedCategory}
        />
      </main>
    </>
  );
}

export default Category;
