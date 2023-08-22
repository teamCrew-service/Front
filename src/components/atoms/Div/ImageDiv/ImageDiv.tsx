import React from 'react';
import ImageDivStyle from './ImageDivStyle';

function ImageDiv({ imageURL }: { imageURL: string }): JSX.Element {
  return <ImageDivStyle $imageURL={imageURL} style={{ marginTop: '24px' }} />;
  // <img src={imgList[step - 1]} alt="explain" width={307} height={234} style={{ marginTop: '24px' }} />;
}

export default ImageDiv;
