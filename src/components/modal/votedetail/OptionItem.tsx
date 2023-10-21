import React from 'react';
import styled from 'styled-components';

import colors from '../../../assets/styles/color';
import heading from '../../../styledComponent/heading';
import icons from '../../../assets/icons';

const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: 48px;
  padding: 12px;
  border: 1px solid ${colors.primary};
  border-radius: 4px;
`;

const CheckBox = styled.div`
  height: 100%;
  aspect-ratio: 1;
  border-radius: 3px;
  border: 1px solid ${colors.gray700};
  overflow: hidden;
`;

const SelectedBox = styled(CheckBox)`
  border: none;
`;

function OptionItem({
  item,
  selectOption,
  unSelectOption = () => {},
  selected = false,
}: {
  item: string;
  selectOption: (input: string) => void;
  unSelectOption?: (input: string) => void;
  selected?: boolean;
}): JSX.Element {
  if (selected) {
    return (
      <OptionContainer
        onClick={() => {
          unSelectOption(item);
        }}
      >
        <SelectedBox>
          <icons.CheckBox width="100%" height="100%" />
        </SelectedBox>
        <heading.BodyLargeBold>{item}</heading.BodyLargeBold>
      </OptionContainer>
    );
  }
  return (
    <OptionContainer
      onClick={() => {
        selectOption(item);
      }}
    >
      <CheckBox />
      <heading.BodyLargeBold>{item}</heading.BodyLargeBold>
    </OptionContainer>
  );
}

export default OptionItem;
