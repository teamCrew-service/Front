import React from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import icons from '../../../assets/icons';
import colors from '../../../assets/styles/color';
import heading from '../../../styledComponent/heading';

import ProgressBar from '../../../components/common/ProgressBar';
import ButtonDiv from '../../../styledComponent/ButtonDiv';
import SmallCardDiv from '../../../styledComponent/SmallCardDiv';

import { userGender } from '../../../atoms/login';

function Gender(): JSX.Element {
  const navigate = useNavigate();
  const [gender, setGender] = useRecoilState(userGender);

  const selectGenderFunc = (input: string): void => {
    setGender(input);
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
          <heading.TitleLargeBold>성별</heading.TitleLargeBold>
          <heading.BodyLargeBold style={{ color: `${colors.gray500}` }}>성별을 선택해주세요</heading.BodyLargeBold>
        </section>
        <section style={{ display: 'flex', gap: '12px', width: '44.8%', aspectRatio: '2/1' }}>
          {['남성', '여성'].map(item => {
            if (item === gender) {
              return (
                <SmallCardDiv
                  key={item}
                  $backColor={colors.primary}
                  style={{ color: 'white' }}
                  onClick={() => {
                    selectGenderFunc(item);
                  }}
                >
                  <heading.BodyLargeBold>{item}</heading.BodyLargeBold>
                </SmallCardDiv>
              );
            }

            return (
              <SmallCardDiv
                key={item}
                $backColor={colors.primary50}
                onClick={() => {
                  selectGenderFunc(item);
                }}
              >
                <heading.BodyLargeBold>{item}</heading.BodyLargeBold>
              </SmallCardDiv>
            );
          })}
        </section>
        <section style={{ marginTop: 'auto', marginBottom: '60px' }}>
          {gender !== '' ? (
            <ButtonDiv onClick={goNextFunc}>
              <heading.BodyLargeBold>다음</heading.BodyLargeBold>
            </ButtonDiv>
          ) : (
            <ButtonDiv style={{ backgroundColor: `${colors.gray200}`, color: `${colors.gray400}` }}>
              <heading.BodyLargeBold>성별을 선택해주세요</heading.BodyLargeBold>
            </ButtonDiv>
          )}
        </section>
      </main>
    </>
  );
}

export default Gender;
