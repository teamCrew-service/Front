import type { AxiosResponse } from 'axios';
import type * as myInterface from '../assets/interfaces';
import instance from './instance';

interface LoginMessage {
  message: string;
}

interface Information {
  interestTopic: string | null;
  nickname: string | null;
  age: string | null;
  gender: string | null;
  profileImage: string | null;
  myMessage: string | null;
  location: string | null;
}

const login = {
  firstLogin: async <T = LoginMessage>(information: Information): Promise<T> => {
    const { data } = await instance.put<T>('api/auth/info', information);
    return data;
  },
  nickCheck: async <T = LoginMessage>(nickname: string): Promise<T> => {
    const { data } = await instance.post<T>('api/nickname', { nickname });
    return data;
  },
};

const naverMap = {};

const notice = {
  getNoticeList: async <T = myInterface.Notice[]>(): Promise<AxiosResponse<T>> =>
    instance.get<T>('api/notice/comingDate'),
};

const searchByCategory = {
  getSearchByCategory: async <T = myInterface.SearchByCategory[]>(category: string): Promise<AxiosResponse<T>> =>
    instance.get<T>(`api/home/${category}`),
};

export { login, naverMap, notice, searchByCategory };
