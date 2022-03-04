import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { Avatar, Tag } from 'antd';
import MathJax from 'react-mathjax';
import Markdown from '@/components/Markdown';
import Comments from '@/components/Comments';
import moment from 'moment';
import { Dispatch, connect } from 'umi';
import { DetailState } from '@/models/connect';
interface ARTDET {
  detail: DetailState;
}
const ArticleDetail: React.FC<ARTDET> = props => {
  const { detail } = props;
  const { artDetail } = detail;
  const { user, tag } = artDetail;
  return (
    <>
      {artDetail && (
        <div className={styles.detailbox}>
          <div className={`${styles.user}`}>
            <Avatar className={styles.ava} size={40} src={user.avatar}></Avatar>
            <div className={styles.info}>
              <span className={styles.name}>{user.username}</span>
              <span className={styles.time}>
                {moment(artDetail.createdAt).format('YYYY年MM月DD日')}
                <span>阅读 {artDetail.view}</span>
              </span>
            </div>
            {/* <div className={styles.}></div> */}
          </div>
          {artDetail.cover ? (
            <div
              className={styles.coverImg}
              style={{ backgroundImage: `url(${artDetail.cover})` }}
            ></div>
          ) : (
            ''
          )}
          <div className="markdown-body">
            <p style={{ fontSize: 30 + 'px', fontWeight: 600 }}>
              {artDetail.title}
            </p>
            <MathJax.Provider>
              <Markdown markdown={artDetail.markdown} />
            </MathJax.Provider>
          </div>
          <div className={styles.tagbox}>
            <div className={styles.title}>相关标签</div>
            <Tag color="#333">{tag.name}</Tag>
          </div>
          <div className={`${styles.user} ${styles.botuser}`}>
            <Avatar className={styles.ava} size={40} src={user.avatar}></Avatar>
            <div className={styles.info}>
              <span className={styles.name}>
                {user.username}
                <span>{user.profession}</span>
              </span>
              <span className={styles.time}>
                总点赞数 {user.total_like} · 总阅读数 {user.total_view}
              </span>
            </div>
            {/* <div className={styles.}></div> */}
          </div>
        </div>
      )}
      <Comments></Comments>
    </>
  );
};

export default connect(({ detail }: { detail: DetailState }) => ({
  detail,
}))(ArticleDetail);
