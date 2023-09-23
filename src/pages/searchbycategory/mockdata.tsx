let MockData: any[] = [
  { title: 'T친목', category: '친목', crewType: '정모', subTitle: '소', imageList: [], location: 'dd' },
  { title: 'T음료', category: '음료', crewType: '정모', subTitle: '소', imageList: [], location: 'dd' },
  { title: 'T여행', category: '여행', crewType: '정모', subTitle: '소', imageList: [], location: 'dd' },
  { title: 'T운동', category: '운동', crewType: '정모', subTitle: '소', imageList: [], location: 'dd' },
  { title: 'T책/글', category: '책/글', crewType: '정모', subTitle: '소', imageList: [], location: 'dd' },
  {
    title: 'T커리어',
    category: '커리어',
    crewType: '정모',
    subTitle: '소',
    imageList: [],
    location: 'dd',
  },
  {
    title: 'T공연/축제',
    category: '공연/축제',
    crewType: '정모',
    subTitle: '소',
    imageList: [],
    location: 'dd',
  },
  { title: 'T음악', category: '음악', crewType: '정모', subTitle: '소', imageList: [], location: 'dd' },
  {
    title: 'T만들기',
    category: '만들기',
    crewType: '정모',
    subTitle: '소',
    imageList: [],
    location: 'dd',
  },
  { title: 'T사진', category: '사진', crewType: '정모', subTitle: '소', imageList: [], location: 'dd' },
  {
    title: 'T반려동물',
    category: '반려동물',
    crewType: '정모',
    subTitle: '소',
    imageList: [],
    location: 'dd',
  },
  {
    title: 'T자유주제',
    category: '자유주제',
    crewType: '정모',
    subTitle: '소',
    imageList: [],
    location: 'dd',
  },
];

MockData = [
  ...MockData,
  ...MockData.map(item => ({
    ...item,
    crewType: '번개',
  })),
];

MockData = MockData.map(item => ({
  ...item,
  title: `${item.title} ${item.crewType}`,
  current: 5,
}));

export default MockData;
