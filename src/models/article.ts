/*
 * @Author: sizhou
 * @Date: 2020-09-08 20:44:27
 * @LastEditors: sizhou
 * @LastEditTime: 2020-10-22 16:09:19
 */
import {
  getArticles,
  getCategories,
  getTags
} from '@/service/home'
import { Effect, Reducer } from 'umi'

export interface ArtState {
  arts: any[];
  cats: any[];
  homeTags:any[];
  curCat:number|null;
  curTag:number|null;
}

export interface ArticleType {
  namespace: 'article';
  state: ArtState;
  effects: {
    articles: Effect;
    categories: Effect;
    moreArts: Effect;
    getHomeTags:Effect
  };
  reducers: {
    save: Reducer<ArtState>;
    saveArt: Reducer<any>;
    saveHomeTags:Reducer<any>;
    setCurCat:Reducer<any>;
    setCurTag:Reducer<any>;
  };
}

const ArticleModel: ArticleType = {
  namespace: 'article',
  state: {
    arts: [],
    cats: [],
    homeTags:[],
    curCat:null,
    curTag:null
  },
  effects: {
    *categories({ callback }, { call, put }) {
      const response = yield call(getCategories)
      const cats = response.data
      const obj = {
        id: 0,
        name: '推荐',
        tags: []
      }
      cats.unshift(obj)
      yield put({
        type: 'save',
        payload: {
          cats: cats,
        },
      });
    },
    *articles({ payload, callback }, { call, put }) {
      const { data } = yield call(getArticles, payload)
      yield put({
        type: 'save',
        payload: {
          arts: data.articles,
        },
      });
      if (callback) {
        callback(data)
      }
    },
    *moreArts({ payload, callback }, { call, put }) {
      const { data } = yield call(getArticles, payload)
      yield put({
        type: 'saveArt',
        payload: {
          arts: data.articles,
        },
      });
      if (callback) {
        callback(data)
      }
    },
    *getHomeTags({ payload, callback }, { call, put }) {
      const { data } = yield call(getTags,payload)
      yield put({
        type: 'save',
        payload: {
          homeTags: data,
        },
      });
      if (callback) {
        callback(data)
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
    saveArt(state: ArtState, { payload }) {
      const arr = [...state.arts, ...payload.arts]
      return { ...state, arts: arr }
    },
    saveHomeTags(state, { payload }) {
      return { ...state, homeTags: payload.tags }
    },
    setCurCat(state, { payload }) {
      return { ...state, curCat: payload.id }
    },
    setCurTag(state, { payload }) {
      return { ...state, curTag: payload.id }
    },
  },
}

export default ArticleModel
