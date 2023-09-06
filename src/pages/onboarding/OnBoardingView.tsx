import React from 'react';
import './OnBoardingStyle.css';
import ProgressBar from 'components/molecules/ProgressBar';
import TitleParagraph from 'components/atoms/P/TitleParagraph/TitleParagraph';
import ImageDiv from 'components/atoms/Div/ImageDiv/ImageDiv';
import ButtonDiv from 'components/atoms/Div/ButtonDiv/ButtonDiv';
import ButtonDivParagraph from 'components/atoms/P/ButtonDivParagraph/ButtonDivParagraph';

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
      {/* <SplashDiv>
        <icons.TeamLogo className="double-logo" />
      </SplashDiv> */}
      <header>
        <ProgressBar step={step} />
      </header>
      <TitleParagraph context={title} margin={{ top: 68 }} />
      <ImageDiv imageURL={image} />
      <div style={{ marginTop: 'auto', marginBottom: '60px' }}>
        <ButtonDiv
          onClick={() => {
            goNextStep();
          }}
        >
          <ButtonDivParagraph>{btnContext}</ButtonDivParagraph>
        </ButtonDiv>
      </div>
    </>
  );
}

export default OnBoardingView;
