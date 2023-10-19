import { atom } from 'recoil';

export const voteOptionList = atom<string[]>({
  key: 'voteOptionListState',
  default: ['', ''],
});

export const voteDueDate = atom<{
  year: number | null;
  month: number | null;
  date: number | null;
  timeTable: string;
  time: number | null;
  minutes: number | null;
}>({
  key: 'voteDueDateState',
  default: { year: null, month: null, date: null, timeTable: '', time: null, minutes: null },
});
