import { extend } from 'umi-request';
import { message } from 'antd';
import { history } from 'umi';
import { getToken, pageLogin } from './utils';
const baseUrl = process.env.BASE_URL;

const codeMessage: any = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

type mapCode =
  | 200
  | 201
  | 202
  | 204
  | 400
  | 401
  | 403
  | 404
  | 406
  | 410
  | 422
  | 500
  | 502
  | 503
  | 504;

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: any }): Response => {
  const { response } = error;
  console.log('errorhandler:', error);
  let errortext = codeMessage[response.status] || response.message;
  const { code } = response;
  const token = getToken();
  if (code === 400 && !token) {
    errortext = '用户名或密码错误';
    message.error(errortext);
  }
  if (code === 401) {
    errortext = `登录已过期，请重新登录`;
    message.error(errortext);
    pageLogin();
  }
  return response;
};

const request = extend({
  errorHandler,
  // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

// request拦截器, 改变url 或 options.
request.interceptors.request.use((url: string, options: any) => {
  const token = getToken();
  const headers = token
    ? {
        'Content-Type': 'application/json',
        token: token,
      }
    : { 'Content-Type': 'application/json' };
  return {
    url: `${baseUrl}${url}`,
    options: {
      ...options,
      headers,
    },
  };
});

// response拦截器, 处理response
request.interceptors.response.use(
  async (response: any): Promise<any> => {
    let obj = {};
    await response
      .clone()
      .json()
      .then((res: any) => {
        const { code, status, msg } = res;
        if (status !== 1) {
          message.error(msg);
          // if (code && code === 401) {
          //   pageLogin()
          //   window.location.reload()
          // }
        }
        obj = res;
      });
    return obj;
  },
);

export default request;
