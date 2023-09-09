import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
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

function Birthday(): JSX.Element {
  return (
    <>
      <header>
        <ProgressBar step={3} totalSteps={7} />
      </header>
      <main id="category-main">
        <section style={{ width: 'fit-content', height: 'fit-content' }}>
          <Link to="/login/nickname">
            <icons.chevronLeft style={{ cursor: 'pointer' }} />
          </Link>
        </section>
        <section>
          <HeadLineParagraph content="연령대" />
          <BodyLong3Paragraph content="정확한 생년월일을 선택해주세요" color={colors.Gray600} />
        </section>
        <section>
          <ButtonDiv>
            <StyledInput required maxLength={4} type="text" />
          </ButtonDiv>
        </section>
        <section style={{ marginTop: 'auto', marginBottom: '60px' }}>
          <ButtonDiv divColor={colors.blue}>
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
              to="/login/gender"
            >
              <ButtonDivParagraph>다음</ButtonDivParagraph>
            </Link>
          </ButtonDiv>
        </section>
      </main>
    </>
  );
}

export default Birthday;
