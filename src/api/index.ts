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
};

const schedule = {
  create: async <T = myInterface.Schedule>(crewId: number, info: T): Promise<T> => {
    const { data } = await instance.post<T>(`api/schedule/${crewId}/createSchedule`, info);
    return data;
  },
};

const notice = {
  getNotice: async <T = myInterface.TotalNotice>(crewId: string): Promise<T> => {
    const { data } = await instance.get<T>(`api/notice/${crewId}`);
    return data;
  },
};

export { login, navermap, crew, schedule, notice };
