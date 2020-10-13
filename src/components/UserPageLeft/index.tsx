/*
 * @Author: sizhou
 * @Date: 2020-06-29 13:56:14
 * @Last Modified by: sizhou
 * @Last Modified time: 2020-09-08 14:35:50
 */

import React, { useEffect, useState, useRef } from 'react';
import styles from './index.less';
import { connect } from 'dva';
import { Dispatch } from 'umi';
import {Tabs} from 'antd'
import { UserState, Loading } from '@/models/connect';
import UserArts from './components/Articles';
import UserPageHeader from './components/Header';
interface UserPageProps {
  dispatch: Dispatch;
  user: UserState;
  loading?: boolean;
}

const UserPageLeft: React.FC<UserPageProps> = props => {
  const { dispatch, loading, user } = props;
  const {TabPane} = Tabs
  return (
    <>
      <UserPageHeader></UserPageHeader>
      <div className={styles.userContent}>
        <Tabs defaultActiveKey="1" className={styles.userTabs}> 
          <TabPane tab="文章" key="1" >
            <UserArts></UserArts>
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default connect(
  ({ user, loading }: { user: UserState; loading: Loading }) => ({
    user,
    loading: loading.models.user,
  }),
)(UserPageLeft);
