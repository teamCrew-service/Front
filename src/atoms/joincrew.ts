import { atom } from 'recoil';

export const myIntroStr = atom<string>({
  key: 'myIntroState',
  default: '',
});

export const myAdjListArray = atom<string[]>({
  key: 'myAdjListState',
  default: [],
});
