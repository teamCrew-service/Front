import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnBoardingView from './OnBoardingView';

function OnBoarding(): JSX.Element {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const btnContextList = ['다음', '다음', '시작하기'];
  const titleList = [
    '위치를 통해 내 주변의 모임을 찾아봐요!',
    '팀원들이 되는 최적 시간에 함께 만나요!',
    '소통을 통해 진짜 크루가 되어봐요!',
  ];
  const imageList: string[] = [
    'https://cdn.pixabay.com/photo/2017/06/20/22/14/man-2425121_1280.jpg',
    'https://cdn.pixabay.com/photo/2014/12/16/22/25/sunset-570881_1280.jpg',
    'https://cdn.pixabay.com/photo/2019/03/12/12/47/people-4050698_1280.jpg',
  ];
  const goNextStep = (): void => {
    if (step === 3) {
      navigate('/login');
      return;
    }
    setStep(prev => prev + 1);
  };

  return (
    <OnBoardingView
      step={step}
      title={titleList[step - 1]}
      image={imageList[step - 1]}
      btnContext={btnContextList[step - 1]}
      goNextStep={goNextStep}
    />
  );
}

export default OnBoarding;
