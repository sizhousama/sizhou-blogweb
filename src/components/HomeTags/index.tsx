import React, { useEffect,useRef } from 'react';
import styles from './index.less';
import { Card } from 'antd';
import { connect } from 'dva';
import { Dispatch } from 'umi';
import { ArtState, Loading } from '@/models/connect';

interface HomeTagsProps {
  dispatch: Dispatch;
  article: ArtState;
  click:Function
}

const HomeTags: React.FC<HomeTagsProps> = props => {
  const { dispatch, article,click } = props;
  const {homeTags,curTag} = article
  
  useEffect(()=>{
    getTags()
  },[])
  const getTags = () => {
    dispatch({ type: 'article/getHomeTags' });
  };
  const clickTag = (id:number)=>{
    dispatch({type:'article/setCurTag',payload:{id}})
    click(id)
  }
  return (
    <>
      <Card
        title="标签"
        extra={<a className='cp_ul'>管理</a>}
        style={{ width: '100%' }}
      >
        <div className={styles.tagbox}>
        {
          homeTags.length>0?
          homeTags.map((item:any,index:number)=>{
            return (
              <span 
              className={`cp mr_10 mb_10 ${styles.tag} ${Number(curTag)===item.id?styles.act:''}`} 
              key={index}
              onClick={()=>clickTag(item.id)}
            >{item.name}</span>
            )
          }):''
        }
        </div>
      </Card>
    </>
  );
};

export default connect(
  ({ article }: { article: ArtState }) => ({
    article
  }),
)(HomeTags);
