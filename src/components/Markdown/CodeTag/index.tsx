/*
 * @Author: sizhou
 * @Date: 2020-04-16 06:35:02
 * @Last Modified by: sizhou
 * @Last Modified time: 2020-05-13 16:32:50
 */

import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeTag = (props: any) => {
  const { node, inline, className, children } = props;
  const match = /language-(\w+)/.exec(className || '');
  return !inline && match ? (
    <SyntaxHighlighter
      children={String(children).replace(/\n$/, '')}
      style={okaidia}
      language={match[1]}
      PreTag="div"
      {...props}
    />
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

export default CodeTag;
