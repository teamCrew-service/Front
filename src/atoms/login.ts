import { atom } from 'recoil';
import defaultImage from '../assets/images/profile.jpg';

export const userCategory = atom<string[]>({
  key: 'userCategoryState',
  default: [],
});

export const userNickName = atom<string>({
  key: 'userNickNameState',
  default: '',
});

export const userBirtYear = atom<string>({
  key: 'userBirthYearState',
  default: '',
});

export const userGender = atom<string>({
  key: 'userGenderState',
  default: '',
});

export const userProfile = atom<{ url: string; file: Blob | null }>({
  key: 'userProfileState',
  default: { url: defaultImage, file: null },
});

export const userContent = atom<string>({
  key: 'userContentState',
  default: '',
});

export const userLocation = atom<{ lat: number; lng: number; location: string }>({
  key: 'userLocationState',
  // 초기 위치 : 서울역
  default: { lat: 37.556, lng: 126.9723, location: '' },
});
