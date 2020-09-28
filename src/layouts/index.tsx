import styles from './index.less';
import React from 'react';
import { Layout  } from 'antd';
import ComHeader from './components/Header'
const { Header, Content } = Layout;
import AuthRouter from '@/wrappers/auth'

const BasicLayout: React.FC = props => {
  const { children } = props;

  return (
    <Layout>
      <Header className={styles.header}>
        <ComHeader></ComHeader>
      </Header>
      <Content>
        <div className={styles.content}>
          <AuthRouter children={children}></AuthRouter>
        </div>
      </Content>
    </Layout>
  );
};

export default BasicLayout;
