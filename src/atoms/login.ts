import { atom } from 'recoil';

const category = atom<string[]>({
  key: 'loginCategoryState',
  default: [],
});

export default category;
