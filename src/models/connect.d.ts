/*
 * @Author: sizhou
 * @Date: 2020-09-08 20:44:27
 * @LastEditors: sizhou
 * @LastEditTime: 2020-09-11 16:49:26
 */
import { ArtState } from './article';
import {UserState} from './user'
import {WriteState} from './write'
import {GlobalState} from './global'
import {DraftState} from './draft'
export { ArtState,UserState,GlobalState,WriteState,DraftState };

export interface Loading {
  effects: { [key: string]: boolean | undefined };
  models: {
    article:boolean,
    draft:boolean,
    user:boolean
  };
}

export interface ConnectState {
  loading: Loading;
}

export interface Route {
  routes?: Route[];
}
