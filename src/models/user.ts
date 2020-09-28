/*
 * @Author: sizhou
 * @Date: 2020-09-11 16:34:40
 * @LastEditors: sizhou
 * @LastEditTime: 2020-09-12 14:51:19
 */
import {
  register,
  login, 
  getUserInfo,
  updateUserInfo
} from '@/service/user'
import { pageLogin, setToken } from '@/utils/utils'
import { Effect, Reducer, history } from 'umi'
import {message} from 'antd'
import storageHelper from '@/utils/storage'

const initUser = () => {
  const user = storageHelper.get('user')
  if (!user || user.exp * 1000 < new Date().getTime()) {
    return ''
  }
  return user
}

export interface UserState {
  userInfo: object;
}

export interface UserType {
  namespace: 'user';
  state: UserState;
  effects: {
    signup: Effect;
    signin: Effect;
    userinfo: Effect;
    signout:Effect;
    updateUser:Effect;
  };
  reducers: {
    save: Reducer<UserState>;
  };
}

const UserModel: UserType = {
  namespace: 'user',
  state: {
    userInfo: initUser(),
  },
  effects: {
    *signup({ payload }, { call }) {
      yield call(register, payload)
      message.success('注册成功')
      setTimeout(() => {
        pageLogin()
      }, 1000);
    },
    *signin({ payload, callback }, { call, put }) {
      const { data } = yield call(login, payload)
      if (callback) {
        setToken(data.token)
        callback(data)
      }
    },
    *userinfo({ callback }, { call, put }) {
      const { data } = yield call(getUserInfo)
        storageHelper.set('user', data)
        yield put({
          type: 'save',
          payload: {
            userInfo: data,
          }
        });
        history.push('/')
    },
    *signout(_, { put }) {
      storageHelper.clear('user')
      yield put({
        type: 'save',
        payload: {
          userInfo: '',
        },
      })
    },
    *updateUser({ payload, callback }, { call, put }) {
      const { data } = yield call(updateUserInfo, payload)
       storageHelper.set('user', data)  
        if(callback){
          yield put({
            type: 'save',
            payload: {
              userInfo: data,
            },
          })
          callback(data)
          message.success('更新成功！')
        }
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    }
  },
}

export default UserModel
