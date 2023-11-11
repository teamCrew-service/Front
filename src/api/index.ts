import type { AxiosResponse } from 'axios';
import type * as myInterface from '../assets/interfaces';
import instance from './instance';

// 응답 메세지
interface Message {
  message: string;
}

export const login = {
  // 최초 로그인 시 추가 정보 입력
  firstLogin: async <T = Message>(file: Blob, information: myInterface.Information): Promise<T> => {
    const formData = new FormData();
    formData.append('files', file);
    formData.append('topicAndInfoDto', JSON.stringify(information));
    const { data } = await instance.put<T>('api/auth/info', formData, {
      headers: {
        Accept: '*/*',
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },
  // 닉네임 중복 체크
  nickCheck: async <T = Message>(nickname: string): Promise<T> => {
    const { data } = await instance.post<T>('api/nickname', { nickname });
    return data;
  },
  logout: async () => {
    const { data } = await instance.get(`api/auth/logout`);
    return data;
  },
};

export const unsubscribe = {
  unsubscribe: async () => {
    const { data } = await instance.post(`api/unsubscribe`);
    return data;
  },
  deleteUnsubscribe: async () => {
    const { data } = await instance.delete(`api/deleteUnsubscribe`);
    return data;
  },
};

export const navermap = {
  // 내 주변 모임 찾기
  findcrew: async (): Promise<myInterface.Spot[]> => {
    const { data } = await instance.get<myInterface.Spot[]>('api/home/map');
    return data;
  },
};

export const crew = {
  // 크루 상세 정보
  getDetail: async <T = myInterface.MemberDetail>(crewId: string): Promise<T> => {
    const { data } = await instance.get<T>(`api/crew/${crewId}`);
    return data;
  },

  // 모임 가입
  signUp: async <T = Message>(crewId: string): Promise<T> => {
    const { data } = await instance.post<T>(`api/signup/${crewId}`);
    return data;
  },

  // 모임 생성
  makeCrew: async (file: Blob, payload: myInterface.CreateCrew) => {
    const formData = new FormData();
    formData.append('files', file);
    formData.append('JoinCreateCrewDto', JSON.stringify(payload));
    const { data } = await instance.post('/api/crew/createcrew', formData, {
      headers: {
        Accept: '*/*',
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  // 크루 삭제
  deleteCrew: async <T = Message>(crewId: string): Promise<T> => {
    const { data } = await instance.delete(`/api/crew/${crewId}/delete`);
    return data;
  },

  // 크루 썸네일 수정
  editCrewThumbnail: async (file: Blob, crewId: string) => {
    const formData = new FormData();
    formData.append('files', file);
    const { data } = await instance.put(`/api/crew/${crewId}/editThumbnail`, formData, {
      headers: {
        Accept: '*/*',
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  // 크루 탈퇴하기
  exitCrew: async (crewId: string) => {
    const data = await instance.post(`/api/exitCrew/${crewId}`);
    return data;
  },
};

export const searchByCategory = {
  // 관심사별 모임 찾기
  getSearchByCategory: async (category: string): Promise<myInterface.SearchByCategory[]> => {
    const response: AxiosResponse = await instance.get(`api/home/${category}`);
    const searchData: myInterface.SearchByCategory[] = response.data;
    return searchData;
  },
};

export const schedule = {
  // 일정 생성
  create: async <T = myInterface.Schedule>(crewId: number, info: T): Promise<T> => {
    const { data } = await instance.post<T>(`api/schedule/${crewId}/createSchedule`, info);
    return data;
  },
  // 다가오는 일정 1개
  getComingDate: async <T = myInterface.ComingDate>(): Promise<T> => {
    const { data } = await instance.get('api/home/comingDate');
    return data;
  },
  // 다가오는 일정 다가오는/참여 완료 리스트
  getWholeSchedule: async <T = myInterface.WholeComingDate>(): Promise<T> => {
    const { data } = await instance.get('api/home/wholeComingDate');
    return data;
  },
  signUpSchedule: async (crewId: string, scheduleId: string) => {
    const { data } = await instance.post(`api/schedule/participate/${crewId}/${scheduleId}`);
    return data;
  },
  cancelSchedule: async (crewId: string, scheduleId: string) => {
    const { data } = await instance.delete(`api/schedule/cancelParticipate/${crewId}/${scheduleId}`);
    return data;
  },
};

export const signUp = {
  // 가입 양식 가져오기
  getSignUpForm: async <T = myInterface.SignUpForm>(id: string): Promise<T> => {
    const { data } = await instance.get(`api/signupform/${id}`);
    return data;
  },
  // 가입서 제출
  postSignUpForm: async (signupFormId: string, crewId: string, answer: { answer1: string; answer2: string }) => {
    const { data } = await instance.post(`api/signup/${signupFormId}/${crewId}/submit`, answer);
    return data;
  },
  // 제출된 가입서 가져오기
  getTotalSignUpList: async <T = myInterface.SingUpItemForm[]>(id: string): Promise<T> => {
    const { data } = await instance.get(`api/signup/${id}`);
    return data;
  },
  permitSignUp: async (signUpId: number, choice: boolean) => {
    const { data } = await instance.put(`/api/signup/${signUpId}/confirmsignup`, { permission: choice });
    return data;
  },
};

export const myCrew = {
  // 가입한 크루 리스트 가져오기
  getJoinedCrew: async <T = myInterface.SearchByCategory[]>(): Promise<T> => {
    const { data } = await instance.get('api/mycrew/joinedcrew');
    return data;
  },
  // 대기중인 크루 리스트 가져오기
  getWaitingCrew: async <T = myInterface.SearchByCategory[]>(): Promise<T> => {
    const { data } = await instance.get('api/mycrew/waitingcrew');
    return data;
  },
  // 내가 생성한 크루 리스트 가져오기
  getMyCreatedCrew: async <T = myInterface.MyCreatedCrew[]>(): Promise<T> => {
    const { data } = await instance.get('api/mycrew/mycreatedcrew');
    return data;
  },
};

export const noitce = {
  createNotice: async (crewId: string, noticeInfo: myInterface.NoticeInfo) => {
    const { data } = await instance.post(`api/notice/${crewId}/createNotice`, noticeInfo);
    return data;
  },

  getNoticeDetail: async <T = myInterface.NoticeInfo>(crewId: string, noticeId: string): Promise<T> => {
    const { data } = await instance.get(`api/notice/${crewId}/${noticeId}`);
    return data;
  },
};

export const voteform = {
  createVote: async (crewId: string, voteFormInfo: myInterface.VoteInfo) => {
    const { data } = await instance.post(`api/voteform/${crewId}/createVoteForm`, voteFormInfo);
    return data;
  },
  getVoteFormDetail: async <T = myInterface.VoteInfo>(crewId: string, voteFormId: string): Promise<T> => {
    const { data } = await instance.get(`api/voteform/${crewId}/${voteFormId}`);
    return data;
  },
};

export const vote = {
  vote: async (crewId: string, voteFormId: string, choice: { vote: string }) => {
    const { data } = await instance.post(`api/vote/${crewId}/${voteFormId}`, choice);
    return data;
  },
  getVoteResult: async <T = myInterface.VoteResult>(crewId: string, voteFormId: string): Promise<T> => {
    const { data } = await instance.get(`api/vote/${crewId}/${voteFormId}`);
    return data;
  },
};

export const mypage = {
  getUserInfo: async <T = myInterface.MyPage>(): Promise<T> => {
    const { data } = await instance.get('/api/mypage');
    return data;
  },
  editUserInfo: async <T = Message>(file: Blob | null, userInfo: myInterface.EditProfile): Promise<T> => {
    const formData = new FormData();
    if (file !== null) {
      formData.append('files', file);
    }
    formData.append('editTopicAndInfoDto', JSON.stringify(userInfo));
    const { data } = await instance.put<T>('api/mypage/edit', formData, {
      headers: {
        Accept: '*/*',
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },
};

export const like = {
  postLike: async (crewId: string) => {
    const { data } = await instance.post(`/api/like/${crewId}`);
    return data;
  },
  deleteLike: async (crewId: string) => {
    const { data } = await instance.delete(`/api/like/${crewId}`);
    return data;
  },
};
