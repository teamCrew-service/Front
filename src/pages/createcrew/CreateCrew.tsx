import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import * as createCrew from '../../atoms/createcrew';

import './style.css';

import icons from '../../assets/icons';

import ProgressBar from '../../components/common/ProgressBar';
import CrewType from './questionComp/CrewType';
import CrewCategory from './questionComp/CrewCategory';
import CrewLocation from './questionComp/CrewLocation';
import Short from './questionComp/short/Short';
import Long from './questionComp/long/Long';
import { ModalHeader } from '../../components/modal/common/styled';

function CreateCrew(): JSX.Element {
  const navigate = useNavigate();

  const [step, setStep] = useRecoilState(createCrew.stepNum);
  const [crewType, setCrewType] = useRecoilState(createCrew.typeStr);
  const setCategory = useSetRecoilState(createCrew.categoryStr);
  const setLocation = useSetRecoilState(createCrew.locationStr);
  const setLatLng = useSetRecoilState(createCrew.latLngNum);
  const setDate = useSetRecoilState(createCrew.dateDate);
  const setRecommend = useSetRecoilState(createCrew.recommendStr);
  const setSpendTime = useSetRecoilState(createCrew.spendTimeStr);
  const setAge = useSetRecoilState(createCrew.ageStr);
  const setAttendMethod = useSetRecoilState(createCrew.attendMethodBool);
  const setCrewTitle = useSetRecoilState(createCrew.titleStr);
  const setThumbnail = useSetRecoilState(createCrew.thumbnailFile);
  const setIntro = useSetRecoilState(createCrew.introStr);
  const setAdvantage = useSetRecoilState(createCrew.advantageStr);
  const setActivity = useSetRecoilState(createCrew.activityStr);
  const setRule = useSetRecoilState(createCrew.ruleStr);
  const setMaxMember = useSetRecoilState(createCrew.maxMemberNum);

  const cleanUpPrevRecoilState = (currentStep: number): void => {
    switch (currentStep) {
      case 1:
        setCrewType('');
        break;
      case 2:
        setCategory('');
        break;
      case 3:
        setLocation('');
        break;
      // 여기부터 작업...
      case 4:
        if (crewType === '단기') {
          setDate({ year: null, month: null, date: null, timeTable: '', time: null, minutes: null });
        } else {
          setRecommend('');
        }
        break;
      case 5:
        if (crewType === '단기') {
          setRecommend('');
        } else {
          setSpendTime('');
        }
        break;
      case 6:
        if (crewType === '단기') {
          setSpendTime('');
        } else {
          setAge('');
        }
        break;
      case 7:
        if (crewType === '단기') {
          setAge('');
        } else {
          setAttendMethod('');
        }
        break;
      case 8:
        if (crewType === '단기') {
          setAttendMethod('');
        } else {
          setCrewTitle('');
        }
        break;
      case 9:
        if (crewType === '단기') {
          setCrewTitle('');
        } else {
          setThumbnail(null);
        }
        break;
      case 10:
        if (crewType === '단기') {
          setThumbnail(null);
        } else {
          setIntro('');
          setAdvantage('');
          setActivity('');
          setRule('');
          setMaxMember(null);
        }
        break;
      case 11:
        console.log('short detail delete complete');
        setIntro('');
        setAdvantage('');
        setActivity('');
        setRule('');
        setMaxMember(null);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    console.log('yess');
    return () => {
      setStep(0);
      setCrewType('');
      setCategory('');
      setLocation('');
      setLatLng({ lat: 0, lng: 0 });
      setDate({ year: null, month: null, date: null, timeTable: '', time: null, minutes: null });
      setRecommend('');
      setSpendTime('');
      setAge('');
      setAttendMethod('');
      setCrewTitle('');
      setThumbnail(null);
      setIntro('');
      setAdvantage('');
      setActivity('');
      setRule('');
      setMaxMember(null);
    };
  }, []);

  return (
    <>
      <ModalHeader>
        {step === 0 ? (
          <div />
        ) : (
          <icons.chevronLeft
            onClick={() => {
              cleanUpPrevRecoilState(step);
              setStep(step - 1);
            }}
          />
        )}
        <icons.close
          onClick={() => {
            navigate('/home');
          }}
        />
      </ModalHeader>
      <div style={{ width: '100%', height: '5px' }}>
        <ProgressBar step={step} totalSteps={crewType === '단기' ? 11 : 10} />
      </div>
      <main id="makecrew-container">
        {step >= 0 && <CrewType />}
        {step >= 1 && <CrewCategory />}
        {step >= 2 && <CrewLocation />}
        {crewType === '단기' && <Short crewType={crewType} />}
        {crewType === '장기' && <Long crewType={crewType} />}
      </main>
    </>
  );
}

export default CreateCrew;
