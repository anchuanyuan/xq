import axios from 'axios'
import md5 from 'js-md5';
let Base64 = require('js-base64').Base64;
import {
  Toast
} from 'vant';
import router from '@/router'
import store from "../../store";
import {
  aesDecrypt,
  aesEncrypt
} from './encrypter'

// 显示错误
function errorLog(message) {
  // 显示提示
  Toast(message);
  return
}

axios.defaults.timeout = 60000
axios.defaults.baseURL = process.env.VUE_APP_URL

let key = process.env.VUE_APP_API_KEY; // 加密 key 签名验证



// 请求拦截器
axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    // console.log(config)
    config.headers['content-type'] = 'application/json'
    return config
  },
  error => {
    // 发送失败
    console.log('接口发送失败:', error)
    return Promise.reject(error)
  }
)
// 响应拦截器
axios.interceptors.response.use(
  response => {
    // dataAxios 是 axios 返回数据中的 data
    // const dataAxios = response
    const dataAxios = process.env.VUE_APP_ENC ? aesDecrypt(response.data.encryptedData) : response.data

    const {
      code
    } = dataAxios
    // 根据 code 进行判断,此处根据后端接口给的值灵活变动条件
    switch (code) {
      case 0:
        return dataAxios || dataAxios.data
      case 4000:
        errorLog(dataAxios.message);
        return Promise.reject(dataAxios)
      case 4900:
        errorLog(dataAxios.message);
        return Promise.reject(dataAxios)
      case 4800:
        errorLog(dataAxios.message);
        return Promise.reject(dataAxios)
      case 4500:
        if (dataAxios.message == "该接口需要进行Auth认证，请核实认证信息后重试") {
          localStorage.removeItem('token')
          router.push({
            path: "/login"
          })
          errorLog('登录异常，请重新登录');
          return Promise.reject(dataAxios)
        } else {
          errorLog(dataAxios.message);
          return Promise.reject(dataAxios)
        }

        case 4700:
          errorLog(dataAxios.message);
          // localStorage.clear()
          localStorage.removeItem('token')
          router.push({
            path: "/login"
          })
          return Promise.reject(dataAxios)
        default:
          errorLog(dataAxios.message)
          return Promise.reject(dataAxios)
    }

  },
  error => {
    errorLog(error.message)
    return Promise.reject(error)
  }
)

function sortObj(obj) {
  let keysArr = Object.keys(obj).sort();
  let sortObj = {};
  for (let i in keysArr) {
    sortObj[keysArr[i]] = obj[keysArr[i]];
  }
  return sortObj;
}
// 拼接临时字符串
let serializeObject = function (obj) {
  let str = [];
  for (let p in obj) {
    str.push(p + "=" + encodeURIComponent(obj[p]));
  }
  return str.join("&");
}

function sign(request) {
  // 参数排序
  request = sortObj(request)
  // 临时字符串
  const tempString = serializeObject(request)
  const appKey = key.toLowerCase()
  // 加密
  let result = md5(Base64.encode(`${appKey}${tempString}${appKey}`)).toLowerCase()
  return result;
}

export function post(params) {
  // console.log(params, "params")
  store.state.isLoadding = true
  // params.loading ? store.state.showOverlay = true : store.state.showOverlay = false;
  let resParams;
  let time = Math.floor(new Date().getTime() / 1000)
  resParams = {
    method: 'post',
    url: params.url ? params.url : '/portal' ,
    data: {
      source: 'web',
      version: 'v1',
      module: params.module,
      interface: params.interface,
      timestamp: time,
    },
    cus_params: params,
  }
  let signData = sign(resParams.data);
  resParams.data.data = params.data || {};
  resParams.data.sign = signData;
  // // 将请求的参数加密
  if (process.env.VUE_APP_ENC === "true") {
    let encryptedData = aesEncrypt(resParams.data);
    resParams.data = {
      encryptedData
    };
  }
  return new Promise((resolve, reject) => {
    axios.post(params.url ? params.url : '/portal', resParams.data).then(res => {
        if (res) {
          // store.state.showOverlay = false;
          store.state.isLoadding = false
          resolve(res);
        } else {
          resolve(res);
        }
      })
      .catch(err => {
        // store.state.showOverlay = false;
        store.state.isLoadding = false
        reject(err)
      })
  });
}

