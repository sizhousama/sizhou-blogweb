import React, { useEffect, useRef } from 'react';
import styles from './index.less';
import { Card, Avatar } from 'antd';
import { connect } from 'dva';
import { DetailState, Loading } from '@/models/connect';
import { LikeFilled, EyeFilled } from '@ant-design/icons';
interface AuthorProps {
  detail: DetailState;
}

const AuthorInfo: React.FC<AuthorProps> = props => {
  const { detail } = props;
  const { artDetail } = detail;
  const { user } = artDetail;
  return (
    <Card title="作者" style={{ width: '100%' }} className={styles.authorCard}>
      {user && (
        <div>
          <div className={styles.head}>
            <Avatar className={styles.ava} size={50} src={user.avatar} />
            <div className={styles.info}>
              <span>{user.username}</span>
              <span>{user.profession}</span>
            </div>
          </div>
          <div className={styles.mate}>
            <LikeFilled className={styles.icon} />
            获得点赞 {user.total_like}
          </div>
          <div className={styles.mate}>
            <EyeFilled className={styles.icon} />
            被阅读 {user.total_view}次
          </div>
        </div>
      )}
    </Card>
  );
};

export default connect(({ detail }: { detail: DetailState }) => ({
  detail,
}))(AuthorInfo);
