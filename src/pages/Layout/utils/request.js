import Axios from 'axios';
import qs from 'qs';
import React from 'react';
import { notification, Icon } from 'antd';
// import {customNotice} from "utils/commonFunction";

Axios.defaults.timeout = 600000; // 模型解析及pw文件传输耗时较长
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// Axios.defaults.withCredentials = true;
//自定义通知
function customNotice({ type, message, description,duration = 3 }) {
    notification.config({
        top: 75,
      });
    if (type === 'success') {
        notification.success({
            icon: <Icon type='check-circle' style={{ color: '#52c41a' }} />,
            message,
            description,
            duration,
            style: {
                backgroundColor: '#f6ffed',
                border: '1px solid #b7eb8f',
            },
        });
    } else if (type === 'error') {
        notification.error({
            icon: <Icon type='close-circle' style={{ color: '#da350f' }} />,
            message,
            description,
            duration,
            style: {
                backgroundColor: '#fff1f0',
                border: '1px solid #ffa39e',
            },
        });
    } else {
        notification.info({
            icon: <Icon type='info-circle' style={{ color: '#1890ff' }} />,
            message,
            description,
            duration,
            style: {
                backgroundColor: '#e6f7ff',
                border: '1px solid #91d5ff',
            },
        });
    }
}
const request = function (type, url, params, isToast, responseType = 'json',isStringfy = true) {
  type = type || 'get';
  if (!url) {
    throw new Error('请指定url');
  }
  let obj = {};
  params = (Object.prototype.toString.call(params) === '[object Object]' || Object.prototype.toString.call(params) === '[object Array]')? params : {};
  if (type === 'get') {
    obj.method = 'get';
    obj.url = url;
    obj.params = params;
    obj.responseType = responseType;
  } else if (type === 'post') {
    obj.method = 'post';
    obj.url = url;
    if(isStringfy){
      params = qs.stringify(params);
    }
    obj.data = params;
    obj.responseType = responseType;
  } else if (type === 'postBody') {
    obj.method = 'post';
    obj.url = url;
    obj.data = params;
    obj.responseType = responseType;
  }else {
    throw new Error('请指定请求方式');
  }
  const instance = Axios.create();
  // 当创建实例的时候，拦截器放在default无效
  instance.interceptors.request.use((config) => {
    // 不能使用null，否则会将token的值变成'null'
    config.headers.Authorization = window.__TOKEN___ || '';
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  instance.interceptors.response.use((response) => response, (error) => Promise.reject(error));

  return new Promise((resolve, reject) => {
      debugger
    instance.request(obj)
    .then((res) => {
      if (res.status == 200) {
        /**
         * 如果返回的事blob 则直接返回
         */
        if (res.data instanceof Blob) {
          return resolve(res);
        }
        /**
         * 无权限处理
         */
        if (res.data.code == 401) {
          customNotice({ type:'error', message: res.data.message && res.data.message || '你无权限', description: ''});
          return window.g_app._store.dispatch({type: 'global/getUngrantInfo', params: {}});
        }

        /**
         * 有权请求
         */
        //以前平台的接口(项目模块) 用的是res.data.code === 'SUCCESS'
        if (res.data.code == '200' || res.data.code == '201' || res.data.code == '202' || res.data.code == '204' || res.data.code === 'SUCCESS') {
          isToast && customNotice({ type:'success', message: res.data.message && res.data.message || '请求成功', description: ''});
          return resolve(res.data);
        } else {
          isToast && customNotice({ type:'error', message: res.data.message && res.data.message || '请求错误', description: ''});
          return resolve(res.data);
        }
      }
      customNotice({ type:'error', message: '请求失败', description: ''});
      reject(res.data);
    }, (err) => {
        debugger
      let parseError = JSON.parse(JSON.stringify(err));
      let code = parseError.response?.status || 401;
      if (code == 401) {
        customNotice({ type:'error', message: 'tken过期', description: ''});
        // return window.g_app._store.dispatch({type: 'global/getUngrantInfo', params: {}});
      }
      if (code >= 500) {
        customNotice({ type:'error', message: '服务端异常', description: ''});
      }
      if (code == 'ECONNABORTED') {
        customNotice({ type:'error', message: '请求超时', description: ''});
      }
      reject(code);
    })
    .catch((e) => {
        debugger
      customNotice({ type:'error', message: '异常', description: ''});
      reject(e);
    });
  });
};

export default request;
