import React from 'react';

function Img({ step }: { step: number }): JSX.Element {
  const imgList: string[] = [
    'https://cdn.pixabay.com/photo/2017/06/20/22/14/man-2425121_1280.jpg',
    'https://cdn.pixabay.com/photo/2014/12/16/22/25/sunset-570881_1280.jpg',
    'https://cdn.pixabay.com/photo/2019/03/12/12/47/people-4050698_1280.jpg',
  ];
  return <img src={imgList[step - 1]} alt="explain" width={307} height={234} style={{ marginTop: '24px' }} />;
}

export default Img;
