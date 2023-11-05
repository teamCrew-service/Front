import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
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

function Footer({ page }: { page: string }): JSX.Element {
  const navigate = useNavigate();
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
      <FooterLi
        onClick={() => {
          navigate('/home');
        }}
      >
        <icons.House stroke={page === 'home' ? `${colors.primary}` : `${colors.gray400}`} />
      </FooterLi>
      <FooterLi
        onClick={() => {
          navigate('/mycrew');
        }}
      >
        <icons.UsersThree stroke={page === 'myCrew' ? `${colors.primary}` : `${colors.gray400}`} />
      </FooterLi>
      <FooterLi onClick={() => {}}>
        <icons.ChatTeardropDots stroke={page === 'chat' ? `${colors.primary}` : `${colors.gray400}`} />
      </FooterLi>
      <FooterLi
        onClick={() => {
          navigate('/mypage');
        }}
      >
        <icons.UserCircle stroke={page === 'myPage' ? `${colors.primary}` : `${colors.gray400}`} />
      </FooterLi>
    </nav>
  );
}

export default Footer;
