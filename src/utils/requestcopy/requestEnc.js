import axios from 'axios'
import {
  Toast
} from 'vant';
import router from '@/router'
import loadding from "@/utils/loadding"
import md5 from 'js-md5';
import {
  aesDecrypt,
  aesEncrypt
} from '@/utils/encrypter'
import baseRequest from './baseRequest';
import $store from './../../store/index'

let base64 = require('js-base64').Base64;
let appKey = baseRequest.appKey;

// 显示错误
function errorLog(message, params) {
  // 如果传入的【hiddenLog】为true，则不弹出提示
  if (params && params.hiddenLog) {
    return;
  }
  // 显示提示
  Toast(message);
}

// 这里是设置请求公共地址，默认是请求代理地址/api
let url = "/api";
// 当打包为本地包时使用预设的生产地址
if (window.location.origin === "file://" || process.env.VUE_APP_REQUEST_IMPORTANT) {
  url = process.env.VUE_APP_REQUEST_URL;
} else if (!process.env.VUE_APP_RUN_DEV) { // 如果时线上的生产环境则使用访问源地址作为请求地址
  url = window.location.origin;
}

// 创建一个axios实例
const service = axios.create({
  timeout: 10000, // 请求超时时间
})

// 请求发送前处理
service.interceptors.request.use(
  config => {

    // 当没有设置不显示加载动画时，发送请求，给加载动画请求计数加一
    if (config.cus_params && config.cus_params.animation !== false) {
      loadding.start();
    }

    // 设置请求token
    // 设置请求语言
    var lan = localStorage.getItem('locale') || 'zh';
    var lang;
    if (lan == 'zh') {
      lang = 1
    } else if (lan == 'ft') {
      lang = 2
    } else {
      lang = 3
    }
    config.headers['Accept-Language'] = lang
    if ($store.state.user && $store.state.user !== 'undefined') {
      config.headers['Authorization'] = 'Bearer ' + $store.state.user
    }
    return config
  },
  // 请求发送失败
  error => {
    console.log('接口发送失败:', error)
    return Promise.reject(error)
  }
),
  // 请求响应后处理
  service.interceptors.response.use(
    response => {
      // 解密接口返回数据 是 axios 返回数据中的 data
      let dataAxios = baseRequest.encData ? aesDecrypt(response.data.encryptedData) : response.data;

      // 当没有设置不显示加载动画时，请求结束，给加载动画请求计数减一
      if (response.config.cus_params && response.config.cus_params.animation !== false) {
        loadding.stop();
      }

      // 取出返回数据中的code
      const {
        code
      } = dataAxios
      // 根据 code 进行判断
      if (code === undefined) {
        return dataAxios
      } else {
        // 如果接口请求数据出现问题则输入日志
        if (code !== 0) {
          console.log(dataAxios)
        }
        switch (code) {
          // 请求正常
          case 0:
            return dataAxios.data || dataAxios

          // 登录异常错误
          case 4700:
            errorLog('登陆信息已过期,请重新登陆!', response.config.cus_params);
            $store.commit("removeUser");
            router.push({
              path: "/login"
            })
            // 删除Token
            // 跳转登录页面
            return Promise.reject(dataAxios)
          // 用户可见错误  这里可以进行认证的一些判断
          case 4800:
          case 4810:
            errorLog(dataAxios.message, response.config.cus_params);
            return Promise.reject(dataAxios)
          // 传入参数与接口所需不一致，部分接口用户可见
          case 4500:
            return Promise.reject(dataAxios)
          // 其他异常情况
          default:
            errorLog('网络异常，请稍后..', response.config.cus_params)
            return Promise.reject(dataAxios)
        }
      }
    },
    // 请求出现错误后处理
    error => {
      console.log('错误信息:', error)

      // 当没有设置不显示加载动画时，请求错误结束，给加载动画请求计数减一
      if (error.config.cus_params.animation !== false || error.response.config.cus_params.animation !== false) {
        loadding.stop();
      }

      // 根据请求状态码进行错误处理
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

// 将传入的对象内的属性按照ASCII码进行升序排序
function sortObj(obj) {
  let keysArr = Object.keys(obj).sort();
  let sortObj = {};
  for (let i in keysArr) {
    sortObj[keysArr[i]] = obj[keysArr[i]];
  }
  return sortObj;
}
// 将传入的对象以【key】=【value】&【key】=【value】的形式拼接为字符串
let serializeObject = function (obj) {
  let str = [];
  for (let p in obj) {
    str.push(p + "=" + encodeURIComponent(obj[p]));
  }
  return str.join("&");
}
// 生成接口签名验证字符串
function sign(request) {
  // 参数排序
  request = sortObj(request)
  // 临时字符串
  let tempString = serializeObject(request)
  // 加密
  let result = md5(base64.encode(`${appKey}${tempString}${appKey}`)).toLowerCase()
  return result;
}

/**
 *  发送一个post请求
 * 
 * @param {object} params 一个对象，传入请求所需的参数
 * * url:[String] 请求的接口地址，会在前面拼接上公共请求地址，请在前面加上【/】，默认为/portal
 * * data:[Object] 请求至接口的数据
 * * module:[String] 请求的接口的模块
 * * interface:[String,Number] 请求的接口的接口编号
 * * animation:[Boolean] 是否展示加载动画
 * * hiddenLog:[Boolean] 是否在产生用户可见错误时隐藏自动提示
 */
function post(params) {
  // 设置请求的参数
  let resParams;
  // 当调用上传文件接口时
  if (params.url === "/upload") {
    resParams = {
      method: "post",
      url: url + "/upload", // 拼接url
      data: params.data // 添加文件数据
    }
  }
  // 这里是正常post请求
  else {
    resParams = {
      method: 'post',
      url: url + (params.url || "/portal"), // 拼接url
      data: {
        source: 'web',
        version: 'v1',
        module: params.module, // 设置模块
        interface: params.interface, // 设置接口编号
        timestamp: parseInt(new Date().getTime() / 1000), // 验签时间戳
      },
      // 用户参数，将请求的参数至于用户参数中，让后续处理可以接收到传递的参数
      cus_params: {
        animation: params.animation,
        hiddenLog: params.hiddenLog
      }
    }
    // 首先生成签名字符串, 这一步需要将不包含data的接口请求参数传入（即resParams.data{不包含数据}）
    let signStr = sign(resParams.data);
    // 将请求的数据添加到请求参数中
    resParams.data.data = params.data || {};
    // 将签名字符串添加到请求数据中
    resParams.data.sign = signStr;
    // // 将请求的参数加密
    if (baseRequest.encData) {
      let encryptedData = aesEncrypt(resParams.data);
      resParams.data = {
        encryptedData
      };
    }
  }

  // 发送请求
  return service(resParams);
}

export default post