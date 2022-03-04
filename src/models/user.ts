/*
 * @Author: sizhou
 * @Date: 2020-09-11 16:34:40
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-04 13:37:41
 */
import {
  register,
  login,
  getUserInfo,
  updateUserInfo,
  userArts,
} from '@/service/user';
import { pageLogin, setToken } from '@/utils/utils';
import { Effect, Reducer, history } from 'umi';
import { message } from 'antd';
import storageHelper from '@/utils/storage';

const initUser = () => {
  const user = storageHelper.get('user');
  if (!user || user.exp * 1000 < new Date().getTime()) {
    return '';
  }
  return user;
};

export interface UserState {
  userInfo: any;
  userArts: any[];
}

export interface UserType {
  namespace: 'user';
  state: UserState;
  effects: {
    signup: Effect;
    signin: Effect;
    userinfo: Effect;
    signout: Effect;
    updateUser: Effect;
    getuserarts: Effect;
    moreuserarts: Effect;
  };
  reducers: {
    save: Reducer<UserState>;
    saveArt: Reducer<any>;
  };
}

const UserModel: UserType = {
  namespace: 'user',
  state: {
    userInfo: initUser(),
    userArts: [],
  },
  effects: {
    *signup({ payload }, { call }) {
      yield call(register, payload);
      message.success('注册成功');
      setTimeout(() => {
        pageLogin();
      }, 1000);
    },
    *signin({ payload, callback }, { call, put }) {
      const { data } = yield call(login, payload);
      if (callback) {
        setToken(data.token);
        callback(data);
      }
    },
    *userinfo({ callback }, { call, put }) {
      const { data } = yield call(getUserInfo);
      storageHelper.set('user', data);
      yield put({
        type: 'save',
        payload: {
          userInfo: data,
        },
      });
      history.push('/');
    },
    *signout(_, { put }) {
      storageHelper.clear('user');
      yield put({
        type: 'save',
        payload: {
          userInfo: '',
        },
      });
    },
    *updateUser({ payload, callback }, { call, put }) {
      const { data } = yield call(updateUserInfo, payload);
      storageHelper.set('user', data);
      if (callback) {
        yield put({
          type: 'save',
          payload: {
            userInfo: data,
          },
        });
        callback(data);
        message.success('更新成功！');
      }
    },
    *getuserarts({ payload, callback }, { call, put }) {
      const { data } = yield call(userArts, payload);
      yield put({
        type: 'save',
        payload: {
          userArts: data.articles,
        },
      });
      if (callback) {
        callback(data);
      }
    },
    *moreuserarts({ payload, callback }, { call, put }) {
      const { data } = yield call(userArts, payload);
      yield put({
        type: 'saveArt',
        payload: {
          userArts: data.articles,
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
    saveArt(state: UserState, { payload }) {
      const arr = [...state.userArts, ...payload.userArts];
      return { ...state, userArts: arr };
    },
  },
};

export default UserModel;
