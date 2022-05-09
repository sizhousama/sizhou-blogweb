/*
 * @Author: sizhou
 * @Date: 2020-04-16 06:32:48
 * @Last Modified by: sizhou
 * @Last Modified time: 2020-05-17 19:03:59
 */

import React from 'react';
import ReactMarkdown from 'react-markdown';
import CodeTag from './CodeTag';
import ImageTag from './ImageTag';
import HeadTag from './HeadTag';

const Markdown = (props: any) => {
  const { markdown } = props;
  return (
    <ReactMarkdown
      children={markdown}
      linkTarget={() => '_blank'}
      components={{
        code: CodeTag,
        image: ImageTag,
        head: HeadTag,
      }}
    />
  );
};

export default Markdown;
