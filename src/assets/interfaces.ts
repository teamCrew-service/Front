// 장소
export interface Spot {
  crewAttendedMember: number;
  crew_category: string;
  crew_crewAddress: string;
  crew_crewDDay: Date;
  crew_crewId: number;
  crew_crewMaxMember: number;
  crew_crewTitle: string;
  crew_crewType: string;
  crew_latitude: number;
  crew_longtitude: number;
  crew_thumbnail: string;
}

// 최초 로그인 정보
export interface AddUserInfoDto {
  nickname: string | null;
  age: string | null;
  gender: string | null;
  profileImage: string | null;
  myMessage: string | null;
  location: string | null;
}
export interface Information {
  addUserInfoDto: AddUserInfoDto;
  topicDto: {
    interestTopic: string | null;
  };
}

// 크루 상세정보
export interface Crew {
  captainId: number;
  captainLocation: string;
  captainNickname: string;
  captainProfileImage: string;
  crewAttendedMember: string;
  crew_category: string;
  crew_createdAt: string;
  crew_crewAddress: string;
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
export interface Member {
  member_memberId: number;
  member_userId: number;
  users_nickname: string;
  users_profileImage: string;
  users_location: string;
}
// 일정
export interface Schedule {
  createdAt: string;
  participate: number;
  scheduleAddress: string;
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
// 투표 공지
export interface VoteForm {
  voteContent: string;
  voteEndDate: string;
  voteFormId: number;
  voteTitle: string;
  crewId: number;
}
// 정모 공지
export interface CrewNotice {
  noticeTitle: string;
  noticeContent: string;
  noticeAddress: string;
  noticeDDay: string;
}
export interface AllNotice {
  regularNotice: CrewNotice[];
  voteForm: VoteForm[];
}
export interface GuestDetail {
  createdCrewPeriod: number;
  crew: Crew;
  member: Member[];
  personType: string;
  likeCount: number;
}

export interface MemberDetail extends GuestDetail {
  schedule: Schedule[];
  allNotice: AllNotice;
}

export interface Notice {
  noticeTitle: string;
  noticeDDay: string | null;
  profileImage: string[] | null;
  isCanceled: boolean | null;
}

export interface MakeCrew {
  createCrewDto: {
    category: string;
    crewAddress: string;
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
}

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

export interface ComingDate {
  schedule: ComingDateSchedule;
  nickname: string;
}

export interface WholeComingDate {
  comingSchedule: ComingDateSchedule[];
  participateSchedule: ComingDateSchedule[];
}

export interface SignUpForm {
  signupFormId: number;
  question1: string;
  question2: string;
  crewId: number;
}

export interface JoinedCrewList {
  joinedCrew: SearchByCategory[];
}

export interface MyCreatedCrew extends SearchByCategory {
  existSignup: string;
}
