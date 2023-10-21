import { atom } from 'recoil';

export const category = atom<string>({
  key: 'loginCategoryState',
  default: '',
});

export const nickName = atom<string>({
  key: 'loginNickNameState',
  default: '',
});
