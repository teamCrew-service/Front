/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom';

import { crew } from '../../api';

import icons from '../../assets/icons';

import './style.css';
import BodyLargeBold from '../../styledComponent/heading/BodyLargeBold';

import Short from '../../components/detail/crewType/Short';

import type { Schedule } from '../../assets/interfaces';
import Long from '../../components/detail/crewType/Long';

function Detail(): JSX.Element {
  // 소개 부분 접었다 펴기
  const [infoOpen, setInfoOpen] = useState<boolean>(true);

  const { id } = useParams();

  const findRecentEvent = (sorted: Schedule[]): any => {
    const today = new Date();
    // eslint-disable-next-line array-callback-return, consistent-return
    for (let i = 0; i < sorted.length; i += 1) {
      if (new Date(sorted[i].scheduleDDay).getTime() > today.getTime()) {
        return sorted[i];
      }
    }
    return null;
  };

  const {
    status,
    data: crewInfo,
    refetch,
  } = useQuery(
    'crewDetail',
    async () => {
      const result = await crew.getDetail(id!);
      if (result.personType !== 'person') {
        const sortedArray = result.schedule.sort(
          (a, b) => new Date(a.scheduleDDay).getTime() - new Date(b.scheduleDDay).getTime(),
        );
        const recentSchedule = findRecentEvent(sortedArray);
        return { result, recentSchedule };
      }
      return { result };
    },
    {
      onSuccess: res => {
        console.log(res);
      },
      refetchOnWindowFocus: false,
    },
  );

  const signUpCrew = useMutation(
    async () => {
      const result = await crew.signUp(crewInfo!.result.crew.crew_crewId);
      return result;
    },
    {
      onSuccess: async res => {
        console.log(res);
        await refetch();
      },
      onError: (error: any) => {
        alert(error.response.data.message);
      },
    },
  );

  const openInfoWindow = (): void => {
    setInfoOpen(true);
  };

  const closeInfoWindow = (): void => {
    setInfoOpen(false);
  };

  const saveAddress = (address: string): void => {
    navigator.clipboard
      .writeText(address)
      .then(() => {
        console.log('paste success');
      })
      .catch(() => {});
  };

  if (status === 'loading') {
    return <div>loading...</div>;
  }

  if (status === 'error') {
    return <div>somthing wrong!</div>;
  }

  return (
    <>
      {/* 헤더 */}
      <header id="detail-header">
        <Link to="/findcrew">
          <icons.chevronLeft />
        </Link>
        <BodyLargeBold>{crewInfo?.result.crew.crew_crewType}</BodyLargeBold>
        <div style={{ width: '24px', height: '24px' }} />
      </header>
      <main id="detail-main">
        {/* 썸네일 */}
        <section
          id="detail-main-thumbnail"
          style={{
            backgroundImage: `url(${crewInfo?.result.crew.crew_thumbnail})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {crewInfo?.result.crew.crew_crewType === '장기' && (
          <Long
            crewInfo={crewInfo.result}
            infoOpen={infoOpen}
            closeInfoWindow={closeInfoWindow}
            openInfoWindow={openInfoWindow}
            signUpCrew={signUpCrew}
            saveAddress={saveAddress}
            recentSchedule={crewInfo.recentSchedule}
          />
        )}
        {crewInfo?.result.crew.crew_crewType === '단기' && (
          <Short
            crewInfo={crewInfo.result}
            infoOpen={infoOpen}
            closeInfoWindow={closeInfoWindow}
            openInfoWindow={openInfoWindow}
            saveAddress={saveAddress}
            signUpCrew={signUpCrew}
          />
        )}
      </main>
      {/* {crewInfo?.result.personType === 'captain' && (
        <footer style={{ position: 'relative', width: '100%' }}>
          {page === '일정' && (
            <button
              type="button"
              style={{
                position: 'absolute',
                top: '-74px',
                right: '21px',
                width: '48px',
                aspectRatio: 1,
                borderRadius: '50%',
                backgroundColor: `${colors.primary}`,
                border: 'none',
                color: 'white',
              }}
            >
              &#43;
            </button>
          )}
          {page === '공지' && (
            <button
              type="button"
              style={{
                position: 'absolute',
                top: '-74px',
                right: '21px',
                width: '48px',
                aspectRatio: 1,
                borderRadius: '50%',
                backgroundColor: `${colors.primary}`,
                border: 'none',
                color: 'white',
              }}
            >
              &#43;
            </button>
          )}
        </footer>
      )} */}
    </>
  );
}

export default Detail;
