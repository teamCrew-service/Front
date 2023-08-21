import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import icons from '../../icons';
import Title from '../../components/onboarding/Title';
import ProgressBar from '../../components/ProgressBar';
import BlueBtn from '../../components/onboarding/BlueBtn';
import Img from '../../components/onboarding/Img';

function Home(): JSX.Element {
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
      <div className="absolute-div">
        <icons.TeamLogo className="double-logo" />
      </div>
      <header>
        <ProgressBar step={step} />
      </header>
      <Title step={step} margin={{ top: 68 }} />
      <Img step={step} />
      <BlueBtn
        onClick={() => {
          goNextStep();
        }}
        step={step}
      />
    </>
  );
}

export default Home;
