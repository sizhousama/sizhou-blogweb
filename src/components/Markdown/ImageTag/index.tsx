/*
 * @Author: sizhou
 * @Date: 2020-04-16 20:08:54
 * @Last Modified by: sizhou
 * @Last Modified time: 2020-04-16 20:35:46
 */

import React from 'react';
import Zmage from 'react-zmage';

const ImageTag = (props: any) => {
  const { src } = props;
  const style: object = { width: '100%' };
  return (
    <Zmage
      src={src}
      controller={{
        rotate: false,
        zoom: false,
      }}
    />
  );
};

export default ImageTag;
