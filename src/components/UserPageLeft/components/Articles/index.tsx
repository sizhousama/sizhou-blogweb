/*
 * @Author: sizhou
 * @Date: 2020-06-29 13:56:14
 * @Last Modified by: sizhou
 * @Last Modified time: 2020-09-08 14:35:50
 */

import React, { useEffect, useState, useRef } from 'react';
import styles from './index.less';
import ArticleItem from '@/components/ArticleItem';
import { connect } from 'dva';
import { List } from 'antd';
import { Dispatch } from 'umi';
import { UserState, Loading } from '@/models/connect';

interface ArticleListProps {
  dispatch: Dispatch;
  user: UserState;
  loading?: boolean;
}

const UserArts: React.FC<ArticleListProps> = props => {
  const { dispatch, loading, user } = props;
  const { userArts } = user;
  const pref = useRef({
    page: 1,
    size: 10,
    orderType: 'createdAt',
  });
  useEffect(() => {
    getArts();
  }, []);

  const getArts = () => {
    dispatch({
      type: 'user/getuserarts',
      payload: pref.current,
      callback(res) {
        // if(res.data.length)
      },
    });
  };

  return (
    <>
      <List
        className={styles.artlist}
        itemLayout="horizontal"
        dataSource={userArts}
        loading={loading}
        renderItem={item => (
          <List.Item className={styles.artitem}>
            <ArticleItem art={item} opts={true} refresh={getArts}></ArticleItem>
          </List.Item>
        )}
      />
    </>
  );
};

export default connect(
  ({ user, loading }: { user: UserState; loading: Loading }) => ({
    user,
    loading: loading.models.user,
  }),
)(UserArts);
