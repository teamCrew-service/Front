import styled from 'styled-components';
import colors from '../../../assets/styles/color';

export const ModalContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

export const ImageDiv = styled.div<{ url: string }>`
  height: 80%;
  aspect-ratio: 1;
  background-image: url(${props => props.url});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: 50%;
`;

export const HostDiv = styled.div`
  background-color: ${colors.primary50};
  color: ${colors.primary};
  padding: 4px;
  border-radius: 4px;
  margin-left: 4px;
`;
