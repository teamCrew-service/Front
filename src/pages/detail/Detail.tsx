/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { crew } from '../../api';

import icons from '../../assets/icons';
import CrewThumbnail from '../../assets/icons/CrewThumbnail.svg';

import './style.css';
import heading from '../../styledComponent/heading';

import Short from '../../components/detail/crewType/Short';

import type { Schedule } from '../../assets/interfaces';
import Long from '../../components/detail/crewType/Long';
import {
  SaveCrewThumbnailBtn,
  ThumbnailAbsDiv,
  ThumbnailDiv,
  InteractiveBtnContainer,
  LikeDiv,
  JoinDiv,
} from './styled';
import BodyBaseBold from '../../styledComponent/heading/BodyBaseBold';
import JoinModal from '../../components/modal/JoinModal';
import JoinCrewModal from '../../components/modal/joincrew/JoinCrewModal';

function Detail(): JSX.Element {
  // 소개 부분 접었다 펴기
  const [infoOpen, setInfoOpen] = useState<boolean>(true);
  const [joinModalOpen, setJoinModalOpen] = useState<boolean>(false);
  const [joinCrewModalOpen, setJoinCrewModalOpen] = useState<boolean>(false);

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

  const closeJoinModal = (): void => {
    setJoinModalOpen(false);
  };

  const closeJoinCrewModal = (): void => {
    setJoinCrewModalOpen(false);
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
      {joinModalOpen && (
        <JoinModal
          crewType={crewInfo!.result.crew.crew_crewType}
          closeModal={closeJoinModal}
          openJoinCrewModal={() => {
            setJoinCrewModalOpen(true);
          }}
        />
      )}
      {joinCrewModalOpen && (
        <JoinCrewModal crewType={crewInfo!.result.crew.crew_crewType} closeModal={closeJoinCrewModal} />
      )}
      {/* 헤더 */}
      <header id="detail-header">
        <icons.chevronLeft
          onClick={() => {
            window.history.back();
          }}
        />
        <heading.BodyLargeBold>{crewInfo?.result.crew.crew_crewType}</heading.BodyLargeBold>
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

        {/* 장기 / 단기 별 컨텐츠 */}
        {crewInfo?.result.crew.crew_crewType === '장기' && (
          <Long
            crewInfo={crewInfo.result}
            infoOpen={infoOpen}
            closeInfoWindow={closeInfoWindow}
            openInfoWindow={openInfoWindow}
            saveAddress={saveAddress}
            recentSchedule={crewInfo.recentSchedule !== undefined ? crewInfo.recentSchedule : null}
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
      {/* 참여버튼 */}
      {crewInfo?.result.personType === 'person' && (
        <InteractiveBtnContainer>
          <LikeDiv>
            <icons.heart />
            <heading.BodyBaseBold>
              {crewInfo.result.likeCount > 99 ? '99+' : crewInfo.result.likeCount}
            </heading.BodyBaseBold>
          </LikeDiv>
          {crewInfo?.result.crew.crew_crewType === '장기' && (
            <JoinDiv
              onClick={() => {
                setJoinModalOpen(true);
              }}
            >
              <heading.BodyBaseBold>정모 가입하기</heading.BodyBaseBold>
            </JoinDiv>
          )}
          {crewInfo?.result.crew.crew_crewType === '단기' && (
            <JoinDiv
              onClick={() => {
                signUpCrew.mutate();
              }}
            >
              <heading.BodyBaseBold>단기 모임 참여하기</heading.BodyBaseBold>
            </JoinDiv>
          )}
        </InteractiveBtnContainer>
      )}
    </>
  );
}

export default Detail;
