/*
 * @Author: sizhou
 * @Date: 2020-09-08 20:44:27
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-03 11:14:51
 */
import { getArticles, getCategories, getTags } from '@/service/home';
import { Effect, Reducer } from 'umi';

export interface ArtState {
  arts: any[];
  cats: any[];
  homeTags: any[];
  curCat: number | null;
  curTag: number | null;
}

export interface ArticleType {
  namespace: 'article';
  state: ArtState;
  effects: {
    articles: Effect;
    categories: Effect;
    moreArts: Effect;
    getHomeTags: Effect;
  };
  reducers: {
    save: Reducer<ArtState>;
    saveArt: Reducer<any>;
    saveHomeTags: Reducer<any>;
    setCurCat: Reducer<any>;
    setCurTag: Reducer<any>;
  };
}

const ArticleModel: ArticleType = {
  namespace: 'article',
  state: {
    arts: [],
    cats: [],
    homeTags: [],
    curCat: null,
    curTag: null,
  },
  effects: {
    *categories({ callback }, { call, put }) {
      const { data } = yield call(getCategories);
      const obj = {
        id: 0,
        name: '推荐',
        tags: [],
      };
      let arr = data;
      arr.unshift(obj);
      yield put({
        type: 'save',
        payload: {
          cats: arr,
        },
      });
    },
    *articles({ payload, callback }, { call, put }) {
      const { data } = yield call(getArticles, payload);
      yield put({
        type: 'save',
        payload: {
          arts: data.articles,
        },
      });
      if (callback) {
        callback(data);
      }
    },
    *moreArts({ payload, callback }, { call, put }) {
      const { data } = yield call(getArticles, payload);
      yield put({
        type: 'saveArt',
        payload: {
          arts: data.articles,
        },
      });
      if (callback) {
        callback(data);
      }
    },
    *getHomeTags({ payload, callback }, { call, put }) {
      const { data } = yield call(getTags, payload);
      yield put({
        type: 'save',
        payload: {
          homeTags: data,
        },
      });
      if (callback) {
        callback(data);
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveArt(state: ArtState, { payload }) {
      const arr = [...state.arts, ...payload.arts];
      return { ...state, arts: arr };
    },
    saveHomeTags(state, { payload }) {
      return { ...state, homeTags: payload.tags };
    },
    setCurCat(state, { payload }) {
      return { ...state, curCat: payload.id };
    },
    setCurTag(state, { payload }) {
      return { ...state, curTag: payload.id };
    },
  },
};

export default ArticleModel;
