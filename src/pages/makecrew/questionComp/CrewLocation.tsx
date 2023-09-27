import React, { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { locationStr, stepNum } from '../../../atoms/makecrew';

import AnswerBox from './common/AnswerBox';
import SearchModal from '../../../components/modal/SearchModal';

const StyledSection = styled.section``;

function CrewLocation(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [location, setLocation] = useRecoilState(locationStr);
  const setStep = useSetRecoilState(stepNum);

  const openModal = (): void => {
    setIsModalOpen(true);
  };
  const closeModal = (result: any): void => {
    if (result !== undefined) {
      console.log(result);
      if (result.road_address_name === '') {
        setLocation(result.address_name);
      } else {
        setLocation(result.road_address_name);
      }
      setStep(prev => prev + 1);
    }
    setIsModalOpen(false);
  };
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
