import React from 'react';
import styled from 'styled-components';

import colors from '../../../assets/styles/color';
import heading from '../../../styledComponent/heading';

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

const SelectedContainer = styled(OptionContainer)`
  background-color: ${colors.primary};
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
      <SelectedContainer
        onClick={() => {
          unSelectOption(item);
        }}
      >
        <heading.BodyLargeBold>{item}</heading.BodyLargeBold>
      </SelectedContainer>
    );
  }
  return (
    <OptionContainer
      onClick={() => {
        selectOption(item);
      }}
    >
      <heading.BodyLargeBold>{item}</heading.BodyLargeBold>
    </OptionContainer>
  );
}

export default OptionItem;
