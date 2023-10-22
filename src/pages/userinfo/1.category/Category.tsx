import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import ProgressBar from '../../../components/common/ProgressBar';
import icons from '../../../assets/icons';
import BodySmallMedium from '../../../styledComponent/heading/BodySmallMedium';
import colors from '../../../assets/styles/color';
import InterestMatrix from '../../../components/common/InterestMatrix';
import TitleLargeBold from '../../../styledComponent/heading/TitleLargeBold';
import GoPageBtn from '../components/GoPageBtn';

import { userCategory } from '../../../atoms/login';

function Category(): JSX.Element {
  const navigate = useNavigate();
  const [selectedCategoryList, setSelectedCategoryList] = useRecoilState(userCategory);

  const selectCategory = (input: any): void => {
    // 카테고리가 이미 선택되어 있을 시 제거하는 부분
    if (selectedCategoryList.includes(input)) {
      setSelectedCategoryList(prev => prev.filter(item => item !== input));
      return;
    }
    // 선택한 카테고리를 추가하는 부분
    setSelectedCategoryList(prev => [...prev, input]);
  };

  // 선택한 카테고리들 Recoil atom에 저장하는 함수
  const saveSelectedCategory = (): void => {
    console.log('저장된 카테고리 = ', selectedCategoryList);
  };

  const goLoginPage = (): void => {
    setSelectedCategoryList([]);
    navigate('/login');
  };

  // 첫 로그인 일 시 쿠키 저장하는 부분
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
          <icons.chevronLeft style={{ cursor: 'pointer' }} onClick={goLoginPage} />
        </section>
        <section>
          <TitleLargeBold>관심있는 주제</TitleLargeBold>
          <BodySmallMedium style={{ color: `${colors.gray700}` }}>
            관심있는 주제를 3가지 이상 선택해 주세요
          </BodySmallMedium>
        </section>
        <section id="category-grid-container">
          <InterestMatrix onClick={selectCategory} checkList={selectedCategoryList} columns={4} rows={3} />
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
