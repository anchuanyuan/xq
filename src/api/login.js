import request from '@/utils/request.js'

// 登录方法
export function login(data) {
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
export function register(data) {
  return request({
    url: '/shopUser/insert',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}


// 获取验证码
export function getCode(data) {
  return request({
    url: 'common/sendCode',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}
