import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';

import icons from '../../assets/icons';

import './style.css';

import { signUp } from '../../api';

function Permission(): JSX.Element {
  const navigate = useNavigate();
  const { crewId } = useLocation().state;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: signUpList, isLoading } = useQuery(
    'getSignUpList',
    async () => {
      const result = signUp.getTotalSignUpList(crewId);
      return result;
    },
    {
      onSuccess: res => {
        console.log('signUpList = ', res);
      },
      refetchOnWindowFocus: false,
    },
  );
  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    <>
      <header>
        <icons.close
          onClick={() => {
            navigate('/mycrew');
          }}
        />
      </header>
      <div>{crewId}</div>
      <div>{signUpList![0].age}</div>
    </>
  );
}

export default Permission;
