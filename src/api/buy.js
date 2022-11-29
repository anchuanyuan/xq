import request from '@/utils/request.js'

// 获得买方列表
export function getbuylist (data) {
    return request({
        url: '/shopRobBuy/getList',
        method: 'post',
        data
    })
}

//委托上架
export function gopush (data) {
    return request({
        url: '/shopRobBuy/put',
        method: 'post',
        data
    })
}
//取消上架
export function eixtpush (data) {
    return request({
        url: '/shopRobBuy/cancel',
        method: 'post',
        data
    })
}