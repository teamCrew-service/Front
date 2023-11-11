import styled from 'styled-components';
import colors from '../../../assets/styles/color';

export const ProfileBox = styled.div<{ profile: string }>`
  position: relative;
  height: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  background-image: url(${props => props.profile});
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  // height : 76px
  height: 17.19%;
`;

export const TwoItemBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  height: 17.19%;
`;
export const ItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

export const IntroBox = styled(ItemBox)`
  // height : 178px
  height: 40.27%;
`;

export const InsertDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 63.16%;
  padding: 12px;
  border: 1px solid ${colors.primary};
  border-radius: 4px;
`;
export const ClickDiv = styled.div`
  display: flex;
  width: 100%;
  height: 63.16%;
  gap: 4px;
  padding: 4px;
  border-radius: 6px;
  background-color: ${colors.gray100};
`;

export const ClickItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 4px;
`;
export const SelectedClickItem = styled(ClickItem)`
  background-color: ${colors.primary100};
  color: ${colors.primary};
`;

export const IntroInsertDiv = styled(InsertDiv)`
  flex-direction: column;
  gap: 0px;
  justify-content: space-between;
  align-items: end;
  height: 84.27%;
`;

export const StyledInput = styled.input`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.16px;
  width: 100%;
  height: 100%;
  border: none;
`;

export const StyledTextarea = styled.textarea`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.14px;
  resize: none;
  width: 100%;
  height: 84.13%;
  border: none;
  outline: none;
`;

export const InterestMatrixContainer = styled.div`
  width: 100%;
  /* height:256px */
  height: 84.21%;
`;

export const EditButton = styled.button`
  background-color: white;
  border: none;
  color: ${colors.primary};
  &:disabled {
    color: ${colors.gray500};
  }
`;
