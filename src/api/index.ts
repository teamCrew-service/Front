import type { AxiosResponse } from 'axios';
import type * as myInterface from '../assets/interfaces';
import instance from './instance';

interface Message {
  message: string;
}

export const login = {
  firstLogin: async <T = Message>(information: myInterface.Information): Promise<T> => {
    const { data } = await instance.put<T>('api/auth/info', information);
    return data;
  },
  nickCheck: async <T = Message>(nickname: string): Promise<T> => {
    const { data } = await instance.post<T>('api/nickname', { nickname });
    return data;
  },
};

export const navermap = {
  findcrew: async (): Promise<myInterface.Spot[]> => {
    const { data } = await instance.get<myInterface.Spot[]>('api/home/map');
    return data;
  },
};

export const crew = {
  getDetail: async <T = myInterface.MemberDetail>(crewId: string): Promise<T> => {
    const { data } = await instance.get<T>(`api/crew/${crewId}`);
    return data;
  },
  signUp: async <T = Message>(crewId: string): Promise<T> => {
    const { data } = await instance.post<T>(`api/signup/${crewId}`);
    return data;
  },
  makeCrew: async (file: Blob, payload: myInterface.MakeCrew) => {
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
};

export const notice = {
  getNoticeList: async <T = myInterface.Notice[]>(): Promise<AxiosResponse<T>> =>
    instance.get<T>('api/notice/comingDate'),
  getUpcomingList: async (): Promise<myInterface.Notice[]> => {
    const response: AxiosResponse = await instance.get('api/notice/comingDate');
    const noticeData: myInterface.Notice[] = response.data;
    return noticeData;
  },
};

export const searchByCategory = {
  getSearchByCategory: async (category: string): Promise<myInterface.SearchByCategory[]> => {
    const response: AxiosResponse = await instance.get(`api/home/${category}`);
    const searchData: myInterface.SearchByCategory[] = response.data;
    return searchData;
  },
};

export const schedule = {
  create: async <T = myInterface.Schedule>(crewId: number, info: T): Promise<T> => {
    const { data } = await instance.post<T>(`api/schedule/${crewId}/createSchedule`, info);
    return data;
  },
  getComingDate: async <T = myInterface.ComingDate>(): Promise<T> => {
    const { data } = await instance.get('api/home/comingDate');
    return data;
  },
  getWholeSchedule: async <T = myInterface.WholeComingDate>(): Promise<T> => {
    const { data } = await instance.get('api/home/wholeComingDate');
    return data;
  },
};

export const signUp = {
  getSignUpForm: async <T = myInterface.SignUpForm>(id: string): Promise<T> => {
    const { data } = await instance.get(`api/signupform/${id}`);
    return data;
  },
  postSignUpForm: async (signupFormId: string, crewId: string, answer: { answer1: string; answer2: string }) => {
    const { data } = await instance.post(`api/signup/${signupFormId}/${crewId}/submit`, answer);
    return data;
  },
};

export const myCrew = {
  getJoinedCrew: async <T = myInterface.JoinedCrewList>(): Promise<T> => {
    const { data } = await instance.get('api/mycrew/joinedcrew');
    return data;
  },
  getWaitingCrew: async <T = myInterface.SearchByCategory[]>(): Promise<T> => {
    const { data } = await instance.get('api/mycrew/waitingcrew');
    return data;
  },
  getMyCreatedCrew: async <T = myInterface.MyCreatedCrew[]>(): Promise<T> => {
    const { data } = await instance.get('api/mycrew/mycreatedcrew');
    return data;
  },
};
