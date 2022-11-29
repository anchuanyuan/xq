import request from '@/utils/request.js'

// 商品列表
export function goodsList(query) {
    return request({
        url: '/shopGood/limit',
        method: 'get',
        params: query
    })
}

// 商品详情
export function goodDetail(id) {
    return request({
        url: '/shopGood/' + id ,
        method: 'get',
    })
}
