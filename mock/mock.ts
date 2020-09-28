import mockjs from 'mockjs';
export default {
  'GET /api/articles': mockjs.mock({
    'list|20': [{ 'title': '@title', 'time': '@date', 'username': '@name','outimg':'@image' }],
  }),
};