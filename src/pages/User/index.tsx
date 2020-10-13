import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { Row, Col } from 'antd';
import UserPageLeft from '@/components/UserPageLeft';

const User: React.FC = props => {
  return (
    <>
      <Row gutter={20} >
        <Col span={17}>
          <UserPageLeft></UserPageLeft>
        </Col>
        <Col span={7}>
          
        </Col>
      </Row>
    </>
  );
};

export default User;
