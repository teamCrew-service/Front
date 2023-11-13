const useDeleteCookie = (name: string, path: string): void => {
  // 현재 날짜 이전의 시간으로 만료일을 설정하여 쿠키를 삭제
  const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() - 1);

  // 만료일을 이전으로 설정한 쿠키를 브라우저에 설정
  document.cookie = `${name}=; expires=${expirationDate.toUTCString()}; path=${path}`;
};

export default useDeleteCookie;
