import React from 'react';
import styled from 'styled-components';

import heading from '../../../styledComponent/heading';
import colors from '../../../assets/styles/color';

import ProfileDiv from '../../../styledComponent/ProfileDiv';

import type { Vote } from '../../../assets/interfaces';

const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  height: fit-content;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  gap: 8px;
  border-bottom: 1px solid ${colors.gray100};
  color: ${colors.gray500};
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 32px;
  gap: 8px;
`;

const HostDiv = styled.div`
  width: 35px;
  height: 20px;
  border-radius: 4px;
  background-color: ${colors.primary50};
  color: ${colors.primary};
  padding: 4px;
`;

function OptionBox({
  voteResult,
  option,
  captainId,
}: {
  voteResult: {
    option1List: Vote[];
    option2List: Vote[];
    option3List: Vote[];
    option4List: Vote[];
    option5List: Vote[];
    option1: string;
    option2: string;
    option3: string | null;
    option4: string | null;
    option5: string | null;
  };
  option: string;
  captainId: number;
}): JSX.Element {
  let title = '';
  let userList: Vote[] = [];

  switch (option) {
    case 'option1':
      title = voteResult.option1;
      userList = voteResult.option1List;
      break;
    case 'option2':
      title = voteResult.option2;
      userList = voteResult.option2List;
      break;
    case 'option3':
      if (voteResult.option3 !== null) {
        title = voteResult.option3;
        userList = voteResult.option3List;
      }
      break;
    case 'option4':
      if (voteResult.option4 !== null) {
        title = voteResult.option4;
        userList = voteResult.option4List;
      }
      break;
    case 'option5':
      if (voteResult.option5 !== null) {
        title = voteResult.option5;
        userList = voteResult.option5List;
      }
      break;
    default:
      break;
  }

  return (
    <OptionContainer>
      <TitleBox>
        <heading.BodyBaseBold>{title}</heading.BodyBaseBold>
        <heading.BodyBaseMedium style={{ color: `${colors.primary}` }}>{userList.length}</heading.BodyBaseMedium>
      </TitleBox>
      {userList.map((item: Vote) => (
        <UserBox key={item.voteId}>
          <ProfileDiv profile={item.profileImage} />
          <heading.BodyBaseBold>{item.nickname}</heading.BodyBaseBold>
          {item.userId === String(captainId) && (
            <HostDiv>
              <heading.CaptionXS>호스트</heading.CaptionXS>
            </HostDiv>
          )}
        </UserBox>
      ))}
    </OptionContainer>
  );
}

export default OptionBox;
