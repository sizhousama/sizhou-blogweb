import request from '@/utils/request';

// 文章
export async function getArticles(params:any):Promise<any> {
  return request('/articles', {
    method: 'GET',
    params
  })
}
// 类别
export async function getCategories():Promise<any> {
  return request('/categories', {
    method: 'GET'
  })
}
// 标签
export async function getTags(params:any):Promise<any> {
  return request('/tags', {
    method: 'GET',
    params
  })
}