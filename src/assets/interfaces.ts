// 장소
export interface Spot {
  crewAttendedMember: number;
  crew_category: string;
  crew_crewAddress: string;
  crew_crewDDay: Date;
  crew_crewId: number;
  crew_crewMaxMember: number;
  crew_crewTitle: string;
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
  scheduleTitle: string;
  scheduleContent: string;
  scheduleDDay: Date;
  scheduleAddress: string;
  scheduleLatitude: number;
  scheduleLongitude: number;
}
export interface GuestDetail {
  createdCrewPeriod: number;
  crew: Crew;
  member: Member[];
  personType: string;
}
export interface MemberDetail extends GuestDetail {
  schedule: Schedule[];
}

// 공지
export interface VoteForm {
  // createdAt: string;
  // deleteAt: null | string;
  // updatedAt: string;
  voteContent: string;
  voteEndDate: string;
  voteFormId: number;
  // voteOption1: string;
  // voteOption2: string;
  // voteOption3: string;
  // voteOption4: string;
  voteTitle: string;
  crewId: number;
}
export interface Notice {
  noticeTitle: string;
  noticeContent: string;
  noticeAddress: string;
  noticeDDay: string;
}
export interface TotalNotice {
  notice: Notice[];
  voteForm: VoteForm[];
}
