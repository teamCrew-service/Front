import React from 'react';
import styled from 'styled-components';
import './style.css';
import ProgressBar from '../../components/common/ProgressBar';
import TitleParagraph from '../../styledComponent/heading/TitleParagraph';
import ButtonDiv from '../../styledComponent/ButtonDiv';

const ImageDiv = styled.div<{ $imageURL: string }>`
  width: 89.5%;
  height: 28.82%;
  background-image: url(${props => props.$imageURL});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

function OnBoardingView({
  step,
  title,
  image,
  btnContext,
  goNextStep,
}: {
  step: number;
  title: string;
  image: string;
  btnContext: string;
  goNextStep: () => void;
}): JSX.Element {
  return (
    <>
      <header>
        <ProgressBar step={step} totalSteps={3} />
      </header>
      <main id="onboarding-main">
        <TitleParagraph>{title}</TitleParagraph>
        <ImageDiv $imageURL={image} />
        <div style={{ width: '100%', marginTop: 'auto', marginBottom: '60px' }}>
          <ButtonDiv
            onClick={() => {
              goNextStep();
            }}
          >
            {btnContext}
          </ButtonDiv>
        </div>
      </main>
    </>
  );
}

export default OnBoardingView;
