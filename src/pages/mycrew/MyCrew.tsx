import React, { useState } from 'react';
import styled from 'styled-components';

import heading from '../../styledComponent/heading';
import colors from '../../assets/styles/color';

import ParticipatedIn from '../../components/home/mycrew/nav/ParticipatedIn';
import WaitingCrew from '../../components/home/mycrew/nav/WaitingCrew';
import MyCreatedCrew from '../../components/home/mycrew/nav/MyCreatedCrew';
import Footer from '../../components/home/Footer';

const TitleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const NavUl = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  border-bottom: 1px solid ${colors.gray100};
`;

const NavItemLi = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.33%;
`;

const SelectedLi = styled(NavItemLi)`
  border-bottom: 2px solid ${colors.primary};
  translate: 0px 1px;
`;

function MyCrew(): JSX.Element {
  const [selected, setSelected] = useState('참여중');
  return (
    <>
      <main id="home-my-crew">
        {/* 타이틀 */}
        <section id="home-my-crew-title">
          <TitleDiv>
            <heading.BodyLargeBold>내 모임</heading.BodyLargeBold>
          </TitleDiv>
        </section>
        {/* 네비게이션 바 */}
        <nav id="home-my-crew-nav">
          <NavUl>
            {['참여중', '내가 만든 모임', '대기중인 모임'].map(item => {
              if (selected === item) {
                return (
                  <SelectedLi>
                    {' '}
                    <heading.BodyBaseBold style={{ color: `${colors.primary}` }}>{item}</heading.BodyBaseBold>
                  </SelectedLi>
                );
              }
              return (
                <NavItemLi
                  onClick={() => {
                    setSelected(item);
                  }}
                >
                  <heading.BodyBaseBold style={{ color: `${colors.gray400}` }}>{item}</heading.BodyBaseBold>
                </NavItemLi>
              );
            })}
          </NavUl>
        </nav>
        {/* 크루 리스트 */}
        <section id="home-my-crew-content">
          {selected === '참여중' && <ParticipatedIn />}
          {selected === '내가 만든 모임' && <MyCreatedCrew />}
          {selected === '대기중인 모임' && <WaitingCrew />}
        </section>
      </main>
      <footer id="home-footer">
        <Footer page="myCrew" />
      </footer>
    </>
  );
}

export default MyCrew;
