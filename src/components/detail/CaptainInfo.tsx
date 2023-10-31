import React from 'react';
import styled from 'styled-components';

import heading from '../../styledComponent/heading';
import colors from '../../assets/styles/color';

export const CaptainInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  height: fit-content;
  padding: 12px;
  margin-top: 12px;
  background-color: ${colors.gray50};
  border-radius: 12px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  height: fit-content;
`;

const InterestContainer = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  gap: 6px;
`;

const InterestDiv = styled.div`
  padding: 4px 10px;
  border-radius: 200px;
  background-color: ${colors.yellow};
`;

function CaptainInfo({
  age,
  location,
  message,
  topics,
}: {
  age: number;
  location: string;
  message: string;
  topics: Array<{ userId: string; interestTopic: string }>;
}): JSX.Element {
  return (
    <CaptainInfoContainer>
      <heading.BodySmallMedium>
        {new Date().getFullYear() - age + 1}세 &middot; {location}
      </heading.BodySmallMedium>
      <InfoContainer>
        <heading.BodySmallBold>소개글</heading.BodySmallBold>
        <heading.BodySmallMedium>{message}</heading.BodySmallMedium>
      </InfoContainer>
      <InfoContainer>
        <heading.BodySmallBold>기본 정보</heading.BodySmallBold>
        <heading.BodySmallMedium>뭘 넣을지 모르겠어요!</heading.BodySmallMedium>
      </InfoContainer>
      <InfoContainer>
        <heading.BodySmallBold>관심사</heading.BodySmallBold>
        <InterestContainer>
          {topics.map((item, index) => {
            if (index < 4) {
              return (
                <InterestDiv key={item.interestTopic}>
                  <heading.BodySmallMedium key={item.interestTopic}>
                    {item.interestTopic.includes('%2F') ? item.interestTopic.replace('%2F', '/') : item.interestTopic}
                  </heading.BodySmallMedium>
                </InterestDiv>
              );
            }
            return null;
          })}
        </InterestContainer>
      </InfoContainer>
    </CaptainInfoContainer>
  );
}

export default CaptainInfo;
