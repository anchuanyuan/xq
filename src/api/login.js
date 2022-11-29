import request from '@/utils/request.js'

// 登录方法
export function login (data) {
  return request({
    url: '/login/login',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 注册方法
export function register(query) {
  return request({
    url: '/shopUser/insert',
    headers: {
      isToken: false,
    },
    method: 'post',
    params: query
  })
}


// 获取验证码
export function getCode (data) {
  return request({
    url: 'common/sendCode',
    headers: {
      isToken: false
    },
    method: 'post',
    data
  })
}
// 忘记密码
export function forgetpass (data) {
  return request({
    url: '/shopUser/resetPassWord',
    method: 'post',
    data
  })
}
// 获取用户信息
export function getUser () {
  return request({
    url: '/login/getInfo',
    method: 'get',
  })
}
// 退出登录
export function exitlogin (id) {
  return request({
    url: '/login/getInfo',
    method: 'get',
    data: id
  })
}
