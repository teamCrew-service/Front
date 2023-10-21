import { atom } from 'recoil';

export const category = atom<string>({
  key: 'loginCategoryState',
  default: '',
});

export const nickName = atom<string>({
  key: 'loginNickNameState',
  default: '',
});

export const birtYear = atom<string>({
  key: 'loginBirthYearState',
  default: '',
});

export const userGender = atom<string>({
  key: 'genderState',
  default: '',
});

export const ProfileImage = atom<Blob | null>({
  key: 'ProfileImageState',
  default: null,
});
