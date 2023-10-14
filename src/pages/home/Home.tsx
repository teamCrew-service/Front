import React, { useState } from 'react';

import './style.css';

import Footer from '../../components/home/Footer';
import HomePage from '../../components/home/HomePage';
import MyCrew from '../../components/home/mycrew/MyCrew';

function Home(): JSX.Element {
  const [page, setPage] = useState('home');
  // redirect시 쿠키 가져오는 로직
  const cookie = window.location.href.split('token=')[1];
  if (cookie !== undefined) {
    document.cookie = `authorization=${cookie};path=/`;
  }

  const changePage = (input: string): void => {
    setPage(input);
  };

  return (
    <>
      {page === 'home' && <HomePage />}
      {page === 'myCrew' && <MyCrew />}

      <footer id="home-footer">
        <Footer page={page} setPage={changePage} />
      </footer>
    </>
  );
}

export default Home;
