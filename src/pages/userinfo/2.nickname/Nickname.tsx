import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import BodySmallMedium from '../../../styledComponent/heading/BodySmallMedium';
import ButtonDiv from '../../../styledComponent/ButtonDiv';

import ProgressBar from '../../../components/common/ProgressBar';

import icons from '../../../assets/icons';
import colors from '../../../assets/styles/color';

import { login } from '../../../api';
import TitleLargeBold from '../../../styledComponent/heading/TitleLargeBold';
import BodyLargeBold from '../../../styledComponent/heading/BodyLargeBold';

const StyledInput = styled.input`
  border: none;
  background-color: ${colors.primary100};
  width: 100%;
  height: 100%;
  border-radius: 8px;
  padding: 0 8px;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.41px;
  &:focus {
    outline: none;
  }
`;

function Nickname(): JSX.Element {
  const navigate = useNavigate();
  const [userNickname, setUserNickname] = useState<string>('');
  const setNickname = (event: any): void => {
    setUserNickname(event.target.value);
  };
  const saveUserNickname = (): void => {
    login
      .nickCheck(userNickname)
      .then(() => {
        sessionStorage.setItem('nickname', userNickname);
        navigate('/login/birthday');
      })
      .catch(() => {});
  };
  return (
    <>
      <header>
        <ProgressBar step={1} totalSteps={7} />
      </header>
      <main id="userinfo-main">
        <section style={{ width: 'fit-content', height: 'fit-content' }}>
          <Link to="/login/category">
            <icons.chevronLeft style={{ cursor: 'pointer' }} />
          </Link>
        </section>
        <section>
          <TitleLargeBold>닉네임</TitleLargeBold>
          <BodySmallMedium style={{ color: `${colors.gray700}` }}>
            친구들에게 불리고 싶은 닉네임을 입력해주세요
          </BodySmallMedium>
        </section>
        <section>
          <ButtonDiv>
            <StyledInput onChange={setNickname} required type="text" />
          </ButtonDiv>
        </section>
        <section style={{ marginTop: 'auto', marginBottom: '60px' }}>
          {userNickname !== '' ? (
            <ButtonDiv onClick={saveUserNickname}>
              <BodyLargeBold>다음</BodyLargeBold>
            </ButtonDiv>
          ) : (
            <ButtonDiv style={{ backgroundColor: `${colors.gray200}`, color: `${colors.gray400}` }}>
              <BodyLargeBold>닉네임을 입력해주세요</BodyLargeBold>
            </ButtonDiv>
          )}
        </section>
      </main>
    </>
  );
}

export default Nickname;
