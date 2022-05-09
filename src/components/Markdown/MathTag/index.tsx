/*
 * @Author: sizhou
 * @Date: 2020-04-18 06:10:45
 * @Last Modified by: sizhou
 * @Last Modified time: 2020-04-18 06:18:48
 */

import React from 'react';
import MathJax from 'react-mathjax';

const MathTag = (props: any) => {
  return <MathJax.Node formula={props.value} />;
};

export default MathTag;
