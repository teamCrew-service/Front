const MockData: Array<{
  noticeTitle: string;
  noticeDDay: Date;
  UrlList: Array<{ number: number; url: string }>;
  isCanceled: boolean;
}> = [
  {
    noticeTitle: 'Future Event 1',
    noticeDDay: new Date(new Date().getTime() + 86400000),
    UrlList: [
      { number: 1, url: '' },
      { number: 2, url: '' },
      { number: 3, url: '' },
      { number: 4, url: '' },
      { number: 5, url: '' },
    ],
    isCanceled: false,
  },
  {
    noticeTitle: 'Past Event 1',
    noticeDDay: new Date(new Date().getTime() - 86400000),
    UrlList: [
      { number: 1, url: '' },
      { number: 2, url: '' },
      { number: 3, url: '' },
      { number: 4, url: '' },
      { number: 5, url: '' },
    ],
    isCanceled: false,
  },
  {
    noticeTitle: 'Canceled Event 1',
    noticeDDay: new Date(new Date().getTime() + 10000),
    UrlList: [
      { number: 1, url: '' },
      { number: 2, url: '' },
      { number: 3, url: '' },
      { number: 4, url: '' },
      { number: 5, url: '' },
    ],
    isCanceled: true,
  },
];

export default MockData;
