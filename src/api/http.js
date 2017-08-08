/**
 * http 请求
 */

import axios from 'axios';
import { isFunction } from '../utils/util';

// axios 配置
axios.defaults.timeout = 5000;

// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err.response) {
      switch (err.response.status) {
        case 401:
          break;
        default:
          break;
      }
    }
    return Promise.reject(err.response.data);
  });


const http = {
  // GET 请求
  get(url, params = {}, successCallback, errorCallback) {
    axios
      .get(url, {
        params,
      })
      .then((res) => {
        // 请求成功后回调函数
        if (res.status === 200) {
          if (isFunction(successCallback)) {
            successCallback(res.data);
          }
        }
      })
      .catch((err) => {
        // 请求出错后回调函数
        if (isFunction(errorCallback)) {
          errorCallback(err);
        }
      });
  },
  // POST 请求
  post(url, data = {}, successCallback, errorCallback) {
    axios
      .post(url, data)
      .then((res) => {
        // 请求成功后回调函数
        if (res.status === 200) {
          if (isFunction(successCallback)) {
            successCallback(res.data);
          }
        }
      })
      .catch((err) => {
        // 请求出错后回调函数
        if (isFunction(errorCallback)) {
          errorCallback(err);
        }
      });
  },
};

export default http;
