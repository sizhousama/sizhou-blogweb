/*
 * @Author: sizhou
 * @Date: 2020-09-08 20:44:27
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-05 18:21:59
 */
import { articleDetail, getComments, addComment } from '@/service/detail';
import { Effect, Reducer } from 'umi';

export interface DetailState {
  artDetail: any;
  comments: any[];
}

export interface DetailType {
  namespace: 'detail';
  state: DetailState;
  effects: {
    getDetail: Effect;
    getComments: Effect;
    closeAddComments: Effect;
    addComment: Effect;
  };
  reducers: {
    save: Reducer<DetailState>;
    saveCom: Reducer<any>;
  };
}

const DetailModel: DetailType = {
  namespace: 'detail',
  state: {
    artDetail: '',
    comments: [],
  },
  effects: {
    *getDetail({ payload, callback }, { call, put }) {
      const { data } = yield call(articleDetail, payload);
      yield put({
        type: 'save',
        payload: {
          artDetail: data,
        },
      });
    },
    *getComments({ payload, callback }, { call, put }) {
      const { data } = yield call(getComments, payload);
      const { comments, total } = data;
      comments.forEach((comment: any) => {
        comment.replying = false;
        if (comment.replys) {
          comment.replys.forEach((reply: any) => {
            reply.replying = false;
          });
        }
      });
      const { more } = payload;
      yield put({
        type: more ? 'saveCom' : 'save',
        payload: {
          comments,
        },
      });
      if (callback) {
        callback(total);
      }
    },
    *addComment({ payload, callback }, { call, put, select }) {
      const { data } = yield call(addComment, payload);
      const comments = yield select((state: any) => state.detail.comments);
      data.replying = false;

      if (data.parent_id === 0) {
        comments.push(data);
      } else {
        comments.forEach((comment: any) => {
          data.parent_id === comment.id && comment.replys.push(data);
        });
      }
      yield put({
        type: 'save',
        payload: {
          comments,
        },
      });
      if (callback) {
        callback(data);
      }
    },
    *closeAddComments({ payload }, { put, select }) {
      const comments = yield select((state: any) => state.detail.comments);
      const { id } = payload;
      comments.forEach((comment: any) => {
        id && id === comment.id
          ? (comment.replying = true)
          : (comment.replying = false);
        if (comment.replys) {
          comment.replys.forEach((reply: any) => {
            id && id === reply.id
              ? (reply.replying = true)
              : (reply.replying = false);
          });
        }
      });
      yield put({
        type: 'save',
        payload: {
          comments,
        },
      });
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveCom(state: DetailState, { payload }) {
      const arr = [...state.comments, ...payload.comments];
      return { ...state, comments: arr };
    },
  },
};

export default DetailModel;
