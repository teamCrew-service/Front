// 로그인 관련 -----------------
export interface UserInfoDto {
  nickname: string | null;
  age: number | null;
  gender: string | null;
  myMessage: string | null;
  location: string | null;
}
// 최초 유저 정보 입력 양식
export interface Information {
  // 유저 정보
  addUserInfoDto: UserInfoDto;
  // 관심사
  topicDto: {
    interestTopic: string | null;
  };
}
// --------------------------

// 크루 공지 관련 --------------------
// 공지 생성 양식
export interface NoticeInfo {
  noticeTitle: string;
  noticeContent: string;
  noticeAddress: string;
  noticeDDay: Date;
  noticePlaceName: string;
  noticeLatitude: number;
  noticeLongitude: number;
}
export interface CrewNotice {
  createdAt: string;
  noticeAddress: string;
  noticePlaceName: string;
  noticeContent: string;
  noticeDDay: string;
  noticeId: string;
  noticeIsDone: number;
  noticeLatitude: number;
  noticeLongitude: number;
  noticeTitle: string;
  userId: string;
}
// 투표 공지 생성 양식
export interface VoteInfo {
  voteFormTitle: string;
  voteFormContent: string;
  voteFormEndDate: Date;
  multipleVotes: boolean;
  anonymousVote: boolean;
  voteFormOption1: string;
  voteFormOption2: string;
  voteFormOption3: string | null;
  voteFormOption4: string | null;
  voteFormOption5: string | null;
}
export interface VoteForm {
  crewId: number;
  voteFormContent: string;
  voteFormEndDate: string;
  voteFormId: string;
  voteFormIsDone: number;
  voteFormTitle: string;
  alreadyVote: number;
}
export interface Vote {
  crewId: string;
  nickname: string;
  profileImage: string;
  userId: string;
  vote: string;
  voteFormId: string;
  voteId: string;
}
export interface VoteResult {
  voteForm: VoteInfo;
  vote: Vote[];
}
// 공지 리스트
export interface AllNotice {
  // 일반 공지
  regularNotice: CrewNotice[];
  // 투표 공지
  voteForm: VoteForm[];
}
// --------------------------------

// 크루 상세 정보 --------------------
// 1. 크루 정보
export interface Crew {
  captainId: number;
  captainAge: number;
  captainLocation: string;
  captainMessage: string;
  captainNickname: string;
  captainProfileImage: string;
  crewAttendedMember: string;
  crew_category: string;
  crew_createdAt: string;
  crew_crewAddress: string;
  crew_crewPlaceName: string;
  crew_crewAgeInfo: string;
  crew_crewContent: string;
  crew_crewDDay: string;
  crew_crewId: string;
  crew_crewMaxMember: number;
  crew_crewMemberInfo: string;
  crew_crewSignup: number;
  crew_crewTitle: string;
  crew_crewType: string;
  crew_deletedAt: null;
  crew_latitude: number;
  crew_longtitude: number;
  crew_thumbnail: string;
  signupFormId: string;
}
// 2. 크루 멤버
export interface Member {
  member_memberId: number;
  member_userId: number;
  users_nickname: string;
  users_profileImage: string;
  users_location: string;
}

// 3 - 1. 참여자 목록
export interface Participant {
  participantProfileImage: string;
  participantUserId: number;
}
// 3. 크루 일정
export interface Schedule {
  createdAt: string;
  participants: Participant[];
  scheduleAddress: string;
  schedulePlaceName: string;
  scheduleAttendedMember: string;
  scheduleContent: string;
  scheduleDDay: Date;
  scheduleId: string;
  scheduleIsDone: number;
  scheduleLatitude: number;
  scheduleLongitude: number;
  scheduleMaxMember: string;
  scheduleTitle: string;
  userId: string;
}
// 4. 크루 사진첩 이미지
export interface Image {
  imageId: string;
  crewId: string;
  userId: string;
  image: string;
}
// 게스트일 경우
export interface GuestDetail {
  captainTopics: Array<{ userId: string; interestTopic: string }>;
  createdCrewPeriod: number;
  crew: Crew;
  image: Image[];
  member: Member[];
  personType: string;
  myUserId: string;
  likeCheck: boolean;
  likeCount: number;
}

// 멤버일 경우
export interface MemberDetail extends GuestDetail {
  schedule: Schedule[];
  allNotice: AllNotice;
}
// -------------------------------

// 크루 생성 양식 -------------------
export interface CreateCrew {
  createCrewDto: {
    category: string;
    crewAddress: string;
    crewPlaceName: string;
    crewType: string;
    crewDDay: Date | null;
    crewMemberInfo: string;
    crewTimeInfo: string;
    crewAgeInfo: string;
    crewSignup: boolean;
    crewTitle: string;
    crewContent: string;
    thumbnail: string;
    crewMaxMember: number;
    crewLatitude: number;
    crewLongtitude: number;
  };
  createSignupFormDto: {
    question1: string;
    question2: string;
  };
}
// -------------------------------

// 다가오는 일정 부분 ---------------------
// 다가오는 일정
export interface ComingDateSchedule {
  schedule: {
    scheduleTitle: string;
    scheduleDDay: string;
    crewType: string;
    scheduleId: string;
    crewId: string;
  };
  profileImage: Array<{
    member_profileImage: string;
    member_userId: string;
    member_userName: string;
  }>;
}

// Home - 다가오는 일정
export interface ComingDate {
  schedule: ComingDateSchedule;
  nickname: string;
}

// UpcomingData - 내 전체 일정
export interface WholeComingDate {
  comingSchedule: ComingDateSchedule[];
  participateSchedule: ComingDateSchedule[];
}
// -----------------------------------

// 크루 요약 정보
export interface SearchByCategory {
  crewAttendedMember: string;
  crew_category: string;
  crew_crewAddress: string;
  crew_crewContent: string;
  crew_crewDDay: string;
  crew_crewId: string;
  crew_crewMaxMember: string;
  crew_crewTitle: string;
  crew_crewType: string;
  crew_thumbnail: string;
  crew_crewPlaceName: string;
}

// 내 주변 모임 찾기 ----------------------
// 장소
export interface Spot extends SearchByCategory {
  likeCheck: string;
  crew_latitude: number;
  crew_longtitude: number;
}
// ------------------------------------

// 내 크루 ------------------------------
// 내가 만든 크루 리스트
export interface MyCreatedCrew extends SearchByCategory {
  existSignup: string;
}
// ------------------------------------

// 크루 가입 양식
export interface SignUpForm {
  signupFormId: number;
  question1: string;
  question2: string;
  crewId: number;
}

// 크루원 신청서 양식
export interface SingUpItemForm {
  nickname: string;
  age: number;
  location: string;
  myMessage: string;
  signupId: number;
  crewId: string;
  userId: string;
  answer1: string;
  answer2: string;
  permission: null;
  createdAt: string;
  interestTopics: string[];
  profileImage?: string;
}

// 투표 결과 표시 상태 Type
export interface VoteResultInfo {
  isOpen: boolean;
  crewId: string | null;
  voteFormId: string | null;
}

// 투표 생성 상태 Type
export interface VoteCreateInfo {
  isOpen: boolean;
  voteFormId: string | null;
}

/* 마이 페이지 */
export interface MyInfo {
  userId: string;
  provider: string;
  email: string;
  nickname: string;
  profileImage: string;
  age: number;
  gender: string;
  myMessage: string;
  location: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface MyTopic {
  userId: string;
  interestTopic: string;
}
export interface MyPage {
  user: MyInfo;
  topic: MyTopic[];
  likedCrew: SearchByCategory[];
}
export interface EditProfile {
  editUserInfoDto: UserInfoDto;
  editTopicDto: {
    interestTopic: string | null;
  };
}
