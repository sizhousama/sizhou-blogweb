/*
 * @Author: sizhou
 * @Date: 2020-04-16 20:44:38
 * @Last Modified by: sizhou
 * @Last Modified time: 2020-04-16 21:35:25
 */

import React from 'react';

const HeadTag = (props: any) => {
  const { level, children } = props;
  if (children.length === 0) return null;
  const {
    props: { nodeKey, value },
  } = children[0];
  return React.createElement(
    `h${level}`,
    { className: 'fw-700', key: nodeKey },
    value,
  );
};

export default HeadTag;
