import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from './index.less';
import moment from 'moment';
import { Comment, Avatar, Button, List, Input, message } from 'antd';
import { UserOutlined, MessageOutlined } from '@ant-design/icons';
import { history, Dispatch } from 'umi';
import { connect } from 'dva';
import { DetailState, UserState } from '@/models/connect';
const { TextArea } = Input;
interface ComProps {
  dispatch: Dispatch;
  detail: DetailState;
  user: UserState;
}
const Comments: React.FC<ComProps> = props => {
  const { dispatch, detail, user } = props;
  const { comments, artDetail } = detail;
  const { userInfo } = user;
  const [submitting, setSubmitting] = useState(false);
  const [commentValue, setCommentValue] = useState('');
  const [topValue, setTopValue] = useState('');
  const [replyId, setReplyId] = useState<number>(artDetail.uid);
  const [parentId, setparentId] = useState<number>(0);

  useEffect(() => {
    document.addEventListener('click', () => {
      closeadd();
    });
  }, []);
  // 防抖
  const useDebounce = (fn: any, delay: number, imm: boolean, dep = []) => {
    const { current } = useRef<{ fn: any; timer: any }>({ fn, timer: null });
    useEffect(
      function() {
        current.fn = fn;
      },
      [fn],
    );
    let flag = true;
    if (imm) {
      return useCallback(function f(...args) {
        clearTimeout(current.timer);
        if (flag) {
          current.fn.call(this, ...args);
          flag = false;
        }
        current.timer = setTimeout(() => {
          flag = true;
        }, delay);
      }, dep);
    }

    return useCallback(function f(...args) {
      if (current.timer) {
        clearTimeout(current.timer);
      }
      current.timer = setTimeout(() => {
        current.fn.call(this, ...args);
      }, delay);
    }, dep);
  };
  // 关闭所有新增评论组件
  const closeadd = useDebounce(
    () => {
      dispatch({ type: 'detail/closeAddComments', payload: {} });
    },
    100,
    true,
  );
  // 新增评论组件
  const addComment = (
    top: boolean,
    ava: boolean,
    white: boolean,
    item: any,
  ) => {
    return (
      <div onClick={stopBub}>
        <Comment
          className={`${styles.pulishbox} ${top && styles.top} ${white &&
            styles.white}`}
          avatar={
            ava &&
            (userInfo ? (
              <Avatar size={32} src={userInfo.avatar} alt={userInfo.username} />
            ) : (
              <Avatar size={32} icon={<UserOutlined />} />
            ))
          }
          content={
            <>
              <TextArea
                autoFocus={!top}
                autoSize
                onChange={e => changeComment(e, top ? true : false)}
                value={top ? topValue : commentValue}
                placeholder={
                  !top && item ? `回复${item.user.username}` : '填写评论...'
                }
              />
              <div className={styles.pulishbtn}>
                <Button
                  loading={submitting}
                  onClick={() => submitComment(top ? true : false)}
                  type="primary"
                >
                  评论
                </Button>
              </div>
            </>
          }
        />
      </div>
    );
  };
  // 写评论
  const changeComment = (e: any, top: boolean) => {
    top ? setTopValue(e.target.value) : setCommentValue(e.target.value);
  };
  // 提交评论
  const submitComment = (top: boolean) => {
    if (top) {
      if (!topValue) {
        message.error('评论内容不能为空');
        return;
      }
    } else {
      if (!commentValue) {
        message.error('评论内容不能为空');
        return;
      }
    }

    const payload = {
      content: commentValue,
      articleId: artDetail.id,
      author: artDetail.uid,
      replyId: top ? artDetail.uid : replyId,
      parentId: top ? 0 : parentId,
    };
    dispatch({
      type: 'detail/addComment',
      payload,
      callback(data) {
        if (data) {
          setReplyId(artDetail);
          setparentId(0);
          setTopValue('');
          setCommentValue('');
          dispatch({ type: 'detail/closeAddComments', payload: {} });
        }
      },
    });
  };
  // 评论列表
  const commentList = () => {
    return (
      <List
        className={styles.commentlist}
        dataSource={comments}
        itemLayout="horizontal"
        renderItem={item => <List.Item>{comment(item, '', false)}</List.Item>}
      />
    );
  };
  // 单条评论
  const comment = (item: any, parent: any, isreply: boolean, key?: number) => {
    return (
      <Comment
        key={key}
        className={isreply ? styles.commentgrey : styles.commentwhite}
        actions={[handelReply(item, parent)]}
        author={
          item.user && (
            <span className={styles.cUser}>
              {item.user.username}
              <span className={styles.author}>
                {item.user.id === artDetail.uid && `(作者)`}
              </span>
            </span>
          )
        }
        avatar={
          item.user && (
            <Avatar src={item.user.avatar} alt={item.user.username} />
          )
        }
        datetime={
          <span className={styles.cTime}>
            {moment(item.createdAt).fromNow()}
          </span>
        }
        content={
          <p>
            {isreply && item.reply_id !== parent.user.id ? (
              <span className={styles.replyUser}>
                回复<a>{item.reply_user.username}</a>：
              </span>
            ) : (
              ''
            )}
            {item.content}
          </p>
        }
      >
        {item.replying &&
          addComment(false, false, item.parent_id === 0 ? false : true, item)}
        {item.replys &&
          item.replys.length > 0 &&
          item.replys.map((reply: any, index: number) => {
            return comment(reply, item, true, index);
          })}
      </Comment>
    );
  };
  //阻止冒泡
  const stopBub = (e: any) => {
    e.nativeEvent.stopImmediatePropagation();
  };
  // 回复组件
  const handelReply = (item: any, parent: any) => {
    return (
      <div
        className={styles.replyAct}
        onClick={e => clickReply(item, parent, e)}
      >
        <MessageOutlined className={styles.replyicon} />
        <span>回复</span>
      </div>
    );
  };
  // 点击回复
  const clickReply = (item: any, parent: any, e: any) => {
    const payload = { id: item.id };
    dispatch({ type: 'detail/closeAddComments', payload });
    setReplyId(item.user.id);
    setparentId(parent ? parent.id : item.id);
    e.nativeEvent.stopImmediatePropagation(); //阻止冒泡
  };
  return (
    <div className={styles.commentbox}>
      {addComment(true, true, false, '')}
      {comments.length > 0 && commentList()}
    </div>
  );
};

export default connect(
  ({ detail, user }: { detail: DetailState; user: UserState }) => ({
    detail,
    user,
  }),
)(Comments);
