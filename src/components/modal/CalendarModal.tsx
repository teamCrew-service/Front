import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Calendar from '../common/calendar/Calendar';
import { dateDate, stepNum } from '../../atoms/createcrew';
import colors from '../../assets/styles/color';
import BodyLargeBold from '../../styledComponent/heading/BodyLargeBold';
import TitleLargeBold from '../../styledComponent/heading/TitleLargeBold';

const ModalContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 1;
`;

const Modal = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom: 0px;
  width: 100%;
  height: 60%;
  background-color: white;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  z-index: 2;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 20px 16px;
`;

const NormalBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${colors.gray100};
  border-radius: 8px;
  color: ${colors.gray500};
`;
const ActiveBtn = styled(NormalBtn)`
  background-color: ${colors.primary};
  color: white;
`;

function CalendarModal({ closeModal }: { closeModal: () => void }): JSX.Element {
  const [stage, setStage] = useState<number>(0);
  const input = useRef({
    timeTable: '오전',
    time: 1,
    minutes: 0,
  });

  const setStep = useSetRecoilState(stepNum);
  const [selectedDate, setSelectedDate] = useRecoilState(dateDate);
  const setTime = useSetRecoilState(dateDate);
  const completFunc = (): void => {
    setStep(prev => prev + 1);
  };
  return (
    <ModalContainer>
      <Modal>
        {stage === 0 && (
          <>
            <Header>
              <TitleLargeBold>날짜선택</TitleLargeBold>
              <TitleLargeBold onClick={closeModal}>X</TitleLargeBold>
            </Header>
            <div>
              <Calendar setDate={setSelectedDate} clickEvent showToday={false} showSelect selectedDate={selectedDate} />
            </div>
            <div style={{ width: '100%', height: '56px', marginTop: '10px', padding: '0px 16px' }}>
              {selectedDate.year === null || selectedDate.month === null || selectedDate.date === null ? (
                <NormalBtn>
                  <BodyLargeBold>다음</BodyLargeBold>
                </NormalBtn>
              ) : (
                <ActiveBtn
                  onClick={() => {
                    setStage(prev => prev + 1);
                  }}
                >
                  <BodyLargeBold>다음</BodyLargeBold>
                </ActiveBtn>
              )}
            </div>
          </>
        )}
        {stage === 1 && (
          <>
            <Header>
              <TitleLargeBold>시간선택</TitleLargeBold>
              <TitleLargeBold onClick={closeModal}>X</TitleLargeBold>
            </Header>
            <div style={{ display: 'flex' }}>
              <select
                onChange={event => {
                  input.current = { ...input.current, timeTable: event.target.value };
                }}
              >
                <option value="오전">오전</option>
                <option value="오후">오후</option>
              </select>
              <select
                onChange={event => {
                  input.current = { ...input.current, time: Number(event.target.value) };
                }}
              >
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map(item => (
                  <option key={item} value={item}>
                    {item}시
                  </option>
                ))}
              </select>
              <select
                onChange={event => {
                  input.current = { ...input.current, minutes: Number(event.target.value) };
                }}
              >
                {['00', '10', '20', '30', '40', '50'].map(item => (
                  <option key={item} value={item}>
                    {item}분
                  </option>
                ))}
              </select>
            </div>
            <div style={{ width: '100%', height: '56px', marginTop: '10px', padding: '0px 16px' }}>
              {input.current.timeTable === '' || input.current.time === null || input.current.minutes === null ? (
                <NormalBtn>
                  <BodyLargeBold>완료</BodyLargeBold>
                </NormalBtn>
              ) : (
                <ActiveBtn
                  onClick={() => {
                    let newDate = selectedDate;
                    newDate = { ...newDate, timeTable: input.current.timeTable };
                    newDate = { ...newDate, time: input.current.time };
                    newDate = { ...newDate, minutes: input.current.minutes };
                    setTime(newDate);
                    completFunc();
                    closeModal();
                  }}
                >
                  <BodyLargeBold>완료</BodyLargeBold>
                </ActiveBtn>
              )}
            </div>
          </>
        )}
      </Modal>
    </ModalContainer>
  );
}

export default CalendarModal;
