import React from 'react';
import styles from './index.less';
import moment from 'moment';
import { Avatar } from 'antd';
import { EyeOutlined, HeartOutlined } from '@ant-design/icons';

interface childProps {
  art: ART;
}
interface ART {
  title: string;
  user: any;
  tag: any;
  createdAt: string;
  cover: string;
  view: number;
  favorite: number;
}
const ArticleItem: React.FC<childProps> = props => {
  const { art } = props;
  return (
    <>
      <div className={`fl cp ${styles.art}`}>
        <div className={`fl_7 flc ${styles.art_info}`}>
          <div className={`fl ft_12 ${styles.art_info_meta}`}>
            <div className={styles.art_info_avatar}>
              <Avatar shape="circle" size={30} src={art.user.avatar}></Avatar>
            </div>
            <div>
              <span className='cp_ul'>{art.user.username}</span>
              <span> · {moment(art.createdAt).format('YYYY-MM-DD')} · </span>
              <span className='cp_ul'>{art.tag.name}</span>
            </div>
          </div>
          <div className={`cp_ul ft_16 ftw_b ${styles.art_info_title}`}>
            {art.title}
          </div>
          <div className={`fl ft_14 ftw_b ${styles.art_info_action}`}>
            <div className={`cp ${styles.fav}`}>
              <HeartOutlined className='mr_5' />
              {art.favorite}
            </div>
            <div className={styles.mid}>|</div>
            <div>
              <EyeOutlined className='mr_5' />
              {art.view}
            </div>
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

export default ArticleItem;
