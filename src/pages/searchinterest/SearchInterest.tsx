import React from 'react';
import { useLocation } from 'react-router-dom';

function SearchInterest(): JSX.Element {
  const location = useLocation();
  const { interest } = location.state;

  return <div>{interest}</div>;
}

export default SearchInterest;
