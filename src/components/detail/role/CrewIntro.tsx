import React, { useState } from 'react';

import heading from '../../../styledComponent/heading';
import icons from '../../../assets/icons';

import {
  BlockDiv,
  CrewIntroQuestionContainer,
  QuestionDiv,
  SeparateDiv,
  SeparateBar,
  SubTitle,
} from '../../../pages/detail/styled';

import { IntroContent, IntroTitle } from '../../../layouts/detail/detail-layout';

function CrewIntro({
  crewMemberInfo,
  crewAgeInfo,
  crewContent,
}: {
  crewMemberInfo: string;
  crewAgeInfo: string;
  crewContent: string;
}): JSX.Element {
  const [infoOpen, setInfoOpen] = useState<boolean>(true);
  const infoOpenHandler = (): void => {
    setInfoOpen(prev => !prev);
  };
  return (
    <BlockDiv>
      <IntroTitle>
        <SubTitle>
          <heading.BodyLargeBold>소개</heading.BodyLargeBold>
          {infoOpen ? (
            <icons.chevronUp style={{ cursor: 'pointer' }} onClick={infoOpenHandler} />
          ) : (
            <icons.chevronDown style={{ cursor: 'pointer' }} onClick={infoOpenHandler} />
          )}
        </SubTitle>
      </IntroTitle>
      {/* 소개 - 접었다 피는 부분 */}
      {infoOpen && (
        <IntroContent>
          <CrewIntroQuestionContainer>
            <QuestionDiv>
              <heading.BodyLargeBold>&middot;&nbsp;&nbsp; 우리 모임 사람들의 특징은?</heading.BodyLargeBold>
              <heading.BodyBaseMedium>{crewMemberInfo}</heading.BodyBaseMedium>
            </QuestionDiv>
            <QuestionDiv>
              <heading.BodyLargeBold>&middot;&nbsp;&nbsp; 우리 모임 사람들의 연령대는?</heading.BodyLargeBold>
              <heading.BodyBaseMedium>{crewAgeInfo}</heading.BodyBaseMedium>
            </QuestionDiv>
          </CrewIntroQuestionContainer>
          <SeparateDiv>
            <SeparateBar />
          </SeparateDiv>
          <heading.BodyBaseMedium style={{ padding: '10px 0px' }}>{crewContent}</heading.BodyBaseMedium>
        </IntroContent>
      )}
    </BlockDiv>
  );
}

export default CrewIntro;
