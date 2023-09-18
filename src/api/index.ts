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

interface MakeCrew {
  userId: number;
  crewType: string;
  category: string;
  crewAddress: string;
  crewMemberInfo: string;
  crewTimeInfo: string;
  crewAgeInfo: string;
  crewSignup: boolean;
  crewTitle: string;
  crewContent: string;
  crewMaxMember: number;
  latitude: number;
  longtitude: number;
  question1: string;
  question2: string;
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

const meet = {
  makeCrew: async (payload: MakeCrew) => {
    const { data } = await instance.post('/api/crew/create', { payload });
    return data;
  },
};
const naverMap = {};

export { login, naverMap, meet };
