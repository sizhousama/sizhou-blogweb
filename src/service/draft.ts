import request from '@/utils/request';

// 草稿箱
export async function getDrafts(params: any): Promise<any> {
  return request('/user/drafts', {
    method: 'GET',
    params,
  });
}
// 草稿详情
export async function draftDetail(params: any): Promise<any> {
  return request('/user/draft', {
    method: 'GET',
    params,
  });
}
// 新增草稿
export async function addDraft(data: any): Promise<any> {
  return request('/user/addDraft', {
    method: 'POST',
    data,
  });
}
// 编辑草稿
export async function updateDraft(data: any): Promise<any> {
  return request('/user/updateDraft', {
    method: 'POST',
    data,
  });
}
// 删除草稿
export async function delDraft(data: any): Promise<any> {
  return request('/user/delDraft', {
    method: 'POST',
    data,
  });
}

// 发布文章
export async function addArticle(data: any): Promise<any> {
  return request('/user/addArticle', {
    method: 'POST',
    data,
  });
}

// 更新文章
export async function updateArticle(data: any): Promise<any> {
  return request('/user/updateArticle', {
    method: 'POST',
    data,
  });
}
// 删除文章
export async function delArticle(data: any): Promise<any> {
  return request('/user/delArticle', {
    method: 'POST',
    data,
  });
}
