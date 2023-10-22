import React from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProgressBar from '../../../components/common/ProgressBar';
import icons from '../../../assets/icons';
import BodySmallMedium from '../../../styledComponent/heading/BodySmallMedium';
import colors from '../../../assets/styles/color';
import TitleLargeBold from '../../../styledComponent/heading/TitleLargeBold';
import GoPageBtn from '../components/GoPageBtn';
import { userContent } from '../../../atoms/login';

const StyledTextArea = styled.textarea`
  font-family: Pretendard;
  width: 100%;
  height: 100%;
  background-color: ${colors.primary50};
  border: none;
  resize: none;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.14px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${colors.gray400};
  }
`;

function Introduction(): JSX.Element {
  const navigate = useNavigate();

  const [intro, setIntro] = useRecoilState(userContent);

  const changeIntro = (event: any): void => {
    const { target } = event;
    setIntro(target.value);
  };

  const goPrevFunc = (): void => {
    setIntro('');
    navigate('/login/profile');
  };

  const goNextFunc = (): void => {
    console.log('저장된 자기소개 = ', intro);
    navigate('/login/location');
  };

  return (
    <>
      <header>
        <ProgressBar step={5} totalSteps={7} />
      </header>
      <main id="userinfo-main">
        <section style={{ width: 'fit-content', height: 'fit-content' }}>
          <icons.chevronLeft style={{ cursor: 'pointer' }} onClick={goPrevFunc} />
        </section>
        <section>
          <TitleLargeBold>자기 소개</TitleLargeBold>
          <BodySmallMedium style={{ color: `${colors.gray700}` }}>
            어떤 취미를 가지고 있는지 나에 대해 간단히 소개해 주세요
          </BodySmallMedium>
        </section>
        <section
          style={{
            width: '100%',
            height: '10.59%',
            padding: '12px',
            backgroundColor: `${colors.primary50}`,
            borderRadius: '8px',
          }}
        >
          <StyledTextArea
            value={intro}
            onChange={changeIntro}
            placeholder="예) 최근에 골프를 시작한 골린이 입니다! 직업은 뷰티 마케터입니다"
          />
        </section>
        <GoPageBtn
          judge={intro.length >= 12}
          path="/login/location"
          prevTitle="소개를 입력해주세요(12자 이상)"
          action={goNextFunc}
        />
      </main>
    </>
  );
}

export default Introduction;
