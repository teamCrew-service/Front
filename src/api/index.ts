import type { AxiosResponse } from 'axios';
import type * as myInterface from '../assets/interfaces';
import instance from './instance';

interface LoginMessage {
  message: string;
}

interface MakeCrew {
  createCrewDto: {
    category: string;
    crewAddress: string;
    crewType: string;
    crewDDay: string;
    crewMemberInfo: string;
    crewTimeInfo: string;
    crewAgeInfo: string;
    crewSignup: boolean;
    crewTitle: string;
    crewContent: string;
    thumbnail: string;
    crewMaxMember: number;
    crewLatitude: number;
    crewLongtitude: number;
  };
  createSignupFormDto: {
    question1: string;
    question2: string;
  };
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
};

const meet = {
  makeCrew: async (payload: MakeCrew) => {
    const { data } = await instance.post('/api/crew/createcrew', payload);

    return data;
  },
};

export { login, navermap, crewDetail, notice, meet };
