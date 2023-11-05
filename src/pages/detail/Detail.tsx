/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { crew, like } from '../../api';

import icons from '../../assets/icons';
import CrewThumbnail from '../../assets/icons/CrewThumbnail.svg';

import heading from '../../styledComponent/heading';

import Short from '../../components/detail/crewType/Short';

import type { Schedule, VoteCreateInfo, VoteResultInfo } from '../../assets/interfaces';
import Long from '../../components/detail/crewType/long/Long';
import {
  SaveCrewThumbnailBtn,
  ThumbnailAbsDiv,
  ThumbnailDiv,
  InteractiveBtnContainer,
  LikeDiv,
  JoinDiv,
  PlusBtnContainer,
  PlusBtn,
  CloseBtn,
  NonActiveWindow,
  PlusItemContainer,
  ItemDiv,
} from './styled';
import BodyBaseBold from '../../styledComponent/heading/BodyBaseBold';
import JoinModal from '../../components/modal/JoinModal';
import JoinCrewModal from '../../components/modal/joincrew/JoinCrewModal';
import CreateNoticeModal from '../../components/modal/createnotice/CreateNoticeModal';
import NoticeDetailModal from '../../components/modal/noticedetail/NoticeDetail';
import CreateVoteModal from '../../components/modal/createvote/CreateVoteModal';
import VoteDetailModal from '../../components/modal/votedetail/VoteDetailModal';
import colors from '../../assets/styles/color';
import VoteResultModal from '../../components/modal/voteresult/VoteResultModal';
import ThreeDotModal from '../../components/detail/ThreeDotModal';
import { Header, Main, ThumbnailContainer } from '../../layouts/detail/detail-layout';

function Detail(): JSX.Element {
  let isCreated: boolean = false;
  if (useLocation().state !== null) {
    isCreated = useLocation().state.isCreated;
  }

  const navigate = useNavigate();

  const [page, setPage] = useState<string>('모임정보');
  const [extraOpen, setExtraOpen] = useState<boolean>(false);

  // 모달 여닫기
  const [joinModalOpen, setJoinModalOpen] = useState<boolean>(false);
  const [joinCrewModalOpen, setJoinCrewModalOpen] = useState<boolean>(false);
  const [openNoticeModal, setOpenNoticeModal] = useState<boolean>(false);
  const [openCreateNoticeModal, setOpenCreateNoticeModal] = useState<boolean>(false);
  const [openNoticeDetailModal, setOpenNoticeDetailModal] = useState<{ isOpen: boolean; id: string | null }>({
    isOpen: false,
    id: null,
  });
  const [openCreateVoteModal, setOpenCreateVoteModal] = useState<boolean>(false);
  const [openVoteDetailModal, setOpenVoteDetailModal] = useState<VoteCreateInfo>({
    isOpen: false,
    voteFormId: null,
  });
  const [openVoteResultModal, setOpenVoteResultModal] = useState<VoteResultInfo>({
    isOpen: false,
    voteFormId: null,
    crewId: null,
  });

  const { id } = useParams();

  const findRecentEvent = (sorted: Schedule[]): any => {
    // 가장 임박한 일정 가져오는 함수
    const today = new Date();
    // eslint-disable-next-line array-callback-return, consistent-return
    for (let i = 0; i < sorted.length; i += 1) {
      if (new Date(sorted[i].scheduleDDay).getTime() > today.getTime()) {
        return sorted[i];
      }
    }
    return null;
  };

  // 크루 상세 정보 가져오는 쿼리 함수
  const {
    status,
    data: crewInfo,
    refetch,
  } = useQuery(
    'crewDetail',
    async () => {
      const result = await crew.getDetail(id!);
      if (result.personType !== 'person') {
        // 최신 순으로 정렬
        const sortedArray = result.schedule.sort(
          (a, b) => new Date(a.scheduleDDay).getTime() - new Date(b.scheduleDDay).getTime(),
        );
        // 가장 임박한 일정 가져오기
        const recentSchedule = findRecentEvent(sortedArray);
        return { result, recentSchedule };
      }
      return { result };
    },
    {
      onSuccess: res => {
        console.log('크루 상세정보 = ', res);
      },
      refetchOnWindowFocus: false,
      cacheTime: 0,
    },
  );

  // 크루 바로 가입 가능 쿼리 함수
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

  const controlExtraFunc = (): void => {
    setExtraOpen(prev => !prev);
  };

  // 각종 모달 On/Off 함수 ------------------------------------
  // 1. 크루 가입 모달
  const closeJoinModal = (): void => {
    setJoinModalOpen(false);
  };
  const openJoinCrewModal = (): void => {
    setJoinCrewModalOpen(true);
  };
  const closeJoinCrewModal = (): void => {
    setJoinCrewModalOpen(false);
  };

  // 2. 정모 공지 관련
  const openNoticeDetailModalFunc = (input: string): void => {
    setOpenNoticeDetailModal({ isOpen: true, id: input });
  };
  const closeNoticeDetailModalFunc = (): void => {
    setOpenNoticeDetailModal({ isOpen: false, id: null });
  };
  const OpenCreateNoticeModalFunc = (): void => {
    setOpenNoticeModal(false);
    setOpenCreateNoticeModal(true);
  };
  const CloseCreateNoticeModalFunc = (): void => {
    setOpenCreateNoticeModal(false);
  };

  // 3. 되는 시간 투표 관련
  const openCreateVoteModalFunc = (): void => {
    setOpenNoticeModal(false);
    setOpenCreateVoteModal(true);
  };
  const closeCreateVoteModalFunc = (): void => {
    setOpenCreateVoteModal(false);
  };
  const openVoteDetailModalFunc = (input: VoteCreateInfo): void => {
    setOpenVoteDetailModal(input);
  };
  const closeVoteDetailModalFunc = (): void => {
    setOpenVoteDetailModal({ isOpen: false, voteFormId: null });
  };
  const openVoteResultModalFunc = (input: VoteResultInfo): void => {
    setOpenVoteResultModal(input);
  };
  const closeVoteResultModalFunc = (): void => {
    setOpenVoteResultModal({
      isOpen: false,
      voteFormId: null,
      crewId: null,
    });
  };
  // ------------------------------------------------------------

  // nav 변경하는 함수
  const changePage = (input: string): void => {
    if (input !== '모임정보' && crewInfo?.result.personType === 'person') {
      alert('크루 멤버만 볼 수 있는 페이지 입니다.');
      return;
    }
    setPage(input);
  };

  // 주소 클립보드에 저장하는 함수
  const saveAddress = (address: string): void => {
    navigator.clipboard
      .writeText(address)
      .then(() => {
        console.log('paste success');
      })
      .catch(() => {});
  };

  // 크루 가입 양식에 맞춘 크루 가입 함수 설정
  let joinCrewFunc = (): void => {};
  if (status !== 'loading' && status !== 'error') {
    joinCrewFunc =
      crewInfo?.result.crew.crew_crewSignup === 0
        ? () => {
            signUpCrew.mutate();
          }
        : openJoinCrewModal;
  }

  // 현재 좋아요 상태에 따른 좋아요 버튼 클릭 시 실행되는 함수 설정
  let likeCrewFunc: () => void = (): void => {};
  if (status !== 'loading' && status !== 'error') {
    if (crewInfo !== undefined) {
      if (!crewInfo.result.likeCheck) {
        likeCrewFunc = () => {
          like
            .postLike(crewInfo.result.crew.crew_crewId)
            .then(refetch)
            .catch(err => {
              console.log(err);
            });
        };
      } else {
        likeCrewFunc = () => {
          like
            .deleteLike(crewInfo.result.crew.crew_crewId)
            .then(refetch)
            .catch(err => {
              console.log(err);
            });
        };
      }
    }
  }

  // 로딩 중일 때 보여주는 화면
  if (status === 'loading') {
    return <div>loading...</div>;
  }

  // 에러시 보여주는 화면
  if (status === 'error') {
    return <div>somthing wrong!</div>;
  }

  return (
    <>
      {/* 모달들  ---------------------------------------- */}
      {/* +(생성 버튼)클릭 시 나타나는 검은 모달 화면 */}
      {openNoticeModal && <NonActiveWindow />}

      {/* 1 - 1. 크루 가입 확인 모달 */}
      {joinModalOpen && (
        <JoinModal
          crewType={crewInfo!.result.crew.crew_crewType}
          closeModal={closeJoinModal}
          openJoinCrewModal={() => {
            setJoinCrewModalOpen(true);
          }}
        />
      )}
      {/* 1 - 2. 크루 가입 모달 */}
      {joinCrewModalOpen && (
        <JoinCrewModal
          crewType={crewInfo!.result.crew.crew_crewType}
          closeModal={closeJoinCrewModal}
          signupFormId={crewInfo!.result.crew.signupFormId}
          crewId={crewInfo!.result.crew.crew_crewId}
        />
      )}

      {/* 2 - 1. 정모 공지 생성 모달 */}
      {openCreateNoticeModal && (
        <CreateNoticeModal
          crewInfo={crewInfo!.result}
          closeModal={CloseCreateNoticeModalFunc}
          openNoticeDetailModal={openNoticeDetailModalFunc}
          refetch={refetch}
        />
      )}
      {/* 2 - 2. 정모공지 상세 모달 */}
      {openNoticeDetailModal.isOpen && (
        <NoticeDetailModal
          crewInfo={crewInfo!.result}
          noticeId={openNoticeDetailModal.id!}
          closeModal={closeNoticeDetailModalFunc}
        />
      )}

      {/* 3 - 1. 되는 시간 투표 생성 모달 */}
      {openCreateVoteModal && (
        <CreateVoteModal
          openVoteDetailModal={openVoteDetailModalFunc}
          crewInfo={crewInfo!.result}
          refetch={refetch}
          closeModal={closeCreateVoteModalFunc}
        />
      )}
      {/* 3 - 2. 되는 시간 투표 모달 */}
      {openVoteDetailModal.isOpen && (
        <VoteDetailModal
          refetch={refetch}
          crewInfo={crewInfo!.result}
          voteFormId={openVoteDetailModal.voteFormId!}
          closeModal={closeVoteDetailModalFunc}
          openResultModal={openVoteResultModalFunc}
        />
      )}
      {/* 3 - 3. 되는 시간 투표 결과 모달 */}
      {openVoteResultModal.isOpen && (
        <VoteResultModal
          crewId={openVoteResultModal.crewId!}
          voteFormId={openVoteResultModal.voteFormId!}
          closeModal={closeVoteResultModalFunc}
          captainId={crewInfo!.result.crew.captainId}
        />
      )}
      {/* -------------------------------------------- */}

      <Header>
        <icons.chevronLeft
          onClick={() => {
            if (isCreated) {
              navigate('/home');
              return;
            }
            window.history.back();
          }}
        />
        <heading.BodyLargeBold>{crewInfo?.result.crew.crew_crewType}</heading.BodyLargeBold>
        <div style={{ position: 'relative', width: '24px', height: '24px' }}>
          {crewInfo?.result.personType !== 'person' && (
            <>
              {extraOpen && (
                <ThreeDotModal
                  refetch={refetch}
                  crewId={crewInfo!.result.crew.crew_crewId}
                  personType={crewInfo!.result.personType}
                  controlExtra={controlExtraFunc}
                />
              )}
              <icons.ThreeDots fill="#4F4E55" style={{ cursor: 'pointer' }} onClick={controlExtraFunc} />
            </>
          )}
        </div>
      </Header>

      <Main>
        <ThumbnailContainer>
          {crewInfo!.result.crew.crew_thumbnail !== '' ? (
            <ThumbnailDiv $url={crewInfo!.result.crew.crew_thumbnail}>
              <ThumbnailAbsDiv />
            </ThumbnailDiv>
          ) : (
            <ThumbnailDiv $url={CrewThumbnail}>
              <SaveCrewThumbnailBtn>
                <BodyBaseBold>사진 등록하기</BodyBaseBold>
              </SaveCrewThumbnailBtn>
            </ThumbnailDiv>
          )}
        </ThumbnailContainer>

        {/* 장기 / 단기 별 컨텐츠 */}
        {crewInfo?.result.crew.crew_crewType === '장기' && (
          <Long
            page={page}
            changePage={changePage}
            crewInfo={crewInfo.result}
            saveAddress={saveAddress}
            recentSchedule={crewInfo.recentSchedule !== undefined ? crewInfo.recentSchedule : null}
            openNoticeDetailModal={openNoticeDetailModalFunc}
            openVoteDetailModal={openVoteDetailModalFunc}
            openVoteResultModal={openVoteResultModalFunc}
            refetch={refetch}
          />
        )}
        {crewInfo?.result.crew.crew_crewType === '단기' && (
          <Short crewInfo={crewInfo.result} saveAddress={saveAddress} />
        )}
      </Main>

      {/* 크루 가입 버튼 */}
      {crewInfo?.result.personType === 'person' && (
        <InteractiveBtnContainer>
          <LikeDiv onClick={likeCrewFunc}>
            {!crewInfo.result.likeCheck && <icons.heart fill={colors.primary} />}
            {crewInfo.result.likeCheck && <icons.ActiveHeart />}
            <heading.BodyBaseBold>
              {crewInfo.result.likeCount > 99 ? '99+' : crewInfo.result.likeCount}
            </heading.BodyBaseBold>
          </LikeDiv>
          <JoinDiv onClick={joinCrewFunc}>
            <heading.BodyBaseBold>
              {crewInfo?.result.crew.crew_crewType === '장기' ? '정모 가입하기' : '단기 모임 참여하기'}
            </heading.BodyBaseBold>
          </JoinDiv>
        </InteractiveBtnContainer>
      )}

      {/* 정모 공지 / 되는 시간 투표 추가 버튼 */}
      {crewInfo?.result.personType === 'captain' && page === '공지' && (
        <PlusBtnContainer>
          {!openNoticeModal && (
            <PlusBtn
              onClick={() => {
                setOpenNoticeModal(true);
              }}
            >
              <icons.PlusBtn />
            </PlusBtn>
          )}
          {openNoticeModal && (
            <>
              <CloseBtn
                onClick={() => {
                  setOpenNoticeModal(false);
                }}
              >
                <icons.CloseBtn />
              </CloseBtn>
              <PlusItemContainer>
                <ItemDiv onClick={openCreateVoteModalFunc}>
                  <heading.BodyBaseMedium>되는 시간 투표</heading.BodyBaseMedium>
                  <icons.VoteIcon stroke={colors.primary} />
                </ItemDiv>
                <ItemDiv onClick={OpenCreateNoticeModalFunc}>
                  <heading.BodyBaseMedium>정모 공지</heading.BodyBaseMedium>
                  <icons.MegaPhone stroke={colors.primary} />
                </ItemDiv>
              </PlusItemContainer>
            </>
          )}
        </PlusBtnContainer>
      )}

      {/* 일정 추가 버튼 */}
      {crewInfo?.result.personType === 'captain' && page === '일정' && (
        <PlusBtnContainer>
          <PlusBtn>
            <icons.PlusBtn />
          </PlusBtn>
        </PlusBtnContainer>
      )}
    </>
  );
}

export default Detail;
