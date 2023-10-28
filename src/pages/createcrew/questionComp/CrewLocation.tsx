import React, { useState, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { latLngNum, locationStr, stepNum } from '../../../atoms/createcrew';

import AnswerBox from './common/AnswerBox';
import SearchModal from '../../../components/modal/SearchModal';

const StyledSection = styled.section``;

function CrewLocation(): JSX.Element {
  const [location, setLocation] = useRecoilState(locationStr);
  const setLatLng = useSetRecoilState(latLngNum);
  const [step, setStep] = useRecoilState(stepNum);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  const openModal = (): void => {
    if (step === 2) {
      setIsModalOpen(true);
    }
  };

  const closeModal = (result: any): void => {
    if (result !== undefined) {
      console.log(result);
      if (result.road_address_name === '') {
        setLocation(result.address_name);
      } else {
        setLocation(result.road_address_name);
      }
      setLatLng({
        lat: result.y,
        lng: result.x,
      });
      setStep(prev => prev + 1);
    }
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (step === 2) {
      setIsModalOpen(true);
    }
  }, [step]);

  return (
    <>
      {isModalOpen && <SearchModal title="지역 위치" closeModal={closeModal} />}
      <StyledSection onClick={openModal}>
        <AnswerBox title="03 위치" value={location} />
      </StyledSection>
    </>
  );
}

export default CrewLocation;
