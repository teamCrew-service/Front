import ProgressBar from 'components/molecules/ProgressBar';
import React from 'react';
import icons from 'assets/icons';
import './CategoryStyle.css';
import HeadLineParagraph from 'components/atoms/P/HeadlineParagraph/HeadLineParagraph';
import BodyLong3Paragraph from 'components/atoms/P/BodyLong3Paragraph/BodyLong3Paragraph';
import colors from 'assets/styles/color';
import CategoryGrid from 'components/molecules/CategoryGrid';
import { Link } from 'react-router-dom';
import ButtonDiv from 'components/atoms/Div/ButtonDiv/ButtonDiv';
import ButtonDivParagraph from 'components/atoms/P/ButtonDivParagraph/ButtonDivParagraph';

function Category(): JSX.Element {
  return (
    <>
      <header>
        <ProgressBar step={1} totalSteps={7} />
      </header>
      <main>
        <section>
          <icons.chevronLeft style={{ cursor: 'pointer' }} />
        </section>
        <section>
          <HeadLineParagraph content="관심있는 주제" />
          <BodyLong3Paragraph content="관심있는 주제를 3가지 이상 선택해 주세요" color={colors.Gray600} />
        </section>
        <section>
          <CategoryGrid />
        </section>
        <section style={{ marginTop: 'auto', marginBottom: '60px' }}>
          <ButtonDiv onClick={() => {}} divColor={colors.Gray200} fontColor={colors.Gray500}>
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
              to="login/nickname"
            >
              <ButtonDivParagraph>3개 이상 선택</ButtonDivParagraph>
            </Link>
          </ButtonDiv>
        </section>
      </main>
    </>
  );
}

export default Category;
