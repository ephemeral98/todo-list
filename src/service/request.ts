import { Message } from '@arco-design/web-react';
import axios from 'axios';

export interface IAxiosResp<T> {
  code: number; // 请求结果状态码
  msg: string; // 消息
  success: boolean; // 是否成功
  data?: T; // 响应体数据
  [key: string]: any; // 允许传入其他属性
}

const defaultConfig = {
  baseURL: ``,
};
Object.assign(axios.defaults, defaultConfig);
axios.defaults.headers['Content-Type'] = 'application/json';

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (resp) => {
    if (resp.data.code !== 0) {
      resp.data.msg ? Message.error(resp.data.msg) : Message.error('error');
    }
    return {
      ...resp.data,
      success: resp.data.code === 0,
    };
  },
  (err) => {
    const msg = err.response?.data?.msg;
    msg ? Message.error(msg) : Message.error('error');
    return Promise.reject(err);
  }
);

export default axios;

export const $POST = <T>(url: string, payload: object): Promise<IAxiosResp<T>> => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, payload)
      .then((res: any) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const $GET = <T>(url: string, payload?: object): Promise<IAxiosResp<T>> => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, payload)
      .then((res: any) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
