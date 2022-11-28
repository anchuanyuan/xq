import request from '@/utils/request.js'

// 发送验证码
export function sendCode(data) {
    return request({
        url: '/common/sendCode',
        method: 'post',
        params: data,
    })
}


// 发送验证码
export function register(data) {
    return request({
        url: `/shopUser/insert?code=${data.code}&`,
        method: 'post',
        params: data,
    })
}
