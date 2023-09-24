import type { AxiosResponse } from 'axios';
import type * as myInterface from '../assets/interfaces';
import instance from './instance';

interface LoginMessage {
  message: string;
}

const login = {
  firstLogin: async <T = LoginMessage>(information: myInterface.Information): Promise<T> => {
    const { data } = await instance.put<T>('api/auth/info', information);
    return data;
  },
  nickCheck: async <T = LoginMessage>(nickname: string): Promise<T> => {
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

const crewDetail = {
  getDetail: async <T = myInterface.Detail>(crewId: string): Promise<AxiosResponse<T>> =>
    instance.get<T>(`api/crew/${crewId}`),
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

export { login, navermap, crewDetail, notice, searchByCategory };
