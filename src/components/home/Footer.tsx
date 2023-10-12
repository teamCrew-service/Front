import React from 'react';
import styled from 'styled-components';
import colors from '../../assets/styles/color';
import icons from '../../assets/icons';

const FooterLi = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
`;

function Footer(): JSX.Element {
  return (
    <nav
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        justifyContent: 'space-evenly',
        backgroundColor: `${colors.gray50}`,
        borderTop: `0.3px solid ${colors.gray200}`,
      }}
    >
      <FooterLi>
        <icons.House />
      </FooterLi>
      <FooterLi>
        <icons.UsersThree />
      </FooterLi>
      <FooterLi>
        <icons.ChatTeardropDots />
      </FooterLi>
      <FooterLi>
        <icons.UserCircle />
      </FooterLi>
    </nav>
  );
}

export default Footer;
