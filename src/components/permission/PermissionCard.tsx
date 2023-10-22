import React from 'react';
import styled from 'styled-components';

import heading from '../../styledComponent/heading';
import colors from '../../assets/styles/color';

import type { SingUpItemForm } from '../../assets/interfaces';
import ProfileDiv from '../../styledComponent/ProfileDiv';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
`;

const BtnBox = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  gap: 6px;
  margin-top: 12px;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 48px;
  background-color: black;
  padding: 8px;
  border-radius: 12px;
`;

const NickBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  width: 50%;
  height: 100%;
`;

const SignUpInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  height: fit-content;
  padding: 12px;
  background-color: ${colors.gray50};
  border-radius: 12px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.25);
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InterestBox = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 4px 10px;
  border-radius: 200px;
  background-color: ${colors.yellow};
`;

const BtnStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  border-radius: 8px;
`;

const DenyBtn = styled(BtnStyled)`
  border: 1px solid ${colors.primary100};
  color: ${colors.gray400};
`;

const AcceptBtn = styled(BtnStyled)`
  background-color: ${colors.primary100};
  color: ${colors.primary};
`;

function PermissionCard({ signUpItem, index }: { signUpItem: SingUpItemForm; index: number }): JSX.Element {
  return (
    <CardContainer>
      <TitleBox>
        <NickBox>
          <ProfileDiv profile={signUpItem.profileImage!} />
          <heading.BodyBaseBold style={{ color: 'white' }}>{signUpItem.nickname}</heading.BodyBaseBold>
        </NickBox>
        <heading.BodyLargeBold style={{ color: `${colors.gray400}` }}>
          {index < 10 ? `0${index + 1}` : `${index + 1}`}
        </heading.BodyLargeBold>
      </TitleBox>
      <SignUpInfoBox>
        <heading.BodySmallMedium>{signUpItem.location}</heading.BodySmallMedium>
        <ContentBox>
          <heading.BodySmallBold>자기 소개 또는 가입 동기</heading.BodySmallBold>
          <heading.BodySmallMedium>{signUpItem.answer1}</heading.BodySmallMedium>
        </ContentBox>
        <ContentBox>
          <heading.BodySmallBold>나를 표현하는 3가지 형용사</heading.BodySmallBold>
          <heading.BodySmallMedium>{signUpItem.answer2}</heading.BodySmallMedium>
        </ContentBox>
        <ContentBox>
          <heading.BodySmallBold>관심사</heading.BodySmallBold>
          {signUpItem.interestTopics.map(item => (
            <InterestBox key={item}>
              <heading.BodySmallMedium>{item}</heading.BodySmallMedium>
            </InterestBox>
          ))}
        </ContentBox>
      </SignUpInfoBox>
      <BtnBox>
        <DenyBtn>
          <heading.BodySmallBold>거절</heading.BodySmallBold>
        </DenyBtn>
        <AcceptBtn>
          <heading.BodySmallBold>수락</heading.BodySmallBold>
        </AcceptBtn>
      </BtnBox>
    </CardContainer>
  );
}

export default PermissionCard;
