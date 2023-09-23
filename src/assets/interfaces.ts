// 장소
interface Spot {
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
interface Information {
  interestTopic: string | null;
  nickname: string | null;
  age: string | null;
  gender: string | null;
  profileImage: string | null;
  myMessage: string | null;
  location: string | null;
}

interface Crew {
  crewId: number;
  userId: number;
  category: string;
  crewAddress: string;
  crewType: string;
  crewDDay: string;
  crewMemberInfo: string;
  crewAgeInfo: string;
  crewSignup: number;
  crewTitle: string;
  crewContent: string;
  thumbnail: string;
  crewMaxMember: number;
  latitude: number;
  longtitude: number;
  deletedAt: null;
}

interface Detail {
  crew: Crew;
  member: number[];
}

interface Notice {
  noticeTitle: string;
  noticeDDay: string | null;
  profileImage: string[] | null;
}

interface SearchByCategory {
  crew_crewId: string;
  crew_category: string;
  crew_crewAddress: string;
  crew_crewType: string;
  crew_crewDDay: string;
  crew_crewTitle: string;
  crew_thumbnail: string;
  crew_crewMaxMember: string;
  crewAttendedMember: string;
}

export type { Spot, Information, Crew, Detail, Notice, SearchByCategory };
