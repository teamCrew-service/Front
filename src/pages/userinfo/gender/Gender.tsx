import React from 'react';
import ProgressBar from 'components/molecules/ProgressBar';
import { Link } from 'react-router-dom';
import icons from 'assets/icons';
import HeadLineParagraph from 'components/atoms/P/HeadlineParagraph/HeadLineParagraph';
import BodyLong3Paragraph from 'components/atoms/P/BodyLong3Paragraph/BodyLong3Paragraph';
import ButtonDiv from 'components/atoms/Div/ButtonDiv/ButtonDiv';
import colors from 'assets/styles/color';
import ButtonDivParagraph from 'components/atoms/P/ButtonDivParagraph/ButtonDivParagraph';
import SmallCardDiv from 'components/atoms/Div/SmallCardDiv/SmallCardDiv';

function Gender(): JSX.Element {
  return (
    <>
      <header>
        <ProgressBar step={4} totalSteps={7} />
      </header>
      <main id="category-main">
        <section style={{ width: 'fit-content', height: 'fit-content' }}>
          <Link to="/login/birthday">
            <icons.chevronLeft style={{ cursor: 'pointer' }} />
          </Link>
        </section>
        <section>
          <HeadLineParagraph content="성별" />
          <BodyLong3Paragraph content="성별을 선택해주세요" color={colors.Gray600} />
        </section>
        <section style={{ display: 'flex', gap: '12px' }}>
          <SmallCardDiv>여성</SmallCardDiv>
          <SmallCardDiv>남성</SmallCardDiv>
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

export default Gender;
