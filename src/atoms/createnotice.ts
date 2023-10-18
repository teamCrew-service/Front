import { atom } from 'recoil';

export const noticeLocation = atom<string>({
  key: 'noticeLocationState',
  default: '',
});

export const noitcePlace = atom<string>({
  key: 'noticePlaceState',
  default: '',
});

export const noticeLatLng = atom<{ lat: number; lng: number } | null>({
  key: 'noticeLatLng',
  default: null,
});

export const noticeTitle = atom<string>({
  key: 'noticeTitleState',
  default: '',
});

export const noticeDate = atom<{
  year: number | null;
  month: number | null;
  date: number | null;
  timeTable: string;
  time: number | null;
  minutes: number | null;
}>({
  key: 'noticeDateState',
  default: { year: null, month: null, date: null, timeTable: '', time: null, minutes: null },
});

export const noticeContent = atom<string>({
  key: 'noticeContentState',
  default: '',
});
