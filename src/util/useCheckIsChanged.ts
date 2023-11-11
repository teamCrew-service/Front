export default function useCheckIsChanged(
  base: string | number | string[],
  changed: string | number | string[],
  setFunc: React.Dispatch<React.SetStateAction<boolean>>,
): void {
  if (typeof base === 'object' && typeof changed === 'object') {
    // 배열의 길이가 다르다 : 변경이 생겼다.
    if (base.length === changed.length) {
      // 변경된 배열의 인자 중 하나라도 기존의 배열에 없다 : 변경이 생겼다.
      changed.map(item => {
        if (!base.includes(item)) {
          setFunc(true);
        }
        return null;
      });
      setFunc(false);
    } else {
      setFunc(true);
    }
  }
  if (base !== changed) {
    setFunc(true);
  } else {
    setFunc(false);
  }
}
