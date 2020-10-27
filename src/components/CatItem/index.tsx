import React from 'react';
import styles from './index.less';
import { Popover } from 'antd';
import { Dispatch } from 'umi';
import { connect } from 'dva';
import { ArtState } from '@/models/connect';
interface childProps {
  dispatch:Dispatch;
  article:ArtState;
  cat: CAT;
  handleClick:Function
}
interface CAT {
  id: number;
  name: string;
  en_name: string;
  tags: any;
}
const ArticleItem: React.FC<childProps> = props => {
  const { dispatch,cat,handleClick,article } = props;
  const {curTag,curCat} = article
  const tags = (cat:any) => {
    return cat.tags.map((tag: any, index: number) => {
      return (
        <span 
        className={`mr_10 mb_10 cp ${styles.cattag} ${Number(curTag)===tag.id?styles.act:''}`} 
        onClick={()=>clickTag(cat,tag)}
        key={index}>
          {tag.name}
        </span>
      );
    });
  };
  const clickCat = (cat:any)=>{
    cat.tags.length>0?
    dispatch({type:'article/saveHomeTags',payload:{tags:cat.tags}}):
    dispatch({type:'article/getHomeTags'})
    const catid = cat.id===0?'':cat.id
    dispatch({type:'article/setCurCat',payload:{id:catid}})
    dispatch({type:'article/setCurTag',payload:{id:''}})
    handleClick(catid,'')
  }
  const clickTag = (cat:any,tag:any) =>{
    const catid = cat.id===0?'':cat.id
    const tagid = tag.id
    dispatch({type:'article/setCurCat',payload:{id:catid}})
    dispatch({type:'article/setCurTag',payload:{id:tagid}})
    handleClick(catid,tagid)
  }
  return (
    <>
      {cat.tags.length>0 ? (
        <Popover placement="bottom" content={tags(cat)} trigger="hover">
          <span 
          className={`cp ${styles.cat} ${Number(curCat)===cat.id?styles.act:''}`}
          onClick={()=>clickCat(cat)}
          >{cat.name}</span>
        </Popover>
      ) : (
        <span 
        className={`cp ${styles.cat} ${Number(curCat)===cat.id?styles.act:''}`}
        onClick={()=>clickCat(cat)}
        >{cat.name}</span>
      )}
    </>
  );
};

export default connect(
  ({ article }: { article: ArtState }) => ({
    article,
  }),
)(ArticleItem);
