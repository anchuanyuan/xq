import request from '@/utils/request.js'

// 获得买方列表
export function getbuylist (data) {
    return request({
        url: '/shopRobBuy/getList',
        method: 'post',
        data
    })
}

export function getbuyli (data) {
    return request({
        url: '/shopRobBuy/getList',
        method: 'post',
        data
    })
}
