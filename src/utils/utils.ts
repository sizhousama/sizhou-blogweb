/*
 * @Author: sizhou
 * @Date: 2020-09-11 15:59:27
 * @LastEditors: sizhou
 * @LastEditTime: 2020-10-23 15:38:19
 */
import { history } from 'umi';
import storageHelper from '@/utils/storage';

import Cookies from 'js-cookie';
const TokenKey = 'token';

export const getToken = () => {
  return Cookies.get(TokenKey);
};

export const setToken = (token: string) => {
  return Cookies.set(TokenKey, token);
};

export const removeToken = () => {
  return Cookies.remove(TokenKey);
};

// 跳转登录
export const pageLogin = () => {
  storageHelper.clear('user');
  removeToken();
  history.push('/login');
};

export const getBrowser = () => {
  const ua = navigator.userAgent.toLowerCase();
  let btypeInfo = (ua.match(/firefox|chrome|safari|opera/g) || 'other')[0];
  if ((ua.match(/msie|trident/g) || [])[0]) {
    btypeInfo = 'msie';
  }
  let pc = '';
  let prefix = '';
  let plat = '';
  //如果没有触摸事件 判定为PC
  const isTocuh =
    'ontouchstart' in window ||
    ua.indexOf('touch') !== -1 ||
    ua.indexOf('mobile') !== -1;
  if (isTocuh) {
    if (ua.indexOf('ipad') !== -1) {
      pc = 'pad';
    } else if (ua.indexOf('mobile') !== -1) {
      pc = 'mobile';
    } else if (ua.indexOf('android') !== -1) {
      pc = 'androidPad';
    } else {
      pc = 'pc';
    }
  } else {
    pc = 'pc';
  }
  switch (btypeInfo) {
    case 'chrome':
    case 'safari':
    case 'mobile':
      prefix = 'webkit';
      break;
    case 'msie':
      prefix = 'ms';
      break;
    case 'firefox':
      prefix = 'Moz';
      break;
    case 'opera':
      prefix = 'O';
      break;
    default:
      prefix = 'webkit';
      break;
  }
  plat =
    ua.indexOf('android') > 0 ? 'android' : navigator.platform.toLowerCase();
  return {
    version: (ua.match(/[\s\S]+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1], //版本
    plat: plat, //系统
    type: btypeInfo, //浏览器
    pc: pc,
    prefix: prefix, //前缀
    isMobile: pc == 'pc' ? false : true, //是否是移动端
  };
};
