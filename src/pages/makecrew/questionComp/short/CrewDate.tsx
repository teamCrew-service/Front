import React, { useState } from 'react';
import styled from 'styled-components';

import { useRecoilState, useSetRecoilState } from 'recoil';

import { dateDate, stepNum } from '../../../../atoms/makecrew';

import AnswerBox from '../common/AnswerBox';
import CalendarModal from '../../../../components/modal/CalendarModal';

const StyleSection = styled.section``;

function CrewDate(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [date, setDate] = useRecoilState(dateDate);
  const setStep = useSetRecoilState(stepNum);

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const saveDate = (input: any): void => {
    setDate(input);
    setStep(prev => prev + 1);
  };

  return (
    <>
      {isModalOpen && <CalendarModal closeModal={closeModal} />}
      <StyleSection onClick={openModal}>
        <AnswerBox
          title="04 날짜"
          value={
            date.year !== null &&
            date.month !== null &&
            date.date !== null &&
            date.timeTable !== '' &&
            date.time !== null &&
            date.minutes !== null
              ? `${date.year}.${date.month + 1}.${date.date} ${date.timeTable} ${date.time}:${
                  date.minutes < 10 ? `0${date.minutes}` : date.minutes
                }`
              : ''
          }
        />
      </StyleSection>
    </>
  );
}

export default CrewDate;
