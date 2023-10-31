import React from 'react';
import styled from 'styled-components';
import type { Schedule } from '../../assets/interfaces';

const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  background-color: rgba(15, 3, 3, 0.25);
`;

function CalendarEventModal({
  eventInfo,
  closeModal,
}: {
  eventInfo: Schedule | null;
  closeModal: () => void;
}): JSX.Element {
  return (
    <Container onClick={closeModal}>
      <div
        style={{
          width: '50%',
          height: '50%',
          backgroundColor: 'white',
        }}
      >
        <p>{eventInfo!.scheduleTitle}</p>
        <p>{eventInfo!.scheduleContent}</p>
      </div>
    </Container>
  );
}

export default CalendarEventModal;
