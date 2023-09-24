import React from 'react';
import styled from 'styled-components';
import CaptionXS from '../../styledComponent/heading/CaptionXS';
import colors from '../../assets/styles/color';

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
        width: '100%',
        height: '83px',
        justifyContent: 'space-evenly',
        paddingTop: '4px',
        backgroundColor: `${colors.gray50}`,
        borderTop: `0.3px solid ${colors.gray200}`,
      }}
    >
      <FooterLi>
        <CaptionXS>홈</CaptionXS>
      </FooterLi>
      <FooterLi>
        <CaptionXS>내모임</CaptionXS>
      </FooterLi>
      <FooterLi>
        <CaptionXS>채팅방</CaptionXS>
      </FooterLi>
      <FooterLi>
        <CaptionXS>마이페이지</CaptionXS>
      </FooterLi>
    </nav>
  );
}

export default Footer;
