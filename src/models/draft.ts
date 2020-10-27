/*
 * @Author: sizhou
 * @Date: 2020-09-08 20:44:27
 * @LastEditors: sizhou
 * @LastEditTime: 2020-10-21 18:32:15
 */
import {
  getDrafts,
  draftDetail,
  addDraft,
  updateDraft,
  delDraft
} from '@/service/draft'
import { Effect, Reducer } from 'umi'

export interface DraftState {
  drafts: any[];
  draftDetail: any;
}

export interface DraftType {
  namespace: 'draft';
  state: DraftState;
  effects: {
    drafts: Effect;
    draft: Effect;
    adddraft: Effect;
    updraft:Effect;
    deldraft:Effect;
  };
  reducers: {
    save: Reducer<DraftState>;
    saveDra: Reducer<any>;
  };
}

const DraftModel: DraftType = {
  namespace: 'draft',
  state: {
    drafts: [],
    draftDetail: ''
  },
  effects: {
    *drafts({ callback }, { call, put }) {
      const {data} = yield call(getDrafts)
      yield put({
        type: 'save',
        payload: {
          drafts: data,
        },
      });
    },
    *draft({ payload, callback }, { call, put }) {
      const { data } = yield call(draftDetail, payload)
      yield put({
        type: 'save',
        payload: {
          draftDetail: data,
        },
      });
      if (callback) {
        callback(data)
      }
    },
    *adddraft({ payload,callback }, { call, put }) {
      const { data } = yield call(addDraft,payload)
      if (callback) {
        callback(data)
      }
    },
    *updraft({ payload, callback }, { call, put }) {
      const { data } = yield call(updateDraft,payload)
      if (callback) {
        callback(data)
      }
    },
    *deldraft({ payload,callback }, { call, put }) {
      const { data } = yield call(delDraft,payload)
      if (callback) {
        callback(data)
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
    saveDra(state: DraftState, { payload }) {
      const arr = [...state.drafts, ...payload.drafts]
      return { ...state, drafts: arr }
    }
  },
}

export default DraftModel;

