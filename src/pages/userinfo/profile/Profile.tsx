import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import ProgressBar from '../../../components/molecules/ProgressBar';
import icons from '../../../assets/icons';
import HeadLineParagraph from '../../../components/atoms/P/HeadlineParagraph/HeadLineParagraph';
import BodyLong3Paragraph from '../../../components/atoms/P/BodyLong3Paragraph/BodyLong3Paragraph';
import ButtonDiv from '../../../components/atoms/Div/ButtonDiv/ButtonDiv';
import colors from '../../../assets/styles/color';
import ButtonDivParagraph from '../../../components/atoms/P/ButtonDivParagraph/ButtonDivParagraph';
import defaultImage from '../../../assets/images/profile.jpg';

const StyledP = styled.p`
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: -0.4px;
  color: ${colors.primary};
  cursor: pointer;
`;

const ImageDiv = styled.div`
  width: 51%;
  aspect-ratio: 1;
  margin-top: 15.45%;
  border-radius: 50%;
`;

function Profile(): JSX.Element {
  const [profile, setProfile] = useState<string>(defaultImage);
  const [isProfileSet, setIsProfileSet] = useState<boolean>(false);
  const changeProfile = (): void => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.addEventListener('change', () => {
      if (fileInput.files === null) return;
      const file = fileInput.files[0];
      const imageURL = URL.createObjectURL(file);
      setProfile(imageURL);
      setIsProfileSet(true);
    });
    fileInput.click();
  };
  const saveProfile = (): void => {
    sessionStorage.setItem('profile', profile);
  };
  return (
    <>
      <header>
        <ProgressBar step={5} totalSteps={7} />
      </header>
      <main id="category-main">
        <section style={{ display: 'flex', justifyContent: 'space-between', width: '100%', height: 'fit-content' }}>
          <Link to="/login/gender">
            <icons.chevronLeft style={{ cursor: 'pointer' }} />
          </Link>
          {!isProfileSet ? (
            <Link onClick={saveProfile} to="/login/profile" style={{ textDecoration: 'none' }}>
              <StyledP>건너뛰기</StyledP>
            </Link>
          ) : (
            <StyledP onClick={changeProfile}>수정하기</StyledP>
          )}
        </section>
        <section>
          <HeadLineParagraph content="프로필 사진" />
          <BodyLong3Paragraph content="나만의 개성과 취향이 잘 드러나는 사진을 등록해주세요" color={colors.Gray600} />
        </section>
        <section
          style={{ display: 'flex', width: '100%', height: '27.09%', justifyContent: 'center', marginTop: '4.93%' }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              aspectRatio: '1',
              backgroundColor: `${colors.primary100}`,
              borderRadius: '12px',
            }}
          >
            <ImageDiv>
              <img src={profile} alt="profile" width="100%" height="100%" style={{ borderRadius: '50%' }} />
            </ImageDiv>
            <div style={{ marginTop: '11.36%' }}>
              <HeadLineParagraph content="김크루" />
            </div>
          </div>
        </section>
        <section style={{ marginTop: 'auto', marginBottom: '60px' }}>
          {isProfileSet ? (
            <ButtonDiv onClick={saveProfile}>
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
                to="/login/profile"
              >
                <ButtonDivParagraph>다음</ButtonDivParagraph>
              </Link>
            </ButtonDiv>
          ) : (
            <ButtonDiv onClick={changeProfile}>
              <ButtonDivParagraph>라이브러리에서 선택</ButtonDivParagraph>
            </ButtonDiv>
          )}
        </section>
      </main>
    </>
  );
}

export default Profile;
