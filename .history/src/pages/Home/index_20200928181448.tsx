import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { Row, Col } from 'antd';
import ArticleList from '@/components/ArticleList';
import HomeTags from '@/components/HomeTags';
const Home: React.FC = props => {
  const [htag,setHtag] = useState('')
  const clickTag = (id:string)=>{
    setHtag(id)
  }
  return (
    <>
      <Row gutter={20} style={{paddingTop:'40px'}}>
        <Col span={17}>
          <ArticleList htag={htag}></ArticleList>
        </Col>
        <Col span={7}>
          <HomeTags click={clickTag}></HomeTags> 
        </Col>
      </Row>
    </>
  );
};

export default Home;
