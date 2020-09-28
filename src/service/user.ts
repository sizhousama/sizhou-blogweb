/*
 * @Author: sizhou
 * @Date: 2020-09-11 16:19:01
 * @LastEditors: sizhou
 * @LastEditTime: 2020-09-12 09:44:36
 */
import request from '@/utils/request';

// 注册
export async function register(data:any):Promise<any> {
  return request('/user/register', {
    method: 'POST',
    data
  })
}

// 登录
export async function login(data:any):Promise<any> {
  return request('/user/login', {
    method: 'POST',
    data
  })
}
// 用户信息
export async function getUserInfo():Promise<any> {
  return request(`/user/info`, {
    method: 'GET'
  })
}

// 编辑用户信息
export async function updateUserInfo(data:any):Promise<any> {
  return request(`/user/updateUserInfo`, {
    method: 'POST',
    data
  })
}