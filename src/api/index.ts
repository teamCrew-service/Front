import type { AxiosResponse } from 'axios';
import type * as myInterface from '../assets/interfaces';
import instance from './instance';

interface Message {
  message: string;
}

const login = {
  firstLogin: async <T = Message>(information: myInterface.Information): Promise<T> => {
    const { data } = await instance.put<T>('api/auth/info', information);
    return data;
  },
  nickCheck: async <T = Message>(nickname: string): Promise<T> => {
    const { data } = await instance.post<T>('api/nickname', { nickname });
    return data;
  },
};

const navermap = {
  findcrew: async (): Promise<myInterface.Spot[]> => {
    const { data } = await instance.get<myInterface.Spot[]>('api/home/map');
    return data;
  },
};

const crew = {
  getDetail: async <T = myInterface.MemberDetail>(crewId: string): Promise<T> => {
    const { data } = await instance.get<T>(`api/crew/${crewId}`);
    return data;
  },
  signUp: async <T = Message>(crewId: string): Promise<T> => {
    const { data } = await instance.post<T>(`api/signup/${crewId}`);
    return data;
  },
  makeCrew: async (payload: myInterface.MakeCrew) => {
    const { data } = await instance.post('/api/crew/createcrew', payload);
    return data;
  },
};

const notice = {
  getNoticeList: async <T = myInterface.Notice[]>(): Promise<AxiosResponse<T>> =>
    instance.get<T>('api/notice/comingDate'),
  getUpcomingList: async (): Promise<myInterface.Notice[]> => {
    const response: AxiosResponse = await instance.get('api/notice/comingDate');
    const noticeData: myInterface.Notice[] = response.data;
    return noticeData;
  },
};

const searchByCategory = {
  getSearchByCategory: async (category: string): Promise<myInterface.SearchByCategory[]> => {
    const response: AxiosResponse = await instance.get(`api/home/${category}`);
    const searchData: myInterface.SearchByCategory[] = response.data;
    return searchData;
  },
};

const schedule = {
  create: async <T = myInterface.Schedule>(crewId: number, info: T): Promise<T> => {
    const { data } = await instance.post<T>(`api/schedule/${crewId}/createSchedule`, info);
    return data;
  },
  getComingDate: async <T = myInterface.ComingDate>(): Promise<T> => {
    const { data } = await instance.get('api/home/comingDate');
    return data;
  },
};

export { login, navermap, crew, notice, searchByCategory, schedule };
