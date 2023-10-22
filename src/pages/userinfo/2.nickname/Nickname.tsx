import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import BodySmallMedium from '../../../styledComponent/heading/BodySmallMedium';
import ButtonDiv from '../../../styledComponent/ButtonDiv';

import ProgressBar from '../../../components/common/ProgressBar';

import icons from '../../../assets/icons';
import colors from '../../../assets/styles/color';

import { StyledInput } from '../styled';

import TitleLargeBold from '../../../styledComponent/heading/TitleLargeBold';
import BodyLargeBold from '../../../styledComponent/heading/BodyLargeBold';

import { userNickName } from '../../../atoms/login';

import { login } from '../../../api';

function Nickname(): JSX.Element {
  const navigate = useNavigate();
  const [nickname, setNickname] = useRecoilState(userNickName);

  const saveNicknameFunc = (event: any): void => {
    setNickname(event.target.value);
  };

  const saveUserNickname = (): void => {
    login
      .nickCheck(nickname)
      .then(() => {
        console.log('저장된 닉네임 = ', nickname);
        navigate('/login/birthday');
      })
      .catch(() => {});
  };

  const goPrevPage = (): void => {
    setNickname('');
    navigate('/login/category');
  };

  return (
    <>
      <header>
        <ProgressBar step={1} totalSteps={7} />
      </header>
      <main id="userinfo-main">
        <section style={{ width: 'fit-content', height: 'fit-content' }}>
          <icons.chevronLeft style={{ cursor: 'pointer' }} onClick={goPrevPage} />
        </section>
        <section>
          <TitleLargeBold>닉네임</TitleLargeBold>
          <BodySmallMedium style={{ color: `${colors.gray700}` }}>
            친구들에게 불리고 싶은 닉네임을 입력해주세요
          </BodySmallMedium>
        </section>
        <section>
          <ButtonDiv>
            <StyledInput value={nickname} onChange={saveNicknameFunc} required type="text" />
          </ButtonDiv>
        </section>
        <section style={{ marginTop: 'auto', marginBottom: '60px' }}>
          {nickname !== '' ? (
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
