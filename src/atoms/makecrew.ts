import { atom } from 'recoil';

// 공통 현재 진행 중인 단계
export const stepNum = atom<number>({
  key: 'stepState',
  default: 0,
});

// 공통 1. 모임 유형
export const typeStr = atom<string>({
  key: 'typeState',
  default: '',
});

// 공통 2. 관심사
export const categoryStr = atom<string>({
  key: 'categoryState',
  default: '',
});

// 공통 3. 위치
export const locationStr = atom<string>({
  key: 'locationState',
  default: '',
});

// 단기 4. 날짜
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

// 단기 5. 선호하는 멤버
// 장기 4.
export const recommendStr = atom<string>({
  key: 'recommendState',
  default: '',
});

// 단기 6. 예상 시간
// 장기 5.
export const spendTimeStr = atom<string>({
  key: 'spendTimeState',
  default: '',
});

// 단기 7. 연령대
// 장기 6.
export const ageStr = atom<string>({
  key: 'ageState',
  default: '',
});

// 단기 8. 참여 방식
// 장기 7.
export const attendMethodBool = atom<string>({
  key: 'attendMethodState',
  default: '',
});

// 단기 9. 모임 이름
// 장기 8.
export const titleStr = atom<string>({
  key: 'titleState',
  default: '',
});

// 단기 10. 모임 소개
// 장기 9.
export const introStr = atom<string>({
  key: 'introState',
  default: '',
});
export const advantageStr = atom<string>({
  key: 'advantageState',
  default: '',
});
export const activityStr = atom<string>({
  key: 'activityState',
  default: '',
});
export const ruleStr = atom<string>({
  key: 'ruleState',
  default: '',
});
export const maxMemberStr = atom<number | null>({
  key: 'maxMemberState',
  default: null,
});
