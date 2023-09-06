function useCalDate(input: Date): string {
  let dayString;
  const day = input.getDay();
  switch (day) {
    case 1:
      dayString = '월요일';
      break;
    case 2:
      dayString = '화요일';
      break;
    case 3:
      dayString = '수요일';
      break;
    case 4:
      dayString = '목요일';
      break;
    case 5:
      dayString = '금요일';
      break;
    case 6:
      dayString = '토요일';
      break;
    case 0:
      dayString = '일요일';
      break;
    default:
      dayString = '';
  }
  let timeString = `오전 ${input.getHours()}시`;
  if (input.getHours() > 12) {
    timeString = `오후 ${input.getHours() - 12}시`;
  }
  return `${input.getMonth() + 1}월 ${input.getDate()}일 ${dayString} ${timeString}`;
}

export default useCalDate;
