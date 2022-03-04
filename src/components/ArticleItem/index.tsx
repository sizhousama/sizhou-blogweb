import React from 'react';
import styles from './index.less';
import moment from 'moment';
import { Avatar, Modal, message } from 'antd';
import { delArticle } from '@/service/draft';
import {
  EyeOutlined,
  HeartOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { history, Dispatch } from 'umi';
import { connect } from 'dva';
import { WriteState } from '@/models/connect';

const { confirm } = Modal;
interface childProps {
  dispatch: Dispatch;
  art: ART;
  opts: boolean;
  refresh: any;
  write: WriteState;
}
interface ART {
  id: number;
  title: string;
  user: any;
  tag: any;
  createdAt: string;
  cover: string;
  view: number;
  favorite: number;
  draft_id: number;
}
const ArticleItem: React.FC<childProps> = props => {
  const { art, opts, refresh, dispatch } = props;
  const delArt = () => {
    confirm({
      title: '该操作不可恢复，是否确定删除？',
      icon: <ExclamationCircleOutlined />,
      content: '',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk() {
        delArticle({ id: art.id }).then(res => {
          if (res.status === 1) {
            message.success('删除成功！');
            refresh();
          }
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const editArt = () => {
    dispatch({ type: 'write/save', payload: { curArtId: art.id } });
    history.push(`/write/${art.draft_id}`);
  };
  return (
    <>
      <div className={`fl cp ${styles.art}`}>
        <div className={`fl_7 flc ${styles.art_info}`}>
          <div className={`fl ft_12 ${styles.art_info_meta}`}>
            <div className={styles.art_info_avatar}>
              <Avatar shape="circle" size={30} src={art.user.avatar}></Avatar>
            </div>
            <div>
              <span className="cp_ul">{art.user.username}</span>
              <span> · {moment(art.createdAt).format('YYYY-MM-DD')} · </span>
              <span className="cp_ul">{art.tag.name}</span>
            </div>
          </div>
          <div
            className={`cp_ul ft_16 ftw_b ${styles.art_info_title}`}
            onClick={() => history.push(`/article/${art.id}`)}
          >
            {art.title}
          </div>
          <div className={`fl ft_14 ftw_b ${styles.art_info_action}`}>
            <div className={`cp ${styles.fav}`}>
              <HeartOutlined className="mr_5" />
              {art.favorite}
            </div>
            <div className={styles.mid}>|</div>
            <div>
              <EyeOutlined className="mr_5" />
              {art.view}
            </div>
            {opts ? (
              <div className={`fl ${styles.opts}`}>
                <span onClick={editArt}>编辑</span>
                <span onClick={delArt}>删除</span>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="fl_1 fl">
          <div
            className={styles.art_outimg}
            style={{ backgroundImage: `url(${art.cover})` }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default connect(({ write }: { write: WriteState }) => ({
  write,
}))(ArticleItem);
