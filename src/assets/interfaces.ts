interface Notice {
  noticeTitle: string;
  noticeDDay: string | null;
  profileImage: string[] | null;
}

interface SearchByCategory {
  crewId: string;
  category: string | null;
  crewTitle: string | null;
  profileImage: string[] | null;
  crewDDay: Date | null;
  crewAddress: string | null;
  current: number | null;
}

export type { Notice, SearchByCategory };
