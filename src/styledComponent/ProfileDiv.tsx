import styled from 'styled-components';

const ProfileDiv = styled.div<{ profile: string }>`
  height: 100%;
  aspect-ratio: 1;
  background-image: url(${props => props.profile});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 50%;
`;

export default ProfileDiv;
