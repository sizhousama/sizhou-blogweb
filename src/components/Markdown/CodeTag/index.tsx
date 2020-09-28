/*
 * @Author: 柒叶
 * @Date: 2020-04-16 06:35:02
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-13 16:32:50
 */

import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia} from 'react-syntax-highlighter/dist/esm/styles/prism';


const CodeTag = (props:any) => {
  const { value, language } = props

  if (!value) return null
  return (
    <SyntaxHighlighter
      language={language}
      style={okaidia}
      showLineNumbers={true}
    >
      {value}
    </SyntaxHighlighter>
  )
}

export default CodeTag
