/*
 * @Author: sizhou
 * @Date: 2020-09-16 09:42:33
 * @LastEditors: sizhou
 * @LastEditTime: 2020-09-16 09:52:15
 */

import { Effect, Reducer } from 'umi';

export interface WriteState {
  drafts: any[];
  categories: any[];
  tags: any[];
  markdown: string;
  title: string;
  selectedCategory: any;
  selectedTag: any;
  curArtId: any;
}

export interface WriteType {
  namespace: 'write';
  state: WriteState;
  effects: {};
  reducers: {
    save: Reducer<WriteState>;
    setMarkdown: Reducer<any>;
    setTitle: Reducer<any>;
  };
}

const WriteModel: WriteType = {
  namespace: 'write',
  state: {
    drafts: [], //草稿箱
    categories: [], //类别
    tags: [], //标签
    markdown: '', //markdown
    title: '',
    selectedCategory: '',
    selectedTag: '',
    curArtId: '',
  },
  effects: {},
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    setMarkdown(state, { payload }) {
      return { ...state, markdown: payload.markdown };
    },
    setTitle(state, { payload }) {
      return { ...state, title: payload.title };
    },
  },
};

export default WriteModel;
