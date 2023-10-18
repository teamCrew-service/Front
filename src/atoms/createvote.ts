import { atom } from 'recoil';

export const voteTitle = atom<string>({
  key: 'voteTitleState',
  default: '',
});

export const voteOptionList = atom<{
  option1: string | null;
  option2: string | null;
  option3: string | null;
  option4: string | null;
  option5: string | null;
}>({
  key: 'voteOptionListState',
  default: { option1: null, option2: null, option3: null, option4: null, option5: null },
});

export const voteTypeList = atom<{ multi: boolean; anonymous: boolean; possiblePlus: boolean }>({
  key: 'voteTypeListState',
  default: { multi: false, anonymous: false, possiblePlus: false },
});

export const voteContent = atom<string>({
  key: 'voteContentState',
  default: '',
});
