import styled from 'styled-components';

const SplashDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: white;
  animation-duration: 3s;
  animation-name: fade-out;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
  z-index: 9999;
  @keyframes fade-out {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      display: none;
    }
  }
`;

export default SplashDiv;
