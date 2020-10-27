import React from 'react';
import styles from './index.less';
import moment from 'moment';
import { DeleteOutlined } from '@ant-design/icons';
import {history} from 'umi'
import { connect } from 'dva';
import { DraftState } from '@/models/connect';
import { Dispatch } from 'umi';

interface childProps {
  dispatch:Dispatch,
  item: ART;
  draft:DraftState;
  del:any
}
interface ART {
  id:any,
  title: string;
  updatedAt:string
}
const DraftItem: React.FC<childProps> = props => {
  const {dispatch} = props
  const { item } = props;
  const editDraft = () =>{
    const payload = {id:item.id}
    dispatch({type:'draft/draft',payload,callback(){
      history.push(`/write/${item.id}`)
    }})
  }
  return (
    <>
      <div className={`cp ${styles.draft}`} >
          <div className={`cp_ul ft_16 ftw_b ${styles.draft_title}`} onClick={editDraft}>
            {item.title?item.title:'无标题'}
          </div>
          <div className={`ft_16 ${styles.draft_time}`}>
            {moment(item.updatedAt).format('YYYY-MM-DD LTS')}
          </div>
          <DeleteOutlined className={styles.del} onClick={()=>{props.del(item.id)}} />
      </div>
    </>
  );
};

export default connect(
  ({ draft }: { draft: DraftState }) => ({
    draft
  }),
)(DraftItem);
