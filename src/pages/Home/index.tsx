import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { Row, Col } from 'antd';
import ArticleList from '@/components/ArticleList';
import HomeTags from '@/components/HomeTags';
import { getBrowser } from '@/utils/utils';
const Home: React.FC = props => {
  const [htag, setHtag] = useState<number | null>(null);
  const mobile = getBrowser().isMobile;
  const clickTag = (id: number) => {
    setHtag(id);
  };
  return (
    <>
      <Row gutter={mobile ? 0 : 20} style={{ paddingTop: '40px' }}>
        <Col span={mobile ? 24 : 17}>
          <ArticleList htag={htag}></ArticleList>
        </Col>
        <Col span={mobile ? 0 : 7}>
          <HomeTags click={clickTag}></HomeTags>
        </Col>
      </Row>
    </>
  );
};

export default Home;
