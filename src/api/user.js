import request from '@/utils/request.js'

// 登录方法
export function getuserlist () {
    return request({
        url: '/shopUser',
        method: 'get',

    })
}