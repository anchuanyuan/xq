import request from '@/utils/request.js'

//趣币明细展示
export function qucondetail () {
    return request({
        url: '/quCoin/getQuCoinList',
        method: 'get',
    })
}
//我的趣币
export function mycoin (params) {
    return request({
        url: '/quCoin/getQuCoin',
        method: 'get',
        params
    })
}
//我的粉丝
export function myfan (params) {
    return request({
        url: '/quCoin/getMyFollower',
        method: 'get',
        params
    })
}