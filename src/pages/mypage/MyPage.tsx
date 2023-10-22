import React from 'react';

import './style.css';
import Footer from '../../components/home/Footer';

function MyPage(): JSX.Element {
  return (
    <>
      <main id="mypage-main">
        <div>hi</div>
      </main>
      <footer className="home-footer">
        <Footer page="myPage" />
      </footer>
    </>
  );
}

export default MyPage;
