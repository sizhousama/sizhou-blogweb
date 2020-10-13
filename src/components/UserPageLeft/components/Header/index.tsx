/*
 * @Author: sizhou
 * @Date: 2020-06-29 13:56:14
 * @Last Modified by: sizhou
 * @Last Modified time: 2020-09-08 14:35:50
 */

import React, { useEffect, useState, useRef } from 'react';
import styles from './index.less';
import { connect } from 'dva';
import { Dispatch,history } from 'umi';
import { UserState, Loading } from '@/models/connect';
import { Avatar, Tooltip } from 'antd';
import { SettingFilled,IdcardOutlined,createFromIconfontCN  } from '@ant-design/icons';
const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2127461_jxkarnscef.js', // 在 iconfont.cn 上生成
});
interface ArticleListProps {
  dispatch: Dispatch;
  user: UserState;
  loading?: boolean;
}

const UserPageHeader: React.FC<ArticleListProps> = props => {
  const { dispatch, loading, user } = props;
  const userInfo: any = user.userInfo;
  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <>
      <div className={`${styles.headerbox}`}>
        <div className={`fl ${styles.avatar}`}>
          <Avatar src={userInfo.avatar} size={85} />
        </div>
        <div className={styles.info}>
          <span className={styles.name}>{userInfo.username}</span>
          <span className={styles.profession}>
            <MyIcon className={styles.infoicon} type="icon-gongwenbao" />
            {userInfo.profession}
          </span>
          <span className={styles.summary}>
          <MyIcon className={styles.infoicon} type="icon-card" />
            {userInfo.summary !== ''
              ? userInfo.summary
              : '这个家伙很懒，什么也没留下~'}
          </span>
        </div>
        <div className={styles.opts}>
          <Tooltip placement="bottom" title='编辑个人信息'>
            <SettingFilled className={styles.settingInfo} onClick={()=>{history.push('/settings')}} />
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default connect(
  ({ user, loading }: { user: UserState; loading: Loading }) => ({
    user,
    loading: loading.models.user,
  }),
)(UserPageHeader);
