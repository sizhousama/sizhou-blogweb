/*
 * @Author: sizhou
 * @Date: 2020-11-02 19:48:53
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-04 17:19:27
 */
import request from '@/utils/request';

// 文章详情
export async function articleDetail(params: any): Promise<any> {
  return request('/user/articleDetail', {
    method: 'GET',
    params,
  });
}
// 评论列表
export async function getComments(params: any): Promise<any> {
  return request('/article/comments', {
    method: 'GET',
    params,
  });
}
// 创建评论
export async function addComment(data: any): Promise<any> {
  return request('/article/addComment', {
    method: 'POST',
    data,
  });
}
// 删除评论
export async function delComment(data: any): Promise<any> {
  return request('/article/delComment', {
    method: 'POST',
    data,
  });
}
