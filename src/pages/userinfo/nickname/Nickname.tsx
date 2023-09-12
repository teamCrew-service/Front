import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import ProgressBar from '../../../components/molecules/ProgressBar';
import icons from '../../../assets/icons';
import HeadLineParagraph from '../../../components/atoms/P/HeadlineParagraph/HeadLineParagraph';
import BodyLong3Paragraph from '../../../components/atoms/P/BodyLong3Paragraph/BodyLong3Paragraph';
import ButtonDiv from '../../../components/atoms/Div/ButtonDiv/ButtonDiv';
import colors from '../../../assets/styles/color';
import ButtonDivParagraph from '../../../components/atoms/P/ButtonDivParagraph/ButtonDivParagraph';
import { login } from '../../../api';

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
    login.nickCheck(userNickname).then(
      data => {
        console.log(data);
        sessionStorage.setItem('nickname', userNickname);
        navigate('/login/birthday');
      },
      error => {
        alert(error.response.data.message);
      },
    );
  };
  return (
    <>
      <header>
        <ProgressBar step={1} totalSteps={7} />
      </header>
      <main id="category-main">
        <section style={{ width: 'fit-content', height: 'fit-content' }}>
          <Link to="/login/category">
            <icons.chevronLeft style={{ cursor: 'pointer' }} />
          </Link>
        </section>
        <section>
          <HeadLineParagraph content="닉네임" />
          <BodyLong3Paragraph content="친구들에게 불리고 싶은 닉네임을 입력해주세요" color={colors.Gray600} />
        </section>
        <section>
          <ButtonDiv>
            <StyledInput onChange={setNickname} required type="text" />
          </ButtonDiv>
        </section>
        <section style={{ marginTop: 'auto', marginBottom: '60px' }}>
          {userNickname !== '' ? (
            <ButtonDiv onClick={saveUserNickname}>
              <ButtonDivParagraph>다음</ButtonDivParagraph>
            </ButtonDiv>
          ) : (
            <ButtonDiv divColor={colors.Gray200} fontColor={colors.Gray500}>
              <ButtonDivParagraph>닉네임을 입력해주세요</ButtonDivParagraph>
            </ButtonDiv>
          )}
        </section>
      </main>
    </>
  );
}

export default Nickname;
