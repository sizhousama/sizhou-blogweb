/*
 * @Author: sizhou
 * @Date: 2020-09-12 19:35:33
 * @LastEditors: sizhou
 * @LastEditTime: 2020-09-14 10:52:46
 */
import { Effect, Reducer } from 'umi'

export interface GlobalState {
  curNav:string;
}

export interface ArticleType {
  namespace: 'global';
  state: GlobalState;
  effects: {
    setCurNav: Effect;
  };
  reducers: {
    save: Reducer<GlobalState>;
  };
}

const GlobalModel:ArticleType = {
  namespace: 'global',
  state: {
    curNav:'0'
  },
  effects: {
    *setCurNav({payload}, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          curNav: payload,
        },
      });
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    }
  },
}

export default GlobalModel
