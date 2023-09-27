import { atom } from 'recoil';

// 공통
export const stepNum = atom<number>({
  key: 'stepState',
  default: 0,
});

export const typeStr = atom<string>({
  key: 'typeState',
  default: '',
});

export const categoryStr = atom<string>({
  key: 'categoryState',
  default: '',
});

export const locationStr = atom<string>({
  key: 'locationState',
  default: '',
});

// 단기
export const dateDate = atom<{
  year: number | null;
  month: number | null;
  date: number | null;
  timeTable: string;
  time: number | null;
  minutes: number | null;
}>({
  key: 'dateState',
  default: { year: null, month: null, date: null, timeTable: '', time: null, minutes: null },
});

export const recommendStr = atom<string>({
  key: 'recommendState',
  default: '',
});

export const spendTimeStr = atom<string>({
  key: 'spendTimeState',
  default: '',
});

export const ageStr = atom<string>({
  key: 'ageState',
  default: '',
});
