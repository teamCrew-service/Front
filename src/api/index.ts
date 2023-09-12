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

export { login, naverMap };
