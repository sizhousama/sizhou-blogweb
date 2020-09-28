/*
 * @Author: sizhou
 * @Date: 2020-06-29 13:56:14
 * @Last Modified by: sizhou
 * @Last Modified time: 2020-09-08 14:35:50
 */

import React, { useEffect, useState, useRef } from 'react';
import styles from './index.less';
import ArticleItem from '@/components/ArticleItem';
import CatItem from '@/components/CatItem';
import { connect } from 'dva';
import { List } from 'antd';
import { Dispatch } from 'umi';
import { ArtState, Loading } from '@/models/connect';

interface ArticleListProps {
  dispatch: Dispatch;
  article: ArtState;
  htag:string;
  loading?: boolean;
}

const ArticleList: React.FC<ArticleListProps> = props => {
  const { dispatch, loading, article,htag } = props;
  const { arts, cats,curCat } = article;
  const pref = useRef({
    page: 1,
    size: 10,
    category:'',
    tag: '',
    orderType: 'createdAt',
  });
  useEffect(() => {
    getCats();
    getArts();
  }, []);
  useEffect(()=>{
    catChange(curCat,htag)
  },[htag])

  const getCats = () => {
    dispatch({ type: 'article/categories' });
  };
  
  const getArts = () => {
    dispatch({
      type: 'article/articles',
      payload: pref.current,
      callback(res) {
        // if(res.data.length)
      },
    });
  };
  const catChange = (catid:string,tagid:string)=>{
    pref.current.category = catid
    pref.current.tag = tagid
    dispatch({
      type: 'article/articles',
      payload: pref.current,
    });
  }

  return (
    <>
      <div className={styles.catsbox}>
        <div className={`fl ${styles.catsinner}`}>
          {cats.map((item, index) => {
            return (
              <CatItem
                cat={item}
                key={index}
                handleClick={catChange}
              ></CatItem>
            );
          })}
        </div>
      </div>
      <List
        className={styles.artlist}
        itemLayout="horizontal"
        dataSource={arts}
        loading={loading}
        renderItem={item => (
          <List.Item className={styles.artitem}>
            <ArticleItem art={item}></ArticleItem>
          </List.Item>
        )}
      />
    </>
  );
};

export default connect(
  ({ article, loading }: { article: ArtState; loading: Loading }) => ({
    article,
    loading: loading.models.article,
  }),
)(ArticleList);
