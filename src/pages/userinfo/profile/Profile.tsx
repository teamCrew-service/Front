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

const StyledInput = styled.input`
  border: none;
  background-color: ${colors.Gray100};
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

const StyledP = styled.p`
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: -0.4px;
`;

function Profile(): JSX.Element {
  const [image, setImage] = useState<string>('');

  function handleFileUpload(event: any): void {
    const selectedFile = event.target.files[0];

    if (selectedFile !== undefined) {
      const imageUrl = URL.createObjectURL(selectedFile);
      console.log(imageUrl.split('blob:')[1]);
      setImage(imageUrl);
    }
  }
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
          <Link to="/login/profile">
            <StyledP>건너뛰기</StyledP>
          </Link>
        </section>
        <section>
          <HeadLineParagraph content="프로필 사진" />
          <BodyLong3Paragraph content="나만의 개성과 취향이 잘 드러나는 사진을 등록해주세요" color={colors.Gray600} />
        </section>
        <section style={{ display: 'flex', justifyContent: 'center' }}>
          {image === '' ? (
            <ButtonDiv onClick={() => {}}>
              <StyledInput
                onChange={event => {
                  handleFileUpload(event);
                }}
                required
                type="file"
                accept=".jpg, .jpeg"
              />
            </ButtonDiv>
          ) : (
            <img src={image} alt="선택한 이미지" width="50%" />
          )}
        </section>
        <section style={{ marginTop: 'auto', marginBottom: '60px' }}>
          <ButtonDiv onClick={() => {}} divColor={colors.blue}>
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
        </section>
      </main>
    </>
  );
}

export default Profile;
