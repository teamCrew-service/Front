/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { crew } from '../../api';

import icons from '../../assets/icons';
import CrewThumbnail from '../../assets/icons/CrewThumbnail.svg';

import './style.css';
import BodyLargeBold from '../../styledComponent/heading/BodyLargeBold';

import Short from '../../components/detail/crewType/Short';

import type { Schedule } from '../../assets/interfaces';
import Long from '../../components/detail/crewType/Long';
import { SaveCrewThumbnailBtn, ThumbnailAbsDiv, ThumbnailDiv } from './styled';
import BodyBaseBold from '../../styledComponent/heading/BodyBaseBold';

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
        <icons.chevronLeft
          onClick={() => {
            window.history.back();
          }}
        />
        <BodyLargeBold>{crewInfo?.result.crew.crew_crewType}</BodyLargeBold>
        <div style={{ position: 'relative', width: '24px', height: '24px' }}>
          <icons.ThreeDots fill="#4F4E55" style={{ cursor: 'pointer' }} />
        </div>
      </header>
      <main id="detail-main">
        {/* 크루 썸네일 */}
        <section id="detail-main-thumbnail">
          {crewInfo!.result.crew.crew_thumbnail !== '' ? (
            <ThumbnailDiv $url={crewInfo!.result.crew.crew_thumbnail}>
              <ThumbnailAbsDiv>
                <icons.ThreeDots fill="rgba(255,255,255,1)" style={{ cursor: 'pointer' }} />
              </ThumbnailAbsDiv>
            </ThumbnailDiv>
          ) : (
            <ThumbnailDiv $url={CrewThumbnail}>
              <SaveCrewThumbnailBtn>
                <BodyBaseBold>사진 등록하기</BodyBaseBold>
              </SaveCrewThumbnailBtn>
            </ThumbnailDiv>
          )}
        </section>

        {/* crew별 컨텐츠 */}
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
    </>
  );
}

export default Detail;
