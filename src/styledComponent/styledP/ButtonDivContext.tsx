import styled from 'styled-components';

const ButtonDivContext = styled.p<{ $color?: string }>`
  color: ${props => props.$color};
  font-weight: 600;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.408px;
`;

ButtonDivContext.defaultProps = {
  $color: 'white',
};

export default ButtonDivContext;
