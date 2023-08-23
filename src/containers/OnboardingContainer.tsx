import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnBoardingContainerStyle.css';
import icons from '../assets/icons';
import TitleParagraph from '../components/atoms/P/TitleParagraph/TitleParagraph';
import ProgressBar from '../components/molecules/ProgressBar';
import ButtonDiv from '../components/atoms/Div/ButtonDiv/ButtonDiv';
import ImageDiv from '../components/atoms/Div/ImageDiv/ImageDiv';
import SplashDiv from '../components/atoms/Div/SplashDiv/SplashDiv';
import ButtonDivParagraph from '../components/atoms/P/ButtonDivParagraph/ButtonDivParagraph';

function OnBoardingContainer(): JSX.Element {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const buttonContext = ['다음', '다음', '시작하기'];
  const titleList = [
    '위치를 통해 내 주변의 모임을 찾아봐요!',
    '팀원들이 되는 최적 시간에 함께 만나요!',
    '소통을 통해 진짜 크루가 되어봐요!',
  ];
  const imgList: string[] = [
    'https://cdn.pixabay.com/photo/2017/06/20/22/14/man-2425121_1280.jpg',
    'https://cdn.pixabay.com/photo/2014/12/16/22/25/sunset-570881_1280.jpg',
    'https://cdn.pixabay.com/photo/2019/03/12/12/47/people-4050698_1280.jpg',
  ];

  const goNextStep = (): void => {
    alert('click');
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
      <TitleParagraph context={titleList[step - 1]} margin={{ top: 68 }} />
      <ImageDiv imageURL={imgList[step - 1]} />
      <div style={{ marginTop: 'auto', marginBottom: '60px' }}>
        <ButtonDiv
          onClick={() => {
            goNextStep();
          }}
        >
          <ButtonDivParagraph>{buttonContext[step - 1]}</ButtonDivParagraph>
        </ButtonDiv>
      </div>
    </>
  );
}

export default OnBoardingContainer;
