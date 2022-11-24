import axios from 'axios'
import { Toast } from 'vant';
import router from '@/router'
import loadding from "@/utils/loadding"
import $store from './../../store/index';

// 显示错误
function errorLog(message, params) {
  if (params && params.hiddenLog) {
    return;
  }
  // 显示提示
  Toast(message);
}

// function Toast(message) {
//   window.alert(message);
// }

// 这里是设置请求公共地址，默认是请求代理地址/api
let url = "/api";
// 当打包为本地包时使用预设的生产地址
if (window.location.origin === "file://") {
  url = process.env.VUE_APP_REQUEST_URL;
}
// 如果时线上的生产环境则使用访问源地址作为请求地址
else if (!process.env.VUE_APP_RUN_DEV) {
  url = window.location.origin;
}
const service = axios.create({
  timeout: 10000, // 请求超时时间
})

/**
 * 语言
 */
const LANG_MAP = {
  zh: 1,
  ft: 2,
  en: 3,
}

service.interceptors.request.use(
    config => {
      // 发送请求，给请求计数加一
      if (config.cus_params && !config.cus_params.noLoading) {
        loadding.start();
      }
      let token = $store.state.user;
      let lang = LANG_MAP[$store.state.language];
      config.headers['Accept-Language'] = lang
      if (token && token !== 'undefined') {
        config.headers['Authorization'] = 'Bearer ' + token

      }
      return config
    },
    error => {
      // 发送失败
      console.log('接口发送失败:', error)
      return Promise.reject(error)
    }
  ),
  service.interceptors.response.use(
    response => {
      // 请求结束，请求计数减一
      loadding.stop();
      // dataAxios 是 axios 返回数据中的 data
      const dataAxios = response.data
      const {
        code
      } = dataAxios
      // 根据 code 进行判断
      if (code === undefined) {
        return dataAxios
      } else {
        switch (code) {
          case 0:
            return dataAxios.data || dataAxios
          case 4700:
            // 登录失效
            errorLog('登陆信息已过期,请重新登陆!', response.config.cus_params);
            $store.commit("removeUser");
            router.push({
              path: "/login"
            })
            // 删除Token
            // 跳转登录页面
            return Promise.reject(dataAxios)
          case 4800:
            // 用户可见错误  这里可以进行认证的一些判断
            errorLog(dataAxios.message, response.config.cus_params);
            return Promise.reject(dataAxios)
          case 4810:
            // 用户可见错误  这里可以进行认证的一些判断
            errorLog(dataAxios.message, response.config.cus_params)
            return Promise.reject(dataAxios)
          case 4500:
            // 用户可见错误
            errorLog(dataAxios.message, response.config.cus_params)
            return Promise.reject(dataAxios)
          default:
            errorLog('网络异常，请稍后..', response.config.cus_params)
            return Promise.reject(dataAxios)
        }
      }
    },
    error => {
      // 请求错误，请求计数减一
      loadding.stop();

      console.log('错误信息:', error)
      if (error && error.response) {
        switch (error.response.status) {
          case 400:
            error.message = '请求错误';
            break
          case 401:
            error.message = '未授权，请登录';
            break
          case 403:
            error.message = '拒绝访问';
            break
          case 404:
            error.message = `请求地址出错: ${error.response.config.url}`;
            break
          case 408:
            error.message = '请求超时';
            break
          case 500:
            error.message = '服务器内部错误';
            break
          case 501:
            error.message = '服务未实现';
            break
          case 502:
            error.message = '网关错误';
            break
          case 503:
            error.message = '服务不可用';
            break
          case 504:
            error.message = '网关超时';
            break
          case 505:
            error.message = 'HTTP版本不受支持';
            break
          case "ECONNABORTED":
            error.message = '请求超时';
            break
          default:
            break
        }
      } else {
        error.message = '数据请求超时';
      }
      errorLog(error.message)
      return Promise.reject(error)
    }
  )

function post(params) {

  let resParams;
  if (params.url === "/upload") {
    resParams = {
      method: "post",
      url: url + params.url,
      data: params.data
    }
  } else {
    resParams = {
      method: 'post',
      url: url + (params.url || "/portal"),
      data: {
        source: 'web',
        version: 'v1',
        module: params.module,
        interface: params.interface,
        data: params.data || {},
      },
      cus_params: params
    }
  }

  return service(resParams);
}

export default post