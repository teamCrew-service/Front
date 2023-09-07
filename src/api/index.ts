import instance from 'api/instance';

interface LoginMessage {
  message: string;
}

const login = {
  kakaoLogin: async <T = LoginMessage>(): Promise<T> => {
    const { data } = await instance.get<T>('api/auth/kakao');
    return data;
  },
  naverLogin: async <T = LoginMessage>(): Promise<T> => {
    const { data } = await instance.get<T>('api/auth/naver');
    return data;
  },
};

const otherFunc = {};

export { login, otherFunc };
