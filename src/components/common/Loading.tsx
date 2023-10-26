import React from 'react';
import Lottie from 'lottie-react';
import styled from 'styled-components';
import loading from '../../assets/lotties/loading.json';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

function Loading(): JSX.Element {
  return (
    <LoadingContainer>
      <Lottie animationData={loading} />
    </LoadingContainer>
  );
}

export default Loading;
