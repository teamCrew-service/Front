# Front

teamCrew-service FE 레포지토리입니다.

# App 설정

1. CRA + TypeScript + PWA setting
2. ESLint 설정 - airbnb
   - .eslintrc.js에서 확인 가능
3. Prettier 사용
   - .prettierrc에서 확인 가능

# git commit 구조

type(타입) : title(제목)

body(본문, 생략 가능)

Resolves : #issueNo, ...(해결한 이슈 , 생략 가능)

See also : #issueNo, ...(참고 이슈, 생략 가능)

## git commit 기본 규칙

- 제목과 본문을 빈 행으로 구분
- 제목은 50글자 이하
- 제목 끝에 마침표X
- 제목은 명령문으로 사용, 과거형X
- 어떻게 보다는 무엇과 왜

## Type

1. feat : 새로운 기능 추가
2. fix : 버그 수정
3. docs : 문서 수정
4. style : 코드 스타일 변경 (기능 수정이 없는 경우)
   ex. 코드 포매팅, 세미콜론 누락
5. design : 사용자 UI 디자인 변경
6. test: 테스트 코드, 리팩토링 테스트 코드 추가
7. refactor : 코드 리팩토링
8. build : 빌드 파일 수정
9. ci : CI 설정 파일 수정
10. pref : 성능 개선
11. chore : 빌드 업무 수정, 패키지 매니저 수정
    ex.gitignore 수정 등
12. rename : 파일 혹은 폴더명을 수정만 한 경우
13. remove : 파일을 삭제만 한 경우
