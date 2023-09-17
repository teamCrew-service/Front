// 장소
interface Spot {
  category: string;
  crewAddress: string;
  crewDDay: Date;
  crewId: number;
  crewTitle: string;
  latitude: number;
  longtitude: number;
  thumbnail: string;
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

export type { Spot, Information, Crew, Detail, Notice };
