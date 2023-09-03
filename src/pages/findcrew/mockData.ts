const spots: Array<{
  lat: number;
  lng: number;
  title: string;
  subTitle: string;
  category: string;
  crewType: '정모' | '번개';
  imageList?: string[];
  dueDate?: Date;
  location: string;
  current: number;
}> = [
  {
    lat: 35.057,
    lng: 128.965,
    title: '같이 운동하고 건강한 저녁 함께해요!',
    subTitle: '홍대 근처 사시는 분들 함께 달리면 좋을 것 같아요!',
    category: '운동',
    crewType: '번개',
    location: '소공동',
    dueDate: new Date(2023, 8, 23, 14),
    current: 3,
  },
  {
    lat: 35.057,
    lng: 128.96,
    title: '2',
    subTitle: 'hi',
    category: '친목',
    crewType: '정모',
    location: '소공동',
    current: 2,
  },
  {
    lat: 35.058,
    lng: 128.97,
    title: '3',
    subTitle: 'mine',
    category: '음악',
    crewType: '번개',
    location: '소공동',
    dueDate: new Date(2023, 9, 23, 7),
    current: 1,
  },
  {
    lat: 35.0666112,
    lng: 128.9579096,
    title: '장림동',
    subTitle: 'jang',
    category: '공연/축제',
    crewType: '정모',
    location: '소공동',
    current: 7,
  },
  {
    lat: 38.0666112,
    lng: 128.5579096,
    title: '소공동',
    subTitle: 'sung',
    category: '자유주제',
    crewType: '정모',
    location: '소공동',
    current: 8,
  },
  {
    lat: 37.566535,
    lng: 126.9779692,
    title: '서울',
    subTitle: 'seoul',
    category: '댄스',
    crewType: '정모',
    location: '서울역',
    current: 8,
  },
];

export default spots;
