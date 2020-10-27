import React, { useEffect, useState } from 'react';
import DraftItem from '@/components/DraftItem'
import styles from './index.less';
import { connect } from 'dva';
import { List } from 'antd';
import { Dispatch } from 'umi';
import { DraftState, Loading } from '@/models/connect';
import { Modal,message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

interface DraftProps {
  dispatch: Dispatch;
  draft: DraftState;
  loading?: boolean;
}

const { confirm } = Modal;

const Draft: React.FC<DraftProps> = props => {
  const { dispatch, loading, draft } = props;
  const { drafts } = draft;
  useEffect(() => {
    getDrafts();
  }, []);

  const getDrafts = () => {
    dispatch({ type: 'draft/drafts'});
  };
  const deldraft = (id:Number)=>{
    confirm({
      title: '该操作不可恢复，是否确定删除？',
      icon: <ExclamationCircleOutlined />,
      content: '',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk() {
        dispatch({ type: 'draft/deldraft',payload:{id},callback(){
          message.success('删除成功！')
          getDrafts();
        }});
      },
      onCancel() {
        console.log('Cancel');
      },
    });
    
  }
  return (
    <>
      <div className={styles.head}>草稿箱（{drafts.length}）</div>
      <List
        className={styles.drafts}
        itemLayout="horizontal"
        dataSource={drafts}
        loading={loading}
        renderItem={item => (
          <List.Item className={styles.artitem}>
            <DraftItem item={item} del={deldraft}></DraftItem>
          </List.Item>
        )}
      />
    </>
  );
};

export default connect(
  ({ draft, loading }: { draft: DraftState; loading: Loading }) => ({
    draft,
    loading: loading.models.draft,
  }),
)(Draft);
