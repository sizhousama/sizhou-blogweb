import React, { useEffect, useState, useRef } from 'react';
import styles from './index.less';
import { Row, Col } from 'antd';
import ArticleDetail from '@/components/ArticleDetail';
import ArticleAnchor from '@/components/ArticleAnchor';
import AuthorInfo from '@/components/AuthorInfo';
import { Dispatch, connect } from 'umi';
import { DetailState } from '@/models/connect';
interface ARTDETAIL {
  dispatch: Dispatch;
  match: any;
  detail: DetailState;
}
const Article: React.FC<ARTDETAIL> = props => {
  const { dispatch, match, detail } = props;
  const { artDetail } = detail;
  const commentParams = useRef({
    page: 1,
    size: 10,
    articleId: match.params.id,
    more: false,
  });
  useEffect(() => {
    getDetail();
    getComments();
  }, []);
  const getDetail = () => {
    const id = match.params.id;
    dispatch({ type: 'detail/getDetail', payload: { id } });
  };
  const getComments = () => {
    const payload = commentParams.current;
    dispatch({ type: 'detail/getComments', payload, callback() {} });
  };
  return (
    <>
      <Row gutter={20}>
        <Col span={17}>
          <ArticleDetail></ArticleDetail>
        </Col>
        <Col span={7}>
          <AuthorInfo></AuthorInfo>
          <ArticleAnchor></ArticleAnchor>
        </Col>
      </Row>
    </>
  );
};

export default connect(({ detail }: { detail: DetailState }) => ({
  detail,
}))(Article);
