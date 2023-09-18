import React from 'react';
import styled from 'styled-components';
import './style.css';
import ProgressBar from '../../components/common/ProgressBar';
import TitleLargeBold from '../../styledComponent/heading/TitleLargeBold';
import ButtonDiv from '../../styledComponent/ButtonDiv';

const ImageDiv = styled.div<{ $imageURL: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.$imageURL});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  margin-top: 24px;
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
        <section style={{ marginTop: '68px' }}>
          <TitleLargeBold>{title}</TitleLargeBold>
        </section>
        <section style={{ width: '81.87%', height: '30.79%' }}>
          <ImageDiv $imageURL={image} />
        </section>
        <section style={{ width: '100%', marginTop: 'auto', marginBottom: '60px' }}>
          <ButtonDiv onClick={goNextStep}>{btnContext}</ButtonDiv>
        </section>
      </main>
    </>
  );
}

export default OnBoardingView;
