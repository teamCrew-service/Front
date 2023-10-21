import React from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../../../components/common/ProgressBar';
import icons from '../../../assets/icons';
import ButtonDiv from '../../../styledComponent/ButtonDiv';
import colors from '../../../assets/styles/color';
import SmallCardDiv from '../../../styledComponent/SmallCardDiv';
import BodyLargeBold from '../../../styledComponent/heading/BodyLargeBold';
import TitleLargeBold from '../../../styledComponent/heading/TitleLargeBold';
import { userGender } from '../../../atoms/login';

function Gender(): JSX.Element {
  const navigate = useNavigate();
  const [gender, setGender] = useRecoilState(userGender);

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

  const goPrevFunc = (): void => {
    setGender('');
    navigate('/login/birthday');
  };

  const goNextFunc = (): void => {
    console.log('저장된 성별 = ', gender);
    navigate('/login/profile');
  };

  return (
    <>
      <header>
        <ProgressBar step={3} totalSteps={7} />
      </header>
      <main id="userinfo-main">
        <section style={{ width: 'fit-content', height: 'fit-content' }}>
          <icons.chevronLeft style={{ cursor: 'pointer' }} onClick={goPrevFunc} />
        </section>
        <section>
          <TitleLargeBold>성별</TitleLargeBold>
          <BodyLargeBold style={{ color: `${colors.gray500}` }}>성별을 선택해주세요</BodyLargeBold>
        </section>
        <section style={{ display: 'flex', gap: '12px', width: '44.8%', aspectRatio: '2/1' }}>
          <SmallCardDiv onClick={changeClickedDivStyle} $backColor={colors.primary50}>
            여성
          </SmallCardDiv>
          <SmallCardDiv onClick={changeClickedDivStyle} $backColor={colors.primary50}>
            남성
          </SmallCardDiv>
        </section>
        <section style={{ marginTop: 'auto', marginBottom: '60px' }}>
          {gender !== '' ? (
            <ButtonDiv onClick={goNextFunc}>
              <BodyLargeBold>다음</BodyLargeBold>
            </ButtonDiv>
          ) : (
            <ButtonDiv style={{ backgroundColor: `${colors.gray200}`, color: `${colors.gray400}` }}>
              <BodyLargeBold>성별을 선택해주세요</BodyLargeBold>
            </ButtonDiv>
          )}
        </section>
      </main>
    </>
  );
}

export default Gender;
