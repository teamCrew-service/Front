import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnBoarding.css';
import icons from '../../icons';
import Title from '../../components/Title';
import ProgressBar from '../../components/ProgressBar';
import Btn from '../../components/Btn';
import Img from '../../components/Img';
import SplashDiv from '../../styledComponent/styledDiv/SplashDiv';

function OnBoarding(): JSX.Element {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);

  const goNextStep = (): void => {
    if (step === 3) {
      navigate('/login');
      return;
    }
    setStep(prev => prev + 1);
  };

  return (
    <>
      <SplashDiv>
        <icons.TeamLogo className="double-logo" />
      </SplashDiv>
      <header>
        <ProgressBar step={step} />
      </header>
      <Title step={step} margin={{ top: 68 }} />
      <Img step={step} />
      <Btn
        onClick={() => {
          goNextStep();
        }}
        step={step}
      />
    </>
  );
}

export default OnBoarding;
