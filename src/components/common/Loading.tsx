import React from 'react';
import Lottie from 'lottie-react';
import styled from 'styled-components';
import loading from '../../assets/lotties/loading.json';

const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color: white;
`;

function Loading(): JSX.Element {
  return (
    <LoadingContainer>
      <Lottie animationData={loading} />
    </LoadingContainer>
  );
}

export default Loading;
