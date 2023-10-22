import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';

import icons from '../../assets/icons';
import heading from '../../styledComponent/heading';

import './style.css';

import { signUp } from '../../api';

function Permission(): JSX.Element {
  const navigate = useNavigate();
  const { crewId } = useLocation().state;

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
      <header id="permission-header">
        <icons.close
          onClick={() => {
            navigate('/mycrew');
          }}
        />
        <heading.BodyLargeBold>승인 필요</heading.BodyLargeBold>
      </header>
      <div>{crewId}</div>
      <div>{signUpList![0].age}</div>
    </>
  );
}

export default Permission;
