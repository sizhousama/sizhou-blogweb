import styles from './index.less';
import React, { useState, useEffect } from 'react';
import { Menu, Button } from 'antd';
import imgUrl from '../../../../public/logo.png';
import { connect } from 'dva';
import { UserState, GlobalState } from '@/models/connect';
import { history } from 'umi';
import UserAvatar from '@/components/UserAvatar';
import { getBrowser } from '@/utils/utils';

import { Dispatch } from 'umi';
interface ComHeaderProps {
  dispatch: Dispatch;
  global: GlobalState;
  user: UserState;
}

const ComHeader: React.FC<ComHeaderProps> = props => {
  const { dispatch, global, user } = props;
  const userInfo: any = user.userInfo;
  const mobile = getBrowser().isMobile;
  const menu = [
    {
      name: '首页',
    },
  ];

  const selectMenu = (v: any) => {
    const key = v.key;
    if (key === '0') {
      history.push('/home');
    }
    dispatch({ type: 'global/setCurNav', payload: key });
  };
  return (
    <div className={styles.navbar}>
      <div className={`fl_1 ${styles.barLeft}`}>
        <img className={styles.logo} src={imgUrl} />
        <Menu
          className={styles.menu}
          mode="horizontal"
          defaultSelectedKeys={['0']}
          selectedKeys={[global.curNav]}
          onSelect={selectMenu}
        >
          {menu.map((item, index) => {
            return (
              <Menu.Item className={styles.menuitem} key={index}>
                {item.name}
              </Menu.Item>
            );
          })}
        </Menu>
      </div>
      <div className={`fl_1 ${styles.barRight}`}>
        {!mobile && (
          <Button
            className={styles.writebtn}
            onClick={() =>
              history.push(`${userInfo !== '' ? '/write/new' : '/login'}`)
            }
            type="primary"
          >
            写文章
          </Button>
        )}
        {userInfo !== '' ? (
          <UserAvatar from="h"></UserAvatar>
        ) : (
          <div className={`fl`}>
            <a className={styles.text} onClick={() => history.push('/login')}>
              登录
            </a>
            {!mobile && <span className={styles.dot}>·</span>}
            {!mobile && (
              <a
                className={styles.text}
                onClick={() => history.push('/register')}
              >
                注册
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default connect(
  ({ user, global }: { user: UserState; global: GlobalState }) => ({
    user,
    global,
  }),
)(ComHeader);
