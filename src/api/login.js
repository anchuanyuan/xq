import request from '@/utils/request.js'

// 登录方法
export function login(data) {
  return request({
    url: '/shopUser/login',
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

