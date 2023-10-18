function useCalDate(input: Date): string {
  console.log('cal date = ', input);
  let dayString;
  const day = input.getDay();
  switch (day) {
    case 1:
      dayString = '(월)';
      break;
    case 2:
      dayString = '(화)';
      break;
    case 3:
      dayString = '(수)';
      break;
    case 4:
      dayString = '(목)';
      break;
    case 5:
      dayString = '(금)';
      break;
    case 6:
      dayString = '(토)';
      break;
    case 0:
      dayString = '(일)';
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
