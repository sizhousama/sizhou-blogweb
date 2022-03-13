import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { Row, Col } from 'antd';
import UserPageLeft from '@/components/UserPageLeft';

const User: React.FC = props => {
  return (
    <>
      <Row gutter={0}>
        <Col span={24}>
          <UserPageLeft></UserPageLeft>
        </Col>
      </Row>
    </>
  );
};

export default User;
